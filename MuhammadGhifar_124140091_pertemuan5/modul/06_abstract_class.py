"""Hands-on 7: Abstract class Shape dan interface konektor database."""
from abc import ABC, abstractmethod
import math

class Shape(ABC):
    def __init__(self, nama):
        self.nama = nama

    @abstractmethod
    def luas(self) -> float:
        pass

    @abstractmethod
    def keliling(self) -> float:
        pass

    def cetak_laporan(self):
        print(f"[{self.nama}] Luas: {self.luas():.2f} unit persegi | Keliling: {self.keliling():.2f} unit")

class PersegiPanjang(Shape):
    def __init__(self, panjang, lebar):
        super().__init__("Persegi Panjang")
        self.panjang, self.lebar = panjang, lebar

    def luas(self):
        return self.panjang * self.lebar

    def keliling(self):
        return 2 * (self.panjang + self.lebar)

class Lingkaran(Shape):
    def __init__(self, radius):
        super().__init__("Lingkaran")
        self.radius = radius

    def luas(self):
        return math.pi * self.radius ** 2

    def keliling(self):
        return 2 * math.pi * self.radius

class DatabaseConnector(ABC):
    @property
    @abstractmethod
    def driver_name(self):
        pass

    @abstractmethod
    def connect(self, host, port, database):
        pass

    @abstractmethod
    def execute_query(self, sql):
        pass

    @abstractmethod
    def disconnect(self):
        pass

class PostgreSQLConnector(DatabaseConnector):
    @property
    def driver_name(self):
        return "PostgreSQL (simulasi psycopg2)"

    def connect(self, host, port, database):
        self.connected = True
        print(f"[{self.driver_name}] Terhubung ke {host}:{port}/{database} [OK]")

    def execute_query(self, sql):
        if not getattr(self, "connected", False):
            raise RuntimeError("Database belum terhubung.")
        print(f"[{self.driver_name}] Menjalankan SQL: {sql!r}")
        return [{"id": 1, "nama": "Ahmad"}, {"id": 2, "nama": "Nabila"}]

    def disconnect(self):
        self.connected = False
        print(f"[{self.driver_name}] Koneksi database ditutup.")

if __name__ == "__main__":
    print("--- Uji Shape ---")
    PersegiPanjang(10, 5).cetak_laporan()
    Lingkaran(7).cetak_laporan()
    print("\n--- Uji Abstract Enforcement ---")
    try:
        Shape("Bentuk Abstrak")
    except TypeError as err:
        print("Penolakan Python terbukti:", err)
    print("\n--- Uji Database Connector (simulasi, tanpa server sungguhan) ---")
    db = PostgreSQLConnector()
    db.connect("localhost", 5432, "paw_praktikum_db")
    print("Hasil query:", db.execute_query("SELECT id, nama FROM mahasiswa;"))
    db.disconnect()
