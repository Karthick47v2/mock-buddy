"""Process client requests"""

import os
import datetime
from flask import Flask, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS

from src.face_model import FaceModel
from src.audio_util import AudioUtil


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

# Restful APIs


@app.route('/init/', methods=['GET'])
def init_model():
    """initialize or rest var

    Returns:
        dict[str,str]: response
    """
    fm.reset()
    return {'status': 200}


@app.route('/vid_fb/', methods=['GET'])
def get_vid_fb():
    """return feedback

    Returns:
        dict[str,str]: response
    """
    return fm.get_vid_feedback()


@app.route('/audio_out/', methods=['POST'])
def get_audio():
    """Process audio file sent from client

    Returns:
        dict[str,str]: response
    """
    try:
        file = request.files['file']
        # name as M_D_Y_H_M_S format in order to avoid overwriting issue
        audio_file = AudioUtil(file_name=datetime.datetime.now().strftime(
            '%m_%d_%Y_%H_%M_%S') + '.wav')

        audio_file.change_audio_format(file)

        # upload audio to ggl storage (mandatory for transcribing long audio (> 1mins))
        audio_file.storage.upload_to_bucket(audio_file.file_name)

        speech_rate = audio_file.get_speech_rate()

        # delete existing file in storage (local and cloud)
        audio_file.storage.delete_file(audio_file.file_name)
        if os.path.exists(audio_file.file_name):
            os.remove(audio_file.file_name)

        return {
            'status': 200,
            'wpm': speech_rate
        }
    except:
        return{
            'status': 400
        }


# SocketIO events
@socketio.on('process_frame')
def detect_facial_points(uri):
    """Detect facial keypoints from request => send prediction as response

    Args:
        uri (str): base64 encoded frame
    """
    fm.detect_face(uri)


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

    # currently using eventlet server for production env
    # socketio will also take care of restful api calls
    socketio.run(app, port=5000, debug=True)
