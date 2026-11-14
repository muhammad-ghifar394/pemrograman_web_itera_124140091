"""Hands-on 1: Membuktikan bahwa tipe data dan fungsi adalah objek."""
angka = 42
pesan = "Praktikum Pemrograman Web ITERA"
daftar_nilai = [85, 90, 78]

print("Tipe angka:", type(angka), "| class:", angka.__class__)
print("Tipe pesan:", type(pesan), "| class:", pesan.__class__)
print("Tipe daftar:", type(daftar_nilai), "| class:", daftar_nilai.__class__)
print("\nManipulasi string:")
print("Huruf besar:", pesan.upper())
print("Pecah kata:", pesan.split())

def salam():
    return "Halo dari fungsi!"

print("\nTipe fungsi:", type(salam))
print("Identitas memori:", hex(id(salam)))
print("Hasil fungsi:", salam())
