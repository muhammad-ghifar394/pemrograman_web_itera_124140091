"""Latihan Mandiri 6 - Interface File Storage Service."""
from abc import ABC, abstractmethod
from pathlib import Path

class FileStorage(ABC):
    @abstractmethod
    def upload_file(self, nama_file, data_bytes):
        pass

    @abstractmethod
    def download_file(self, nama_file):
        pass

class LocalDiskStorage(FileStorage):
    def __init__(self, folder="storage_local"):
        self.folder = Path(__file__).parent / folder
        self.folder.mkdir(parents=True, exist_ok=True)

    def upload_file(self, nama_file, data_bytes):
        if not isinstance(data_bytes, bytes):
            raise TypeError("data_bytes harus bertipe bytes.")
        target = self.folder / Path(nama_file).name
        target.write_bytes(data_bytes)
        print(f"[LocalDisk] File disimpan: {target.name}")
        return target

    def download_file(self, nama_file):
        target = self.folder / Path(nama_file).name
        if not target.exists():
            raise FileNotFoundError(f"File {nama_file} tidak ditemukan.")
        return target.read_bytes()

class CloudStorage(FileStorage):
    """Simulasi cloud menggunakan dictionary; tidak mengunggah ke internet."""
    def __init__(self):
        self._cloud_files = {}

    def upload_file(self, nama_file, data_bytes):
        if not isinstance(data_bytes, bytes):
            raise TypeError("data_bytes harus bertipe bytes.")
        key = Path(nama_file).name
        self._cloud_files[key] = data_bytes
        print(f"[CloudStorage SIMULASI] File {key} disimpan pada penyimpanan virtual.")
        return key

    def download_file(self, nama_file):
        key = Path(nama_file).name
        if key not in self._cloud_files:
            raise FileNotFoundError(f"File {key} tidak ditemukan di cloud simulasi.")
        return self._cloud_files[key]

if __name__ == "__main__":
    isi = b"Contoh isi file dari praktikum Python OOP."
    local = LocalDiskStorage()
    local.upload_file("contoh.txt", isi)
    print("Unduhan lokal:", local.download_file("contoh.txt").decode("utf-8"))
    cloud = CloudStorage()
    cloud.upload_file("contoh.txt", isi)
    print("Unduhan cloud simulasi:", cloud.download_file("contoh.txt").decode("utf-8"))
