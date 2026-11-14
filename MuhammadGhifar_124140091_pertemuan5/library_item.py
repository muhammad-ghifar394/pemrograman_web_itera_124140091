"""Modul berisi hierarki kelas item perpustakaan."""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Kelas abstrak dasar untuk seluruh item perpustakaan."""

    def __init__(self, item_id, judul, tahun_terbit):
        """Inisialisasi data umum item."""
        self._id = str(item_id)  # protected: digunakan oleh kelas turunan
        self._judul = judul
        self._tahun_terbit = int(tahun_terbit)
        self.__dipinjam = False  # private: status peminjaman dilindungi

    @property
    def id(self):
        """Mengembalikan ID item."""
        return self._id

    @property
    def judul(self):
        """Mengembalikan judul item."""
        return self._judul

    @property
    def tahun_terbit(self):
        """Mengembalikan tahun terbit item."""
        return self._tahun_terbit

    @property
    def is_dipinjam(self):
        """Mengembalikan status peminjaman tanpa membuka atribut private."""
        return self.__dipinjam

    @property
    def tersedia(self):
        """Item tersedia apabila sedang tidak dipinjam."""
        return not self.__dipinjam

    def pinjam(self):
        """Mengubah status item menjadi dipinjam jika tersedia."""
        if self.__dipinjam:
            return False
        self.__dipinjam = True
        return True

    def kembalikan(self):
        """Mengubah status item menjadi tersedia jika sedang dipinjam."""
        if not self.__dipinjam:
            return False
        self.__dipinjam = False
        return True

    @abstractmethod
    def get_detail(self):
        """Menghasilkan informasi khusus sesuai jenis item."""
        raise NotImplementedError

    @abstractmethod
    def hitung_denda(self, hari_terlambat):
        """Menghitung denda berdasarkan jenis item."""
        raise NotImplementedError


class Book(LibraryItem):
    """Item buku dengan informasi penulis dan tarif denda buku."""

    def __init__(self, item_id, judul, tahun_terbit, penulis):
        """Membuat objek buku."""
        super().__init__(item_id, judul, tahun_terbit)
        self._penulis = penulis

    def get_detail(self):
        """Mengembalikan detail buku."""
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return (
            f"[Buku] ID: {self.id} | Judul: {self.judul} | "
            f"Penulis: {self._penulis} | Tahun: {self.tahun_terbit} | "
            f"Status: {status}"
        )

    def hitung_denda(self, hari_terlambat):
        """Denda buku sebesar Rp2.000 per hari keterlambatan."""
        return max(0, int(hari_terlambat)) * 2000


class Magazine(LibraryItem):
    """Item majalah dengan informasi edisi dan tarif denda majalah."""

    def __init__(self, item_id, judul, tahun_terbit, edisi):
        """Membuat objek majalah."""
        super().__init__(item_id, judul, tahun_terbit)
        self._edisi = edisi

    def get_detail(self):
        """Mengembalikan detail majalah."""
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return (
            f"[Majalah] ID: {self.id} | Judul: {self.judul} | "
            f"Edisi: {self._edisi} | Tahun: {self.tahun_terbit} | "
            f"Status: {status}"
        )

    def hitung_denda(self, hari_terlambat):
        """Denda majalah sebesar Rp1.000 per hari keterlambatan."""
        return max(0, int(hari_terlambat)) * 1000
