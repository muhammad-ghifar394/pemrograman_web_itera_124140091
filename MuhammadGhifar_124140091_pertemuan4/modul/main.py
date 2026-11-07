
from password_gen import buat_password_acak

password = buat_password_acak()

print("Password acak:", password)

# Menguji dengan panjang tertentu
password2 = buat_password_acak(12)

print("Password 12 karakter:", password2)
