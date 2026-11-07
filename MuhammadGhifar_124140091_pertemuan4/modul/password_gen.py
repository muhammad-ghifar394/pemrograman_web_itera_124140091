
import random
import string

def buat_password_acak(panjang=8):
    karakter = string.ascii_letters + string.digits
    password = ""

    for i in range(panjang):
        password += random.choice(karakter)

    return password
