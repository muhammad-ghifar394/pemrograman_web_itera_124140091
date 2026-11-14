"""Latihan Mandiri 5 - Dispatcher multi-saluran notifikasi."""
class NotifikasiEmail:
    def kirim(self, pesan, penerima):
        print(f"[EMAIL] Kepada {penerima}: {pesan}")
        return True

class NotifikasiSMS:
    def kirim(self, pesan, penerima):
        print(f"[SMS] Ke {penerima}: {pesan}")
        return True

class NotifikasiWhatsApp:
    def kirim(self, pesan, penerima):
        print(f"[WHATSAPP] Ke {penerima}: {pesan}")
        return True

def broadcast_pengumuman(daftar_channel, pesan):
    """Setiap channel berisi objek dan penerima; pemanggilan kirim bersifat polimorfik."""
    hasil = []
    for channel, penerima in daftar_channel:
        hasil.append(channel.kirim(pesan, penerima))
    return all(hasil)

if __name__ == "__main__":
    daftar = [
        (NotifikasiEmail(), "mahasiswa@itera.ac.id"),
        (NotifikasiSMS(), "081234567890"),
        (NotifikasiWhatsApp(), "081298765432"),
    ]
    sukses = broadcast_pengumuman(daftar, "Perkuliahan dimulai pukul 08.00.")
    print("Seluruh kanal berhasil:", sukses)
