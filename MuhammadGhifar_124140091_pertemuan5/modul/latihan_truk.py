"""Latihan Mandiri 3 - Armada Truk; mewarisi Kendaraan dari kendaraan.py."""
from kendaraan import Kendaraan

class Truk(Kendaraan):
    def __init__(self, merek, model, tahun, kapasitas_maksimal_ton, muatan_saat_ini=0):
        super().__init__(merek, model, tahun)
        if kapasitas_maksimal_ton <= 0:
            raise ValueError("Kapasitas maksimal harus lebih besar dari nol.")
        if not 0 <= muatan_saat_ini <= kapasitas_maksimal_ton:
            raise ValueError("Muatan awal berada di luar kapasitas.")
        self.kapasitas_maksimal_ton = float(kapasitas_maksimal_ton)
        self.muatan_saat_ini = float(muatan_saat_ini)

    def muat_barang(self, berat_ton):
        if berat_ton <= 0:
            print("Berat barang harus lebih besar dari nol.")
            return False
        if self.muatan_saat_ini + berat_ton > self.kapasitas_maksimal_ton:
            print("Gagal memuat: kapasitas maksimal truk akan terlampaui.")
            return False
        self.muatan_saat_ini += berat_ton
        print(f"Berhasil memuat {berat_ton} ton. Muatan sekarang: {self.muatan_saat_ini} ton.")
        return True

    def deskripsi(self):
        return (f"{super().deskripsi()} | Muatan: {self.muatan_saat_ini}/"
                f"{self.kapasitas_maksimal_ton} ton")

if __name__ == "__main__":
    truk = Truk("Mitsubishi", "Fuso", 2022, kapasitas_maksimal_ton=8)
    print(truk.deskripsi())
    truk.muat_barang(3.5)
    truk.muat_barang(5)
    truk.tambah_jarak(45)
    print(truk.deskripsi())
