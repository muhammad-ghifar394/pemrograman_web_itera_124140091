
# Cara impor pertama
import math_operations

# Cara impor kedua
from math_operations import (
    luas_persegi,
    keliling_persegi,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin
)

print("=== PROGRAM OPERASI MATEMATIKA ===")

# Persegi
sisi = 5
print("\n1. PERSEGI")
print("Sisi:", sisi)
print("Luas:", luas_persegi(sisi))
print("Keliling:", keliling_persegi(sisi))

# Persegi panjang
panjang = 10
lebar = 5
print("\n2. PERSEGI PANJANG")
print("Panjang:", panjang)
print("Lebar:", lebar)
print(
    "Luas:",
    math_operations.luas_persegi_panjang(panjang, lebar)
)
print(
    "Keliling:",
    math_operations.keliling_persegi_panjang(panjang, lebar)
)

# Lingkaran
jari_jari = 7
print("\n3. LINGKARAN")
print("Jari-jari:", jari_jari)
print(
    "Luas:",
    math_operations.luas_lingkaran(jari_jari)
)
print(
    "Keliling:",
    math_operations.keliling_lingkaran(jari_jari)
)

# Konversi suhu
suhu = 30
print("\n4. KONVERSI SUHU")
print("Celsius:", suhu)
print("Fahrenheit:", celsius_ke_fahrenheit(suhu))
print("Kelvin:", celsius_ke_kelvin(suhu))

print("\nNilai PI:", math_operations.PI)
