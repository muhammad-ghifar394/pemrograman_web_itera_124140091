"""Hands-on 4: Hierarki Kendaraan, overriding, multiple inheritance, dan MRO."""
from kendaraan import Kendaraan

class Mobil(Kendaraan):
    def __init__(self, merek, model, tahun, jumlah_pintu, kapasitas_tangki):
        super().__init__(merek, model, tahun)
        self.jumlah_pintu = jumlah_pintu
        self.kapasitas_tangki = float(kapasitas_tangki)
        self.sisa_bensin = float(kapasitas_tangki)

    def deskripsi(self):
        return f"{super().deskripsi()} [Mobil {self.jumlah_pintu} Pintu, Tangki: {self.kapasitas_tangki}L]"

    def klakson(self):
        return "Telolet! Telolet! (Klakson Mobil)"

    def isi_bensin(self, liter):
        if liter <= 0 or self.sisa_bensin + liter > self.kapasitas_tangki:
            print("Pengisian ditolak: jumlah tidak valid atau tangki akan meluap.")
            return False
        self.sisa_bensin += liter
        print(f"[{self.merek} {self.model}] Diisi {liter}L. Sisa bahan bakar: {self.sisa_bensin}L")
        return True

class Motor(Kendaraan):
    def __init__(self, merek, model, tahun, kapasitas_cc):
        super().__init__(merek, model, tahun)
        self.kapasitas_cc = kapasitas_cc

    def deskripsi(self):
        return f"{super().deskripsi()} [Motor Sport {self.kapasitas_cc}cc]"

    def klakson(self):
        return "Bip bip! (Klakson Motor)"

    def wheelie(self):
        print(f"[{self.merek} {self.model}] Melakukan atraksi wheelie satu roda!")

class KomponenBaterai:
    def __init__(self, kapasitas_kwh):
        self.kapasitas_kwh = kapasitas_kwh
        self.daya_tersisa = 100.0

    def isi_daya(self, persen):
        if persen < 0:
            raise ValueError("Persentase pengisian tidak boleh negatif.")
        self.daya_tersisa = min(100.0, self.daya_tersisa + persen)
        print(f"Baterai diisi ulang. Kapasitas daya: {self.daya_tersisa}%")

class MobilListrik(Mobil, KomponenBaterai):
    def __init__(self, merek, model, tahun, kapasitas_kwh):
        Mobil.__init__(self, merek, model, tahun, jumlah_pintu=4, kapasitas_tangki=0.0)
        KomponenBaterai.__init__(self, kapasitas_kwh)

    def deskripsi(self):
        return (f"{self.merek} {self.model} ({self.tahun}) "
                f"[EV Baterai {self.kapasitas_kwh} kWh, Daya: {self.daya_tersisa}%]")

if __name__ == "__main__":
    avanza = Mobil("Toyota", "Avanza Veloz", 2023, 5, 45.0)
    cbr = Motor("Honda", "CBR250RR", 2022, 250)
    ioniq = MobilListrik("Hyundai", "Ioniq 5", 2024, 72.6)
    print("--- Deskripsi Kendaraan ---")
    print(avanza.deskripsi())
    print(cbr.deskripsi())
    print(ioniq.deskripsi())
    print("\n--- Uji Klakson ---")
    print(avanza.model, ":", avanza.klakson())
    print(cbr.model, ":", cbr.klakson())
    print("\n--- Perjalanan & Energi ---")
    avanza.tambah_jarak(120.5)
    avanza.isi_bensin(10)
    cbr.wheelie()
    ioniq.isi_daya(30)
    print("\n--- Pemeriksaan Pewarisan ---")
    print("avanza instance Mobil:", isinstance(avanza, Mobil))
    print("avanza instance Kendaraan:", isinstance(avanza, Kendaraan))
    print("cbr instance Mobil:", isinstance(cbr, Mobil))
    print("Mobil subclass Kendaraan:", issubclass(Mobil, Kendaraan))
    print("MRO MobilListrik:", [c.__name__ for c in MobilListrik.__mro__])
