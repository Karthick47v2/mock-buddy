# import required things
from email.mime import base
from flask import Flask, Response, render_template, request, jsonify
from pathlib import Path
from src.video import VideoCam

app = Flask(__name__)

img_size = 96                                   # frame size
edge_offset = 75                                # zooming out detected face rect

base_path = Path(__file__).parent
haar_cascade_path = (
    base_path / 'haarcascade_xml/haarcascade_frontalface_alt2.xml')


@app.route('/')
def index():
    return render_template('home.html')


@app.route('/user', methods=['POST'])
def get_name():
    user_name = request.get_json()
    return(jsonify({'name': user_name['content']}))


def generate_frame(cam):
    while True:
        frame = cam.generate_frame()
        # return multiple times / kinda generator - jpeg format for cv frame
        yield(b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@ app.route('/video_stream')
def video_stream():
    # mime define data type of res
    # https://developpaper.com/using-multipart-x-mixed-replace-to-realize-http-real-time-video-streaming/
    return Response(generate_frame(VideoCam(img_size=img_size, edge_offset=edge_offset,
                                            haar_cascade_path=haar_cascade_path)), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(debug=True)
