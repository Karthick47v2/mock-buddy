"""face and facial features detection"""

import base64
import cv2
import numpy as np


# pylint: disable=too-few-public-methods
# pylint: disable=no-self-use
class FaceModel:
    """Class for facial keypoints detection"""
    __IMG_SIZE = 96
    __EDGE_OFFSET = 75

    def __init__(self):
        """Initialize cascade classsifier"""
        self.__face_cascade = cv2.CascadeClassifier(
            './haarcascade_xml/haarcascade_frontalface_alt2.xml')

    def __decode_b64(self, uri):
        """Decode base64 to cv2 frame

        Args:
            uri (str): base64 encoded frame

        Returns:
            img array: generated img array from buffer
        """
        b64_str = uri.split(',')[1]
        buff = np.frombuffer(base64.b64decode(b64_str), np.int8)
        return cv2.imdecode(buff, cv2.IMREAD_COLOR)

    def detect_face(self, uri, scale_fac=1.4, min_neighbours=3, min_size=(30, 30)):
        """Detect face and its facial features from frame

        Args:
            uri (str): base64 encoded frame

        Returns:
            _type_: _description_#####################################
        """
        frame = self.__decode_b64(uri)
        gray_scale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces_rect = self.__face_cascade.detectMultiScale(
            gray_scale, scaleFactor=scale_fac, minNeighbors=min_neighbours, minSize=min_size)

        print(faces_rect)

        # areas = [w*h for x, y, w, h in faces_rect]
        # # only using detection with big box
        # try:
        #     large_rect = np.argmax(areas)
        #     bbox = faces_rect[large_rect]

        #     # extending and clipping bounding box a bit in order to create input for model
        #     bbox[2] += bbox[0] + FaceModel.__EDGE_OFFSET
        #     bbox[3] += bbox[1] + FaceModel.__EDGE_OFFSET
        #     bbox[0] -= FaceModel.__EDGE_OFFSET
        #     bbox[1] -= FaceModel.__EDGE_OFFSET

        #     X = np.clip(bbox[[0, 2]], 0, frame.shape[1])
        #     Y = np.clip(bbox[[1, 3]], 0, frame.shape[0])

        #     # roi
        #     input_frame = np.array(gray_scale[Y[0]: Y[1], X[0]: X[1]])

        #     frame_h, frame_w = input_frame.shape[:2]
        #     scale_h, scale_w = FaceModel.__IMG_SIZE / \
        #         frame_h, FaceModel.__IMG_SIZE / frame_w

        #     # resize to 96x96
        #     input_frame = cv2.resize(
        #         input_frame, (FaceModel.__IMG_SIZE, FaceModel.__IMG_SIZE)).astype(np.uint8)

        #     # inference
        #     # frame = draw_landmark(input_frame)
        #     # print(model.predict(input_frame).shape)
        #     return 'fine'
        # except:
        #     ##########################
        #     person_not_facing = True
        #     ##########################
        #     return "not fine"
