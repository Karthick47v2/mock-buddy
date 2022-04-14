import cv2
import numpy as np


class VideoCam():
    def __init__(self, img_size, edge_offset, haar_cascade_path):
        # webcam
        self.video = cv2.VideoCapture(0)
        self.img_size = img_size
        self.edge_offset = edge_offset
        # get prebuilt haarcascade xml for face detection
        self.face_cascade = cv2.CascadeClassifier(str(haar_cascade_path))

    def __del__(self):
        self.video.release()

    def generate_frame(self):
        ret, frame = self.video.read()
        if not ret:
            return

        # haar cascade needs grayscale image so covert bgr to gray (Opencv uses bgr format)
        gray_scale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # detectMultiScale returns coords of bounding box(s)
        faces_rect = self.face_cascade.detectMultiScale(
            gray_scale, scaleFactor=1.4, minNeighbors=3, minSize=(30, 30))  # 1.3 - scalefactor

        areas = [w*h for x, y, w, h in faces_rect]
        try:
            large_rect = np.argmax(areas)
            bbox = faces_rect[large_rect]

            # extending bounding box a bit in order to create input for model
            bbox[2] += bbox[0] + self.edge_offset
            bbox[3] += bbox[1] + self.edge_offset
            bbox[0] -= self.edge_offset
            bbox[1] -= self.edge_offset

            # cliping to make sure dims don't exceed frame range
            X = np.clip(bbox[[0, 2]], 0, frame.shape[1])
            Y = np.clip(bbox[[1, 3]], 0, frame.shape[0])

            # roi - region of interest
            # offsetting bounding box because model needs full face image
            input_frame = np.array(gray_scale[Y[0]: Y[1], X[0]: X[1]])

            frame_h, frame_w = input_frame.shape[:2]
            scale_h, scale_w = self.img_size / frame_h, self.img_size / frame_w

            # resize to 96x96
            input_frame = cv2.resize(
                input_frame, (self.img_size, self.img_size)).astype(np.uint8)

            # inference
            # frame = draw_landmark(input_frame)
            # print(model.predict(input_frame).shape)

        except:
            ##########################
            person_not_facing = True
            ##########################

        # encode img to mem buff (for displaying frames in html)
        ret, frame = cv2.imencode('.jpg', frame)
        return frame.tobytes()
