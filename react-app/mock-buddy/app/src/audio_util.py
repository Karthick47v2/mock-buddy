"""Transcribe wav file"""

import librosa
import soundfile as sf

from .ggl.google_storage import GoogleStorage
from .ggl.google_stt import GoogleSTT
from .ggl.vad import VAD


class AudioUtil:
    """Class holding all operations for processing audio"""

    def __init__(self, file_name):
        """Initialize all clients

        Args:
            file_name (str):name of wav file
        """
        self.__file_name = file_name
        self.storage = GoogleStorage()
        self.stt = GoogleSTT()

    @property
    def file_name(self):
        """Getter for file_name

        Returns:
            str: return file_name
        """
        return self.__file_name

    def change_audio_format(self, file):
        """Convert audio file to Google STT required format

        Args:
            file (FileStorage): wrapper for wav file

        Returns:
            float: total audio duration
        """
        file.save(self.__file_name)

        # pylint: disable=fixme
        # TODO: currently saving blob to local before processing (mandatory for converting
        # blob to wav)... Need to find an alternative way
        # some brower's versions doesn't support recording on requied audio format,
        #  so explicitly converting to required format in backend
        file, s_rate = librosa.load(self.file_name, sr=self.stt.SAMPLE_RATE)
        file = librosa.to_mono(file)

        sf.write(self.__file_name, file, s_rate, subtype='PCM_16')

    def get_speech_rate(self):
        word_count = self.stt.get_word_count(
            self.storage.bucket_name, self.file_name)
        vad_time = VAD(self.file_name).get_speech_time() + \
            1e-3  # to avoid division by zero err

        print(f"vad time: {vad_time}")

        return (word_count * 60 / vad_time)
