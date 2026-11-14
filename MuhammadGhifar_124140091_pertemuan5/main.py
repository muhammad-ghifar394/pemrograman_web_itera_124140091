"""Program utama demonstrasi sistem manajemen perpustakaan."""

from library import Library
from library_item import Book, Magazine


def main():
    """Menjalankan demonstrasi fitur perpustakaan."""
    perpustakaan = Library("Perpustakaan Kampus")

    # Menambahkan beberapa item dari dua subclass berbeda.
    perpustakaan.tambah_item(Book("B001", "Laskar Pelangi", 2005, "Andrea Hirata"))
    perpustakaan.tambah_item(Book("B002", "Bumi", 2014, "Tere Liye"))
    perpustakaan.tambah_item(Magazine("M001", "National Geographic", 2024, "Edisi Januari"))
    perpustakaan.tambah_item(Magazine("M002", "Sains dan Teknologi", 2023, "Edisi 12"))

    print("SISTEM MANAJEMEN PERPUSTAKAAN")
    print(f"Berhasil menambahkan {perpustakaan.jumlah_item()} item.")

    # Menampilkan seluruh katalog.
    perpustakaan.tampilkan_katalog()

    # Mencari item berdasarkan ID.
    print("\n=== PENCARIAN BERDASARKAN ID ===")
    hasil_id = perpustakaan.cari_berdasarkan_id("B001")
    print(hasil_id.get_detail() if hasil_id else "Item tidak ditemukan.")

    # Mencari item berdasarkan judul.
    print("\n=== PENCARIAN BERDASARKAN JUDUL ===")
    hasil_judul = perpustakaan.cari_berdasarkan_judul("national")
    if hasil_judul:
        for item in hasil_judul:
            print(item.get_detail())
    else:
        print("Item tidak ditemukan.")

    # Demonstrasi property status dan perubahan status peminjaman.
    print("\n=== STATUS KETERSEDIAAN ===")
    buku = perpustakaan.cari_berdasarkan_id("B002")
    print(f"Sebelum dipinjam: {'Tersedia' if buku.tersedia else 'Dipinjam'}")
    buku.pinjam()
    print(f"Setelah dipinjam: {'Tersedia' if buku.tersedia else 'Dipinjam'}")
    perpustakaan.tampilkan_katalog(hanya_tersedia=True)

    # Demonstrasi polymorphism pada method hitung_denda.
    majalah = perpustakaan.cari_berdasarkan_id("M001")
    print("\n=== DEMONSTRASI POLYMORPHISM: DENDA 3 HARI ===")
    print(f"Denda buku (3 hari): Rp{perpustakaan.cari_berdasarkan_id('B001').hitung_denda(3):,}")
    print(f"Denda majalah (3 hari): Rp{majalah.hitung_denda(3):,}")


if __name__ == "__main__":
    main()
