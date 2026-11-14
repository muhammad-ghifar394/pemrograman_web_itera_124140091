"""Latihan Mandiri 2 - Class Buku, diskon, __str__, dan __len__."""
class Buku:
    def __init__(self, judul, penulis, harga_asli, jumlah_halaman):
        if harga_asli < 0 or jumlah_halaman < 0:
            raise ValueError("Harga dan jumlah halaman tidak boleh negatif.")
        self.judul = judul
        self.penulis = penulis
        self.harga_asli = float(harga_asli)
        self.jumlah_halaman = int(jumlah_halaman)

    def hitung_harga_diskon(self, persen):
        if not 0 <= persen <= 100:
            raise ValueError("Persentase diskon harus 0 sampai 100.")
        return self.harga_asli * (1 - persen / 100)

    def __str__(self):
        return (f"Kartu Buku\nJudul: {self.judul}\nPenulis: {self.penulis}\n"
                f"Harga: Rp{self.harga_asli:,.0f}\nHalaman: {self.jumlah_halaman}")

    def __len__(self):
        return self.jumlah_halaman

if __name__ == "__main__":
    buku = Buku("Python untuk Pemula", "Andi", 120000, 250)
    print(buku)
    print("Harga setelah diskon 20%: Rp{:,.0f}".format(buku.hitung_harga_diskon(20)))
    print("Jumlah halaman melalui len():", len(buku))
