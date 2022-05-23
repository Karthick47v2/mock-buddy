"""Process client requests"""

import os
import datetime
from flask import Flask, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS

from src.face_model import FaceModel
from src.audio_util import Audio


#### SESSION ######


# create app instance with CORS
app = Flask(__name__)
cors = CORS(app)

# socket comm
socketio = SocketIO(app, cors_allowed_origins="*")

# CHECK IT OUT #SDSSSSSSSSSSSSSSSs
#app.config['SECRET_KEY'] = 'myse'

# api key
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './secrets/mock-buddy.json'

# initialize models
fm = FaceModel()


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


# Restful APIs
@app.route('/audio_out/', methods=['POST'])
def get_audio():
    """Process audio file sent from client

    Returns:
        dict[str,str]: response
    """
    # try:
    file = request.files['file']
    # name as M_D_Y_H_M_S format in order to avoid overwriting issue
    audio_file = Audio(file_name=datetime.datetime.now().strftime(
        '%m_%d_%Y_%H_%M_%S') + '.wav')

    audio_duration = audio_file.change_audio_format(
        file)  # AUDIO DUCRATION NEEDED ####################################

    print(audio_duration)

    # upload audio to ggl storage (mandatory for transcribing long audio (> 1mins))
    audio_file.storage.upload_to_bucket(audio_file.file_name)

    audio_file.stt.transcribe(
        audio_file.storage.bucket_name, audio_file.file_name)

    # delete existing file in storage (local and cloud)
    audio_file.storage.delete_file(audio_file.file_name)
    if os.path.exists(audio_file.file_name):
        os.remove(audio_file.file_name)

    return {
        'audio': 'received'
    }
    # except:
    # return{
    # 'audio': 'failed'
    # }


# SocketIO events
@socketio.on('process_frame')
def detect_facial_points(uri):
    """Detect facial keypoints from request => send prediction as response

    Args:
        uri (str): base64 encoded frame
    """
    fm.detect_face(uri)
    emit('get_output', request.sid, to=request.sid)


@socketio.on('connect')
def connected():
    """Trigger when new client connects"""
    print("[Clinet Connected]")


@socketio.on('disconnect')
def disconnected():
    """Trigger when client disconnects"""
    print("[Client Disconnected]")


# main thread
if __name__ == '__main__':
    # create shared var
    # run_rec = Manager().Value("b", True)

    # currently using eventlet server for production env
    # socketio will also take care of restful api calls
    socketio.run(app, port=5000, debug=True)
