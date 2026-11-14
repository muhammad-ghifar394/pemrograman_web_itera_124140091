"""Latihan Mandiri 4 - Enkapsulasi penggajian karyawan."""
class Karyawan:
    BATAS_GAJI_MINIMUM = 3_200_000

    def __init__(self, nama, jabatan, gaji_pokok):
        self.nama = nama
        self.jabatan = jabatan
        self.__gaji_pokok = 0
        self.gaji_pokok = gaji_pokok  # menggunakan setter untuk validasi

    @property
    def gaji_pokok(self):
        return self.__gaji_pokok

    @gaji_pokok.setter
    def gaji_pokok(self, nominal):
        if not isinstance(nominal, (int, float)):
            raise TypeError("Gaji pokok harus berupa angka.")
        if nominal < self.BATAS_GAJI_MINIMUM:
            raise ValueError(f"Gaji pokok minimal Rp{self.BATAS_GAJI_MINIMUM:,.0f}.")
        self.__gaji_pokok = float(nominal)

    def hitung_gaji_bersih(self, pajak_persen):
        if not 0 <= pajak_persen <= 100:
            raise ValueError("Pajak harus berada pada rentang 0-100%.")
        return self.gaji_pokok * (1 - pajak_persen / 100)

    def __str__(self):
        return f"{self.nama} - {self.jabatan} | Gaji pokok: Rp{self.gaji_pokok:,.0f}"

if __name__ == "__main__":
    karyawan = Karyawan("Alya Putri", "Staff Administrasi", 4_500_000)
    print(karyawan)
    print("Gaji bersih setelah pajak 5%: Rp{:,.0f}".format(karyawan.hitung_gaji_bersih(5)))
    try:
        karyawan.gaji_pokok = 3_000_000
    except ValueError as err:
        print("Validasi tertangkap:", err)
