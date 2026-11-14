"""Superclass Kendaraan yang dipakai hands-on inheritance dan latihan Truk."""
class Kendaraan:
    def __init__(self, merek: str, model: str, tahun: int):
        self.merek = merek
        self.model = model
        self.tahun = tahun
        self.odometer = 0.0

    def deskripsi(self) -> str:
        return f"{self.merek} {self.model} ({self.tahun})"

    def tambah_jarak(self, km: float):
        if km <= 0:
            raise ValueError("Jarak harus lebih besar dari nol.")
        self.odometer += km
        print(f"[{self.merek}] Menempuh +{km} km. Total odometer: {self.odometer} km")

    def klakson(self) -> str:
        return "Tin tin!"
