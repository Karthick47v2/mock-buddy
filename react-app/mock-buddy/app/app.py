# import required things
from flask import Flask, Response, render_template
from src.video import VideoCam
import numpy as np
import cv2

app = Flask(__name__)

# download prebuilt haarcascade xml for face detection
face_cascade = cv2.CascadeClassifier(
    'haarcascade_xml/haarcascade_frontalface_alt2.xml')

img_size = 96                                   # frame size
edge_offset = 75                                # zooming out detected face rect


@app.route('/')
def index():
    return render_template('home.html')


def generate_frame(cam):
    # webcam
    cap = cv2.VideoCapture(0)

    while True:
        suc, frame = cap.read()

        if not suc:
            break

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
            # frame = draw_landmark(input_frame)
            # print(model.predict(input_frame).shape)

        except:
            ##########################
            person_not_facing = True
            ##########################

        # encode img to mem buff (for displaying frames in html)
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        # frame = cam.generate_frame()
        # return multiple times / kinda generator - jpeg format for cv frame
        yield(b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video_stream')
def video_stream():
    # mime define data type of res
    # https://developpaper.com/using-multipart-x-mixed-replace-to-realize-http-real-time-video-streaming/
    return Response(generate_frame(VideoCam), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(debug=True)
