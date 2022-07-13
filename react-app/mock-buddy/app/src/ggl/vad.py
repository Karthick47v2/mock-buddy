"""Vocie Activity Detection"""

# modified https: //github.com/wiseman/py-webrtcvad
from collections import deque
import wave
import webrtcvad

# pylint: disable=too-few-public-methods


class Frame():
    """Represents a frame of audio data"""

    def __init__(self, byte, timestamp, duration):
        """Initialize frame

        Args:
            byte (string): pcm audio data
            timestamp (float): current timestamp
            duration (float): duration threshold
        """
        self.byte = byte
        self.timestamp = timestamp
        self.duration = duration


class VAD:
    """Class holding all VAD operations"""

    def __init__(self, file_name):
        self.__audio, self.__sample_rate = self.__read_wave(file_name)

    def __read_wave(self, path):
        """Read wav file and return PCM audio data & sample rate

        Returns:
            tuple[string,int]: PCM audio data in byte string, audio sample rate
        """
        #
        # PUT IT TO PYTEST
        #
        #

        with wave.open(path, 'rb') as file:
            return file.readframes(file.getnframes()), file.getframerate()

    def __frame_generator(self, frame_duration_ms, audio, sample_rate):
        """Generates audio frames from PCM audio data.

        Yields:
            Frame: frame for required duration
        """
        num = int(sample_rate * (frame_duration_ms / 1000.0) * 2)
        offset = 0
        timestamp = 0.0
        duration = (float(num) / sample_rate) / 2.0
        while offset + num < len(audio):
            yield Frame(audio[offset:offset + num], timestamp, duration)
            timestamp += duration
            offset += num

    def __vad_collector(self, sample_rate, vad, frames):
        """Filters out non-voiced audio frames.
        Given a webrtcvad.Vad and a source of audio frames, yields only the voiced audio.Uses a
        padded, sliding window algorithm over the audio frames. When more than 90% of the frames
        in the window are voiced, the collector triggers and begins yielding audio frames. Then
        the collector waits until 90% of the frames in the window are unvoiced to detrigger.

        Args:
        sample_rate (int): Audio sample rate, in Hz
        vad (webrtc.Vad): instance of webrtcvad.Vad.
        frames (Frame): a source of audio frames.

        Returns:
            generator: A generator that yields PCM audio data.
        """
        frame_duration_ms = 30
        padding_duration_ms = 300

        num_padding_frames = int(padding_duration_ms / frame_duration_ms)
        ring_buffer = deque(maxlen=num_padding_frames)
        # We have two states: TRIGGERED and NOTTRIGGERED. We start in the
        # NOTTRIGGERED state.
        triggered = False

        voiced_frames = []
        for frame in frames:
            is_speech = vad.is_speech(frame.byte, sample_rate)

            if not triggered:
                ring_buffer.append((frame, is_speech))
                num_voiced = len(
                    [frm for frm, speech in ring_buffer if speech])
                # If we're NOTTRIGGERED and more than 90% of the frames in
                # the ring buffer are voiced frames, then enter the
                # TRIGGERED state.
                if num_voiced > 0.9 * ring_buffer.maxlen:
                    triggered = True
                    # We want to yield all the audio we see from now until
                    # we are NOTTRIGGERED, but we have to start with the
                    # audio that's already in the ring buffer.
                    for frm in ring_buffer:
                        voiced_frames.append(frm[0])
                    ring_buffer.clear()
            else:
                # We're in the TRIGGERED state, so collect the audio data
                # and add it to the ring buffer.
                voiced_frames.append(frame)
                ring_buffer.append((frame, is_speech))
                num_unvoiced = len(
                    [frm for frm, speech in ring_buffer if not speech])
                # If more than 90% of the frames in the ring buffer are
                # unvoiced, then enter NOTTRIGGERED and yield whatever
                # audio we've collected.
                if num_unvoiced > 0.9 * ring_buffer.maxlen:
                    triggered = False
                    yield b''.join([frm.byte for frm in voiced_frames])
                    ring_buffer.clear()
                    voiced_frames = []

        # If we have any leftover voiced audio when we run out of input,
        # yield it.
        if voiced_frames:
            yield b''.join([frm.byte for frm in voiced_frames])

    def get_speech_time(self):
        """Calculate total voiced duration in input

        Returns:
            float: total sum of duration of voiced audio in sample, in seconds
        """
        vad = webrtcvad.Vad(1)
        frames = self.__frame_generator(30, self.__audio, self.__sample_rate)
        frames = list(frames)
        segments = self.__vad_collector(
            self.__sample_rate, vad, frames)
        return sum(map(lambda x: (len(x)/2.0)/self.__sample_rate, segments))
