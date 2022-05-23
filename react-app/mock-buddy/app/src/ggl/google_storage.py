"""Module for Google Cloud Storage API"""

from google.cloud import storage


class GoogleStorage:
    """Class holding all Storage operations"""

    def __init__(self):
        """Initialize Google Cloud Storage client"""
        self.__bucket_name = 'stt-store'
        self.__storage_client = storage.Client()
        self.__bucket = self.__storage_client.get_bucket(
            self.__bucket_name)

    @property
    def bucket_name(self):
        """Getter for bucket_name

        Returns:
            str: return bucket_name
        """
        return self.__bucket_name

    def upload_to_bucket(self, file_name):
        """Upload wav file to google cloud storage

        Args:
            file_name (str): name of file to be stored
        """
        blob = self.__bucket.blob(file_name)
        blob.upload_from_filename(file_name)

    def delete_file(self, file_name):
        """Delete wav file in bucket after processing

        Args:
            file_name (str): wav file's name
        """
        self.__bucket.blob(file_name).delete()
