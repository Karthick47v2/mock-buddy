import cv2
import base64
import numpy as np
from pathlib import Path

from .consts import *

base_path = Path(__file__).parent
haar_cascade_path = str(
    base_path / '../haarcascade_xml/haarcascade_frontalface_alt2.xml')

face_cascade = cv2.CascadeClassifier(haar_cascade_path)


def decode_base64(uri):
    # extract b64 data
    b64_str = uri.split(',')[1]
    buff = np.frombuffer(base64.b64decode(b64_str), np.int8)
    return cv2.imdecode(buff, cv2.IMREAD_COLOR)


def detect_face(uri):
    # convery base64 to cv img
    frame = decode_base64(uri)
    # haar cascade needs grayscale image so covert bgr to gray (Opencv uses bgr format)
    gray_scale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # detectMultiScale returns coords of bounding box(s)
    faces_rect = face_cascade.detectMultiScale(
        gray_scale, scaleFactor=SCALE_FAC, minNeighbors=MIN_NEIGHBOURS, minSize=MIN_SIZE)  # 1.3 - scalefactor

    areas = [w*h for x, y, w, h in faces_rect]
    # only using detection with big box
    try:
        large_rect = np.argmax(areas)
        bbox = faces_rect[large_rect]

        # extending bounding box a bit in order to create input for model
        bbox[2] += bbox[0] + EDGE_OFFSET
        bbox[3] += bbox[1] + EDGE_OFFSET
        bbox[0] -= EDGE_OFFSET
        bbox[1] -= EDGE_OFFSET

        # cliping to make sure dims don't exceed frame range
        X = np.clip(bbox[[0, 2]], 0, frame.shape[1])
        Y = np.clip(bbox[[1, 3]], 0, frame.shape[0])

        # roi - region of interest
        # offsetting bounding box because model needs full face image
        input_frame = np.array(gray_scale[Y[0]: Y[1], X[0]: X[1]])

        frame_h, frame_w = input_frame.shape[:2]
        scale_h, scale_w = IMG_SIZE / frame_h, IMG_SIZE / frame_w

        # resize to 96x96
        input_frame = cv2.resize(
            input_frame, (IMG_SIZE, IMG_SIZE)).astype(np.uint8)

        # inference
        # frame = draw_landmark(input_frame)
        # print(model.predict(input_frame).shape)
        return 'fine'
    except:
        ##########################
        person_not_facing = True
        ##########################
        return "not fine"
