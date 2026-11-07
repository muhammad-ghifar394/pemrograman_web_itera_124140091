
# Program Pengelolaan Nilai Mahasiswa

# Data mahasiswa
mahasiswa = [
    {
        "nama": "Andi",
        "nim": "123001",
        "nilai_uts": 80,
        "nilai_uas": 85,
        "nilai_tugas": 90
    },
    {
        "nama": "Budi",
        "nim": "123002",
        "nilai_uts": 75,
        "nilai_uas": 80,
        "nilai_tugas": 85
    },
    {
        "nama": "Citra",
        "nim": "123003",
        "nilai_uts": 90,
        "nilai_uas": 95,
        "nilai_tugas": 90
    },
    {
        "nama": "Dina",
        "nim": "123004",
        "nilai_uts": 60,
        "nilai_uas": 65,
        "nilai_tugas": 70
    },
    {
        "nama": "Eko",
        "nim": "123005",
        "nilai_uts": 50,
        "nilai_uas": 55,
        "nilai_tugas": 60
    }
]

# Menghitung nilai akhir dan grade
for mhs in mahasiswa:
    nilai_akhir = (
        0.3 * mhs["nilai_uts"]
        + 0.4 * mhs["nilai_uas"]
        + 0.3 * mhs["nilai_tugas"]
    )

    if nilai_akhir >= 80:
        grade = "A"
    elif nilai_akhir >= 70:
        grade = "B"
    elif nilai_akhir >= 60:
        grade = "C"
    elif nilai_akhir >= 50:
        grade = "D"
    else:
        grade = "E"

    mhs["nilai_akhir"] = nilai_akhir
    mhs["grade"] = grade

# Menampilkan tabel
print("\n=== DATA NILAI MAHASISWA ===")
print("-" * 75)
print(
    f"{'Nama':<12}"
    f"{'NIM':<12}"
    f"{'UTS':<8}"
    f"{'UAS':<8}"
    f"{'Tugas':<8}"
    f"{'Akhir':<10}"
    f"{'Grade':<5}"
)
print("-" * 75)

for mhs in mahasiswa:
    print(
        f"{mhs['nama']:<12}"
        f"{mhs['nim']:<12}"
        f"{mhs['nilai_uts']:<8}"
        f"{mhs['nilai_uas']:<8}"
        f"{mhs['nilai_tugas']:<8}"
        f"{mhs['nilai_akhir']:<10.2f}"
        f"{mhs['grade']:<5}"
    )

print("-" * 75)

# Mencari nilai tertinggi dan terendah
tertinggi = max(mahasiswa, key=lambda m: m["nilai_akhir"])
terendah = min(mahasiswa, key=lambda m: m["nilai_akhir"])

print("\n=== NILAI TERTINGGI ===")
print(f"Nama  : {tertinggi['nama']}")
print(f"NIM   : {tertinggi['nim']}")
print(f"Nilai : {tertinggi['nilai_akhir']:.2f}")

print("\n=== NILAI TERENDAH ===")
print(f"Nama  : {terendah['nama']}")
print(f"NIM   : {terendah['nim']}")
print(f"Nilai : {terendah['nilai_akhir']:.2f}")
