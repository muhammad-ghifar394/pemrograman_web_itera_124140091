"""
Latihan Mandiri 1 - Pemodelan Entitas Sistem Kasir Toko.

Entitas Produk:
- Atribut: kode_produk, nama, harga, stok.
- Metode: tambah_stok(jumlah), kurangi_stok(jumlah).

Entitas Keranjang:
- Atribut: pemilik, daftar_item, total_harga.
- Metode: tambah_produk(produk, jumlah), hitung_total().

Entitas Pengguna:
- Atribut: nama, email, alamat.
- Metode: perbarui_profil(nama, email, alamat), buat_pesanan(keranjang).

Contoh implementasi sederhana disediakan di bawah agar rancangan dapat diuji.
"""
class Produk:
    def __init__(self, kode_produk, nama, harga, stok):
        self.kode_produk, self.nama = kode_produk, nama
        self.harga, self.stok = harga, stok

    def tambah_stok(self, jumlah):
        if jumlah <= 0:
            raise ValueError("Jumlah harus positif.")
        self.stok += jumlah

    def kurangi_stok(self, jumlah):
        if jumlah <= 0 or jumlah > self.stok:
            raise ValueError("Jumlah tidak valid atau stok tidak cukup.")
        self.stok -= jumlah

class Keranjang:
    def __init__(self, pemilik):
        self.pemilik = pemilik
        self.daftar_item = []

    def tambah_produk(self, produk, jumlah):
        if jumlah <= 0 or jumlah > produk.stok:
            raise ValueError("Jumlah tidak valid atau stok tidak cukup.")
        produk.kurangi_stok(jumlah)
        self.daftar_item.append((produk, jumlah))

    def hitung_total(self):
        return sum(produk.harga * jumlah for produk, jumlah in self.daftar_item)

class Pengguna:
    def __init__(self, nama, email, alamat):
        self.nama, self.email, self.alamat = nama, email, alamat

    def perbarui_profil(self, nama=None, email=None, alamat=None):
        if nama is not None: self.nama = nama
        if email is not None: self.email = email
        if alamat is not None: self.alamat = alamat

    def buat_pesanan(self, keranjang):
        return {"pelanggan": self.nama, "total": keranjang.hitung_total()}

if __name__ == "__main__":
    produk = Produk("P001", "Mouse", 75000, 10)
    keranjang = Keranjang("Ghifar")
    keranjang.tambah_produk(produk, 2)
    pengguna = Pengguna("Ghifar", "ghifar@example.com", "Bandar Lampung")
    print("Total keranjang:", keranjang.hitung_total())
    print("Pesanan:", pengguna.buat_pesanan(keranjang))
