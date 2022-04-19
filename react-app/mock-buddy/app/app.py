# import required things
from distutils.log import debug
import os
import pyaudio
import wave
import datetime
import socketio
from flask import Flask, Response, request, jsonify, render_template
from flask_socketio import SocketIO, emit
from pathlib import Path
# constants
from src.consts import *
from src.face import *

#### SESSION ######

from multiprocessing import Process, Manager
from google.cloud import speech, storage

# create instance
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# CHECK IT OUT #SDSSSSSSSSSSSSSSSs
#app.config['SECRET_KEY'] = 'myse'

base_path = Path(__file__).parent

# api key
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './secrets/mock-buddy.json'

# @app.route('') - decorator

# @app.route('/user', methods=['POST'])
# def get_name():
#     user_name = request.get_json()
#     return(jsonify({'name': user_name['content']}))


# # upload wav to bucket
# def upload_to_g_bucket(file_name, bucket, file_path=None):
#     try:
#         blob = bucket.blob(file_name)
#         blob.upload_from_filename(os.path.join(file_path, file_name))
#         return True
#     except Exception as e:
#         print(e)
#         return False


# # send recorded audio clip to google cloud storage
# def send_audio_to_cloud(filename, path):
#     storage_client = storage.Client()

#     # access bucket
#     bucket = storage_client.get_bucket('stt-store')

#     upload_to_g_bucket(file_name=filename, bucket=bucket,
#                        file_path=path)


# # generate audio frames
# def gen_audio_frame(rec, audio_save_path):
#     # speech_client = speech.SpeechClient()

#     # initialize PyAudio
#     audio = pyaudio.PyAudio()
#     # https://people.csail.mit.edu/hubert/pyaudio/docs/
#     # formant, no of channels, sample rate were chose to match with Google Speech to Text input with reduction in size
#     stream = audio.open(format=pyaudio.paInt16, channels=NO_OF_CHANNELS,
#                         rate=SAMPLE_RATE, FRAMES_PER_BUFFER=FRAMES_PER_BUFFER, input=True)

#     audio_frames = []

#     while rec.value:
#         audio_frames.append(stream.read(FRAMES_PER_BUFFER))

#     # stop recording and release resources
#     stream.stop_stream()
#     stream.close()
#     audio.terminate()

#     # save audio in required format
#     # name as M_D_Y_H_M_S format in order to avoid overwriting issue (**may happen)
#     filename = datetime.datetime.now().strftime('%m_%d_%Y_%H_%M_%S') + '.wav'
#     sound_file = wave.open(os.path.join(audio_save_path, filename), "wb")
#     sound_file.setnchannels(NO_OF_CHANNELS)
#     sound_file.setsampwidth(audio.get_sample_size(pyaudio.paInt16))
#     sound_file.setframerate(SAMPLE_RATE)
#     # join all frames inorder to create wav
#     sound_file.writeframes(b''.join(audio_frames))
#     sound_file.close()
#     send_audio_to_cloud(filename, audio_save_path)


# # generate frames
# def generate_frame(cam):
#     # audio_cpu = Process(target=gen_audio_frame, args=(
#     #     run_rec, (base_path / 'audio_out')))
#     # audio_cpu.start()

#     while run_rec.value:
#         frame = cam.generate_frame()
#         # return multiple times / kinda generator - jpeg format for cv frame
#         yield(b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

#     # audio_cpu.join()


# SocketIO events


@socketio.on('process_frame')
def detect_facial_points(uri):
    # detect_face(uri)
    emit('get_output', detect_face(uri), to=request.sid)


@socketio.on('connect')
def connected():
    print("[Clinet Connected]")


@socketio.on('disconnect')
def disconnected():
    print("[Client Disconnected]")


# main thread
if __name__ == '__main__':
    # create shared var
    # run_rec = Manager().Value("b", True)

    # currently using eventlet server for production env
    # socketio will also take care of restful api calls
    socketio.run(app, port=5000, debug=True)


# @ app.route('/video_stream')
# def video_stream():
#     # mime define data type of res
#     # https://developpaper.com/using-multipart-x-mixed-replace-to-realize-http-real-time-video-streaming/
#     return Response(generate_frame(VideoCam(IMG_SIZE=IMG_SIZE, EDGE_OFFSET=EDGE_OFFSET,
#                                             haar_cascade_path=haar_cascade_path)), mimetype='multipart/x-mixed-replace; boundary=frame')


# @ app.route('/video_stream/stop', methods=['POST'])
# def stop_frames():
#     print("CLICKED")
#     run_rec.value = False
#     return render_template('home.html')
