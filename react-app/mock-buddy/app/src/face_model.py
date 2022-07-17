"""face and facial features detection"""

import base64
import numpy as np
# pylint: disable=I1101
from cv2 import cv2
# pylint: disable=E0401
from tensorflow import keras


class FaceModel:
    """Class for facial keypoints detection"""
    __IMG_SIZE = 96

    def __init__(self):
        """Initialize cascade classsifier"""
        self.__face_dnn = cv2.dnn.readNetFromCaffe(
            'dnn/deploy.prototxt', 'dnn/res10_300x300_ssd_iter_140000.caffemodel')
        self.__model = keras.models.load_model('./conv_model')
        self.__interactivity = None
        self.__inactive = None
        self.__look = None

    @classmethod
    def __decode_b64(cls, uri):
        """Decode base64 to cv2 frame

        Args:
            uri (str): base64 encoded frame

        Returns:
            ndarray: generated img array from buffer
        """
        b64_str = uri.split(',')[1]
        buff = np.frombuffer(base64.b64decode(b64_str), np.int8)
        return cv2.imdecode(buff, cv2.IMREAD_COLOR)

    def reset(self):
        """Reset user scores to default
        """
        self.__interactivity = [0]
        self.__inactive = 0
        self.__look = 0

    def __extract_kps(self, frame):
        """Extract keypoints from input image using Facial landmark detection model

        Args:
            frame (ndarray): image array

        Returns:
            ndarray: numpy array of keypoints
        """
        y_pred = self.__model.predict(np.expand_dims(
            frame.reshape(FaceModel.__IMG_SIZE, FaceModel.__IMG_SIZE, 1), 0))
        return self.__get_vals(y_pred[0])

    @classmethod
    def __get_vals(cls, kps, threshold=17):
        """Return interactivity and posture scores

        Args:
            kps (ndarray): numpy array of keypoints
            threshold (int, optional): threshold for face turning freedom. Defaults to 17.

        Returns:
            Tuple(float, float): posture and interactivity score
        """
        y_axis = kps[54:62:2].mean()
        interactivity = abs(y_axis - (FaceModel.__IMG_SIZE / 2))

        abs_l = np.abs(kps[0:16:2] - y_axis).mean()
        abs_r = np.abs(kps[18:34:2] - y_axis).mean()

        abs_len = abs(abs_l - abs_r)

        return abs_len < threshold, interactivity

    @classmethod
    def __resize_w_pad(cls, img, req_size):
        """Resize and pad input image inorder to, not to change aspect ration of image

        Args:
            img (ndarray): image array
            req_size (Tuple(int, int)): tuple of expected image size

        Returns:
           ndarray: resized image array
        """
        original_shape = (img.shape[1], img.shape[0])

        ratio = float(max(req_size))/max(original_shape)
        new_size = [int(x*ratio) for x in original_shape]

        img = cv2.resize(img, tuple(new_size))
        delta_w, delta_h = req_size[0] - new_size[0], req_size[1] - new_size[1]
        top, bottom = delta_h//2, delta_h-(delta_h//2)
        left, right = delta_w//2, delta_w-(delta_w//2)

        img = cv2.copyMakeBorder(img, top, bottom, left, right,
                                 cv2.BORDER_CONSTANT, value=(0, 0, 0))
        return img

    def detect_face(self, uri):
        """Detect face and its facial features from frame

        Args:
            uri (str): base64 encoded frame
        """
        frame = self.__decode_b64(uri)

        (height, width) = frame.shape[:2]
        blob = cv2.dnn.blobFromImage(cv2.resize(
            frame, (300, 300)), 1.0, (300, 300), (104.0, 177.0, 123.0))
        self.__face_dnn.setInput(blob)

        detections = self.__face_dnn.forward()

        for i in range(0, detections.shape[2]):

            if detections[0, 0, i, 2] > 0.8:

                bbox = detections[0, 0, i, 3:7] * \
                    np.array([width, height, width, height])
                (start_x, start_y, end_x, end_y) = bbox.astype('int')

                frame = np.array(frame[start_y: end_y, start_x: end_x])
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

                frame = self.__resize_w_pad(
                    frame, (FaceModel.__IMG_SIZE, FaceModel.__IMG_SIZE)).astype(np.uint8)

                abs_len, interac = self.__extract_kps(frame)

                self.__interactivity.append(interac)
                self.__look += int(abs_len)
                return

        self.__inactive += 1

    def get_vid_feedback(self):
        """Return all processed scores

        Returns:
            Dict(float, float, float): visibility, posture and interactivity scores
        """
        return {
            'visibility_score': (len(self.__interactivity)) / float(self.__inactive +
                                                                    len(self.__interactivity)),
            'posture_score': self.__look / len(self.__interactivity),
            'interactivity_score': sum(self.__interactivity) / len(self.__interactivity)
        }
