# image processing
import cv2

# numpy array
import numpy as np

# import model
import tensorflow as tf
from tensorflow import keras

# sound recording
import pyaudio

# save wav file
import wave

import multiprocessing as mp

img_size = 96
edge_offset = 75

sample_rate = 44100
frames_per_buffer = 1024
no_of_channels = 1

model = keras.models.load_model('./model')


def draw_landmark(frame):
    landmarks = model.predict(frame.reshape(1, img_size, img_size, 1))

    x = np.reshape(landmarks[:, :, :, np.arange(0, 136, 2)], (68)) * img_size
    y = np.reshape(landmarks[:, :, :, np.arange(1, 136, 2)], (68)) * img_size

    for x_coord, y_coord in zip(x, y):
        cv2.circle(frame, tuple((int(x_coord), int(y_coord))),
                   radius=1, color=(255, 0, 0), thickness=1)

    return frame


def audio_func():
    #
    audio = pyaudio.PyAudio()
    stream = audio.open(format=pyaudio.paInt16, channels=no_of_channels,
                        rate=sample_rate, frames_per_buffer=frames_per_buffer, input=True)

    audio_frames = []
    i = 0
    while i < 1000:
        print(i)
        i += 1
        audio_frames.append(stream.read(frames_per_buffer))

    stream.stop_stream()
    stream.close()
    audio.terminate()

    sound_file = wave.open("rec.wav", "wb")
    sound_file.setnchannels(no_of_channels)
    sound_file.setsampwidth(audio.get_sample_size(pyaudio.paInt16))
    sound_file.setframerate(sample_rate)
    sound_file.writeframes(b''.join(audio_frames))
    sound_file.close()


def video_func():
    # download prebuilt haarcascade xml for face detection
    face_cascade = cv2.CascadeClassifier(
        'haarcascade_xml/haarcascade_frontalface_alt2.xml')

    # webcam
    cap = cv2.VideoCapture(0)
    i = 0
    while i < 1000:
        i += 1
        ret, frame = cap.read()

        # haar cascade needs grayscale image so covert bgr to gray (Opencv uses bgr format)
        gray_scale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # detectMultiScale returns coords of bounding box(s)
        faces_rect = face_cascade.detectMultiScale(
            gray_scale, scaleFactor=1.4, minNeighbors=3, minSize=(30, 30))  # 1.3 - scalefactor

        areas = [w*h for x, y, w, h in faces_rect]
        try:
            large_rect = np.argmax(areas)
            bbox = faces_rect[large_rect]

            # extending bounding box a bit in order to create input for model
            bbox[2] += bbox[0] + edge_offset
            bbox[3] += bbox[1] + edge_offset
            bbox[0] -= edge_offset
            bbox[1] -= edge_offset

            # cliping to make sure dims don't exceed frame range
            X = np.clip(bbox[[0, 2]], 0, frame.shape[1])
            Y = np.clip(bbox[[1, 3]], 0, frame.shape[0])

            # roi - region of interest
            # offsetting bounding box because model needs full face image
            input_frame = np.array(gray_scale[Y[0]: Y[1], X[0]: X[1]])

            frame_h, frame_w = input_frame.shape[:2]
            scale_h, scale_w = img_size / frame_h, img_size / frame_w

            # resize to 96x96
            input_frame = cv2.resize(
                input_frame, (img_size, img_size)).astype(np.uint8)

            # inference
            frame = draw_landmark(input_frame)
            # print(model.predict(input_frame).shape)

        except:
            ##########################
            person_not_facing = True
            ##########################

        cv2.imshow('frame', frame)

        # return if q pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # release webcam
    cap.release()

    # close window
    cv2.destroyAllWindows()


if __name__ == '__main__':

    audio_cpu = mp.Process(target=audio_func)
    video_cpu = mp.Process(target=video_func)
    audio_cpu.start()
    video_cpu.start()
