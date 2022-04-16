# import required things
from cProfile import run
import os
import pyaudio
import wave
from flask import Flask, Response, render_template, request, jsonify
from pathlib import Path
from src.video import VideoCam
from multiprocessing import Process, Manager
# from google.cloud import speech, storage

app = Flask(__name__)

img_size = 96                                   # frame size
edge_offset = 75                                # zooming out detected face rect

sample_rate = 44100
frames_per_buffer = 1024
no_of_channels = 1

base_path = Path(__file__).parent
haar_cascade_path = (
    base_path / 'haarcascade_xml/haarcascade_frontalface_alt2.xml')
audio_save_path = (base_path / 'audio_out')

# # api key
# os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './secrets/mock-buddy.json'


@app.route('/')
def index():
    return render_template('home.html')


@app.route('/user', methods=['POST'])
def get_name():
    user_name = request.get_json()
    return(jsonify({'name': user_name['content']}))

# # upload wav to bucket
# def upload_to_g_bucket(file_name, bucket, file_path=None):
#     try:
#         blob = bucket.blob(file_name)
#         blob.upload_from_filename(file_name)
#         return True
#     except Exception as e:
#         print(e)
#         return False

# generate audio frames


def gen_audio_frame(rec):
    # speech_client = speech.SpeechClient()
    # storage_client = storage.Client()

    # initialize PyAudio
    audio = pyaudio.PyAudio()
    # https://people.csail.mit.edu/hubert/pyaudio/docs/
    # formant, no of channels, sample rate were chose to match with Google Speech to Text input with reduction in size
    stream = audio.open(format=pyaudio.paInt16, channels=no_of_channels,
                        rate=sample_rate, frames_per_buffer=frames_per_buffer, input=True)

    audio_frames = []

    while rec.value:
        audio_frames.append(stream.read(frames_per_buffer))

    # stop recording and release resources
    stream.stop_stream()
    stream.close()
    audio.terminate()

    # save audio in required format
    sound_file = wave.open(os.path.join(audio_save_path, "rec.wav"), "wb")
    sound_file.setnchannels(no_of_channels)
    sound_file.setsampwidth(audio.get_sample_size(pyaudio.paInt16))
    sound_file.setframerate(sample_rate)
    # join all frames inorder to create wav
    sound_file.writeframes(b''.join(audio_frames))
    sound_file.close()

    # # access bucket
    # bucket = storage_client.get_bucket('stt-store')
    # upload_to_g_bucket('rec.wav', bucket=bucket)


# generate frames
def generate_frame(cam):
    audio_cpu = Process(target=gen_audio_frame, args=(run_rec,))
    audio_cpu.start()

    while run_rec.value:
        frame = cam.generate_frame()
        # return multiple times / kinda generator - jpeg format for cv frame
        yield(b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    audio_cpu.join()


@ app.route('/video_stream')
def video_stream():
    # mime define data type of res
    # https://developpaper.com/using-multipart-x-mixed-replace-to-realize-http-real-time-video-streaming/
    return Response(generate_frame(VideoCam(img_size=img_size, edge_offset=edge_offset,
                                            haar_cascade_path=haar_cascade_path)), mimetype='multipart/x-mixed-replace; boundary=frame')


@ app.route('/video_stream/stop', methods=['POST'])
def stop_frames():
    print("CLICKED")
    run_rec.value = False
    return render_template('home.html')


if __name__ == '__main__':
    # create shared var
    run_rec = Manager().Value("b", True)

    app.run(debug=True)
