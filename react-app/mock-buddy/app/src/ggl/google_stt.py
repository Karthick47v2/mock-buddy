"""Module for Google Speech to Text API"""

from google.cloud import speech

# pylint: disable=too-few-public-methods


class GoogleSTT:
    """Class holding all STT operations"""
    SAMPLE_RATE = 16000
    __NO_OF_CHANNELS = 1

    def __init__(self):
        """Initialize Speech client"""
        self.__speech_client = speech.SpeechClient()

        # set metadata for GGL STT
        metadata = speech.RecognitionMetadata()
        metadata.interaction_type = speech.RecognitionMetadata.InteractionType.PRESENTATION
        metadata.original_media_type = speech.RecognitionMetadata.OriginalMediaType.AUDIO
        metadata.recording_device_type = speech.RecognitionMetadata.RecordingDeviceType.PC

        # setup configs
        # https://cloud.google.com/speech-to-text/docs/reference/rest/v1/RecognitionConfig
        self.__config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=GoogleSTT.SAMPLE_RATE,
            language_code='en-IN',
            use_enhanced=True,
            audio_channel_count=GoogleSTT.__NO_OF_CHANNELS,
            metadata=metadata,
        )

    def get_word_count(self, bucket_name, file_name):
        """ Calculate word count from transcript

        Args:
            bucket_name (str): Google Cloud bucket name
            file_name (str): audio file name

        Returns:
            int: number of words in transcript
        """
        audio = speech.RecognitionAudio(
            uri=(f"gs://{bucket_name}/" + file_name))

        res = self.__speech_client.long_running_recognize(
            config=self.__config, audio=audio)
        res = res.result(timeout=1200)
        words = 0

        for result in res.results:
            # 0 - high accurate output
            words += len(result.alternatives[0].transcript.split())
            # print(f"Transcript: {result.alternatives[0].transcript}")

        return words
