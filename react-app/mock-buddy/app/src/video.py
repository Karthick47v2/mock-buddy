class VideoCam(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)

    def __del__(self):
        self.video.release()
    
    def generate_frame(self):
        ret, frame = self.video.read()
        ret, frame = cv2.imencode('.jpg', frame)
        return frame.tobytes()