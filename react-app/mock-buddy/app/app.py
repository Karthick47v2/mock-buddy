# import required things
import os
import datetime
import librosa #https://stackoverflow.com/questions/67331302/not-able-to-install-librosa
import soundfile as sf
from flask import Flask, Response, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from pathlib import Path

from src.consts import *
from src.face import *

#### SESSION ######

from multiprocessing import Process, Manager
from google.cloud import speech, storage

# create instance
app = Flask(__name__)
# # cross origin
cors = CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*")

# CHECK IT OUT #SDSSSSSSSSSSSSSSSs
#app.config['SECRET_KEY'] = 'myse'

base_path = Path(__file__).parent

# api key
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './secrets/mock-buddy.json'


# upload wav to bucket
def upload_to_g_bucket(file_name, bucket):
    blob = bucket.blob(file_name)
    blob.upload_from_filename(file_name)


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


# change to Google STT required format
def change_audio_format(file, filename):
    file.save(filename)

    # DEBUG LATER: currently saving blob to storage b4 processing (mandatory for converting blob to wav)..
    # Need to find alternative way
    # some brower's versions doesn't support recording on our specified audio configs, so explicitly converting to required format in backend
    file, sr = librosa.load(filename, sr=44100)
    file = librosa.to_mono(file)

    sf.write(filename, file, sr, subtype='PCM_16')

    # to detect speech speed -- will be used later
    return librosa.get_duration(y=file, sr=sr)


# get transcribe from STT
def transcribe_audio(filename, bucket, bucket_path='gs://stt-store/'):
    # instantiate audio var
    audio = speech.RecognitionAudio(uri=(bucket_path + filename))

    # add configs
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=SAMPLE_RATE,
        enable_automatic_punctuation=True,
        language_code='en-US',
        use_enhanced=True,
        audio_channel_count=NO_OF_CHANNELS,
        model='video'
    )

    speech_client = speech.SpeechClient()
    res = speech_client.long_running_recognize(config=config, audio=audio)
    res = res.result(timeout=1200)

    for result in res.results:
        # 0 - high accurate output
        print("Transcript: {}".format(result.alternatives[0].transcript))

    # we don't need audio file after this step so we can delete that from ggl storage
    blob = bucket.blob(filename)
    blob.delete()


# Restful APIs
@app.route('/audio_out/', methods=['POST'])
def get_audio():
    try:
        file = request.files['file']
        # name as M_D_Y_H_M_S format in order to avoid overwriting issue (**may happen)
        filename = datetime.datetime.now().strftime('%m_%d_%Y_%H_%M_%S') + '.wav'

        audio_duration = change_audio_format(file, filename)

        # upload audio to ggl storage (mandatory for transcribing long audios (> 1mins))
        storage_client = storage.Client()

        # access bucket
        bucket = storage_client.get_bucket('stt-store')
        upload_to_g_bucket(filename, bucket)

        transcribe_audio(filename, bucket)

        # delete existing file in storage
        if os.path.exists(filename):
            os.remove(filename)

        return {
            'audio': 'received'
        }
    except:
        return{
            'audio': 'failed'
        }


# SocketIO events
@socketio.on('process_frame')
def detect_facial_points(uri):
    detect_face(uri)
    emit('get_output', request.sid, to=request.sid)


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
