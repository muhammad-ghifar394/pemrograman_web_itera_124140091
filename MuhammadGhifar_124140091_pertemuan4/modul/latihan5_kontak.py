
kontak = {
    "Andi": "081234567890",
    "Budi": "082345678901"
}

while True:
    print("\n=== KATALOG KONTAK ===")
    print("1. Tambah Kontak")
    print("2. Cari Kontak")
    print("3. Tampilkan Semua Kontak")
    print("4. Keluar")

    pilihan = input("Pilih menu: ")

    if pilihan == "1":
        nama = input("Masukkan nama: ")
        nomor = input("Masukkan nomor telepon: ")
        kontak[nama] = nomor
        print("Kontak berhasil ditambahkan!")

    elif pilihan == "2":
        nama = input("Masukkan nama yang dicari: ")
        nomor = kontak.get(nama, "Kontak tidak ditemukan")
        print("Nomor telepon:", nomor)

    elif pilihan == "3":
        print("\nDaftar Kontak:")
        for nama, nomor in kontak.items():
            print(nama, ":", nomor)

    elif pilihan == "4":
        print("Program selesai.")
        break

    else:
        print("Pilihan tidak valid!")
