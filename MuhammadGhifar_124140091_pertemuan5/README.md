# Sistem Manajemen Perpustakaan Sederhana

## Identitas Mahasiswa

- **Nama Lengkap:** Muhammad Ghifar
- **NIM:** 124140091
- **Kelas Praktikum:** RA

## Deskripsi Program

Program ini merupakan sistem manajemen perpustakaan sederhana berbasis Python. Program dapat menambahkan buku dan majalah, menampilkan katalog, mencari item berdasarkan ID atau judul, serta menampilkan status ketersediaan item.

### Penerapan konsep OOP

1. **Class dan Object**  
   `LibraryItem`, `Book`, `Magazine`, dan `Library` merupakan class. Objek buku dan majalah dibuat di `main.py` untuk dikelola oleh objek `Library`.

2. **Inheritance (Pewarisan)**  
   `Book` dan `Magazine` mewarisi `LibraryItem`. Keduanya memperoleh atribut dan perilaku umum dari parent class.

3. **Encapsulation (Enkapsulasi)**  
   Atribut `_id`, `_judul`, `_tahun_terbit`, `_penulis`, dan `_edisi` menggunakan penamaan protected. Status peminjaman menggunakan atribut private `__dipinjam`. Koleksi pada class `Library` juga disimpan dalam atribut private `__koleksi`.

4. **Polymorphism (Polimorfisme)**  
   `Book` dan `Magazine` mengimplementasikan `get_detail()` dan `hitung_denda()` dengan perilaku berbeda. Saat `Library.tampilkan_katalog()` memanggil `item.get_detail()`, hasilnya menyesuaikan jenis objek.

5. **Abstract Class dan Property**  
   `LibraryItem` merupakan abstract class yang mewarisi `ABC` dan memiliki abstract method `get_detail()` serta `hitung_denda()`. Property `is_dipinjam` dan `tersedia` menyediakan akses terkontrol terhadap status peminjaman.

## Struktur Berkas

```text
sistem_perpustakaan_oop/
├── library_item.py
├── library.py
├── main.py
├── README.md
└── screenshot_output.png
```

## Panduan Menjalankan Program

Pastikan Python 3 sudah terpasang. Tidak diperlukan library tambahan.

1. Ekstrak file ZIP.
2. Buka terminal pada folder `sistem_perpustakaan_oop`.
3. Jalankan perintah:

```bash
python main.py
```

## Screenshot Output

File `screenshot_output.png` berisi tampilan hasil eksekusi program pada terminal. Jalankan kembali `python main.py` untuk menguji program secara langsung.

## Fitur yang Didemonstrasikan

- Menambahkan dua buku dan dua majalah.
- Menampilkan seluruh katalog.
- Mencari item berdasarkan ID.
- Mencari item berdasarkan kata pada judul.
- Memeriksa dan mengubah status ketersediaan melalui peminjaman.
- Menampilkan katalog item yang masih tersedia.
- Menghitung denda dengan implementasi berbeda pada buku dan majalah.
