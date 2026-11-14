"""Modul pengelolaan koleksi perpustakaan."""

from library_item import LibraryItem


class Library:
    """Menyimpan, menampilkan, dan mencari item perpustakaan."""

    def __init__(self, nama):
        """Membuat perpustakaan dengan koleksi privat."""
        self.nama = nama
        self.__koleksi = []

    def tambah_item(self, item):
        """Menambahkan item jika objek merupakan LibraryItem dan ID unik."""
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus berupa objek LibraryItem atau turunannya.")
        if self.cari_berdasarkan_id(item.id):
            raise ValueError(f"ID {item.id} sudah digunakan.")
        self.__koleksi.append(item)
        return True

    def tampilkan_katalog(self, hanya_tersedia=False):
        """Menampilkan katalog; polymorphism terjadi saat get_detail dipanggil."""
        items = [
            item for item in self.__koleksi
            if not hanya_tersedia or item.tersedia
        ]
        if not items:
            print("Belum ada item yang dapat ditampilkan.")
            return

        print(f"\n=== KATALOG {self.nama.upper()} ===")
        for nomor, item in enumerate(items, start=1):
            print(f"{nomor}. {item.get_detail()}")

    def cari_berdasarkan_id(self, item_id):
        """Mencari satu item berdasarkan ID."""
        for item in self.__koleksi:
            if item.id.lower() == str(item_id).lower():
                return item
        return None

    def cari_berdasarkan_judul(self, kata_kunci):
        """Mencari item berdasarkan sebagian atau seluruh judul."""
        kata_kunci = kata_kunci.strip().lower()
        return [
            item for item in self.__koleksi
            if kata_kunci in item.judul.lower()
        ]

    def jumlah_item(self):
        """Mengembalikan jumlah seluruh item dalam koleksi."""
        return len(self.__koleksi)
