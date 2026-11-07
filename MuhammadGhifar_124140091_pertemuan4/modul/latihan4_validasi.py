def validasi_password(password: str):
  if ((len(password) == 8) and any(karakter.isdigit() for karakter in password)):
    return True
  else:
    return False

password = input()
if validasi_password(password):
  print("password benar!!!")
else:
  print("password salah!!!")