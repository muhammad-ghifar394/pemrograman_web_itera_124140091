
# Modul Operasi Matematika

PI = 3.14159


def luas_persegi(sisi):
    """Menghitung luas persegi."""
    return sisi * sisi


def keliling_persegi(sisi):
    """Menghitung keliling persegi."""
    return 4 * sisi


def luas_persegi_panjang(panjang, lebar):
    """Menghitung luas persegi panjang."""
    return panjang * lebar


def keliling_persegi_panjang(panjang, lebar):
    """Menghitung keliling persegi panjang."""
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari):
    """Menghitung luas lingkaran."""
    return PI * jari_jari * jari_jari


def keliling_lingkaran(jari_jari):
    """Menghitung keliling lingkaran."""
    return 2 * PI * jari_jari


def celsius_ke_fahrenheit(celsius):
    """Mengubah Celsius menjadi Fahrenheit."""
    return (celsius * 9 / 5) + 32


def celsius_ke_kelvin(celsius):
    """Mengubah Celsius menjadi Kelvin."""
    return celsius + 273.15
