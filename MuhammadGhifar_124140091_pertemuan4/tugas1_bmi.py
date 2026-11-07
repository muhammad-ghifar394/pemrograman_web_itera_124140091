
# Program Penghitung BMI

# Input berat dan tinggi badan
berat = float(input("Masukkan berat badan (kg): "))
tinggi = float(input("Masukkan tinggi badan (m): "))

# Menghitung BMI
bmi = berat / (tinggi * tinggi)

# Menentukan kategori BMI
if bmi < 18.5:
    kategori = "Berat badan kurang"
elif bmi < 25:
    kategori = "Berat badan normal"
elif bmi < 30:
    kategori = "Berat badan berlebih"
else:
    kategori = "Obesitas"

# Menampilkan hasil
print("\n=== HASIL PERHITUNGAN BMI ===")
print(f"Berat badan : {berat} kg")
print(f"Tinggi badan: {tinggi} m")
print(f"BMI         : {bmi:.2f}")
print(f"Kategori    : {kategori}")
