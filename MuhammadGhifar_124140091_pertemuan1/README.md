# Mini POS — Aplikasi Kasir & Keranjang Belanja

## Identitas
- **Nama:** Muhammad Ghifar
- **NIM:** 124140091
- **Kelas praktikum:** RA

## Deskripsi aplikasi
Mini POS adalah aplikasi web kasir sederhana untuk simulasi transaksi kantin atau toko kampus. Aplikasi dibuat menggunakan HTML, CSS, dan JavaScript tanpa framework. Pengguna dapat memasukkan barang ke keranjang, melihat subtotal dan total belanja, memperoleh diskon otomatis, serta menghitung kembalian. Data keranjang disimpan pada `localStorage`, sehingga tetap ada setelah halaman dimuat ulang.

## Cara menjalankan
1. Ekstrak folder proyek ke komputer.
2. Buka folder `muhammadghifar_124140091_pertemuan1` menggunakan Visual Studio Code.
3. Jalankan `index.html` menggunakan ekstensi **Live Server**, lalu pilih **Open with Live Server**.
4. Alternatif: buka `index.html` langsung di browser. Untuk perilaku penyimpanan yang konsisten, disarankan menggunakan Live Server.
5. Tambahkan barang melalui form untuk mencoba aplikasi.

## Daftar fitur
- [x] Validasi nama barang wajib diisi minimal 3 karakter.
- [x] Validasi harga berupa angka minimal Rp500.
- [x] Validasi qty berupa bilangan bulat minimal 1.
- [x] Pesan kesalahan berwarna merah ditampilkan di bawah input.
- [x] Form di-reset setelah barang berhasil ditambahkan.
- [x] Subtotal setiap baris dihitung dari harga satuan dikali qty.
- [x] Total belanja dijumlahkan otomatis.
- [x] Diskon otomatis 10% jika subtotal minimal Rp50.000.
- [x] Input uang bayar dan kalkulasi kembalian otomatis.
- [x] Status ditampilkan ketika uang belum mencukupi.
- [x] Tabel keranjang dengan tombol hapus per item.
- [x] Keranjang disimpan menggunakan `JSON.stringify()` dan dibaca menggunakan `JSON.parse()`.
- [x] Tombol kosongkan keranjang dan transaksi baru.
- [x] Layout responsif untuk desktop dan layar ponsel.

## Screenshot aplikasi
Simpan setidaknya tiga tangkapan layar buatanmu sendiri ke folder `screenshots/` dengan nama berikut:
1. `01-form-utama.png` — halaman utama dan form input barang.
2. `02-validasi-error.png` — tampilkan pesan error dengan mengirim form kosong atau harga di bawah Rp500.
3. `03-keranjang-pembayaran.png` — keranjang terisi dan ringkasan pembayaran. Untuk memperlihatkan diskon, masukkan barang dengan total subtotal minimal Rp50.000.

**Cara mengambil screenshot:** buka aplikasi melalui Live Server, atur tampilan browser agar seluruh bagian yang diperlukan terlihat, lalu gunakan `Win + Shift + S`. Simpan hasilnya dengan nama di atas pada folder `screenshots/`. Pastikan screenshot benar-benar berasal dari aplikasi yang dijalankan sebelum dikumpulkan.

## Penjelasan teknis singkat
### Validasi input
Saat form dikirim, event `submit` dicegah agar halaman tidak reload. Fungsi `validateProduct()` memeriksa nama barang, harga, dan qty. Jika ada input tidak valid, pesan ditampilkan di bawah input terkait dan fungsi berhenti sehingga barang tidak ditambahkan. Jika valid, barang masuk ke array `cart`, kemudian form di-reset.

### Perhitungan
Fungsi `calculateTotals()` menghitung subtotal setiap barang sebagai `price * qty`, lalu menjumlahkannya. Jika subtotal mencapai Rp50.000, diskon sebesar 10% dari subtotal diterapkan. Total akhir dihitung dengan rumus `subtotal - discount`. Fungsi `updatePayment()` membandingkan uang bayar dengan total akhir. Jika uang kurang, aplikasi menampilkan selisih kekurangan; jika cukup, aplikasi menampilkan kembalian.

### LocalStorage
Fungsi `saveCart()` menyimpan array `cart` ke browser dengan `JSON.stringify(cart)` melalui `localStorage.setItem()`. Saat aplikasi dibuka, `loadCart()` membaca data dengan `localStorage.getItem()` lalu mengubahnya kembali menjadi array dengan `JSON.parse()`. Penanganan `try...catch` digunakan untuk menghindari aplikasi berhenti jika data penyimpanan rusak. Tombol transaksi baru mengosongkan array dan menyimpan array kosong ke `localStorage`.

## Struktur folder
```text
muhammadghifar_124140091_pertemuan1/
├── index.html
├── style.css
├── script.js
├── README.md
├── screenshots/
│   └── (tambahkan 3 screenshot aplikasi)
└── modul/
    └── README.md
```