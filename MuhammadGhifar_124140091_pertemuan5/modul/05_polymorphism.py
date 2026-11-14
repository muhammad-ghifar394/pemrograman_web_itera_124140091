"""Hands-on 6: Polymorphism, duck typing, collection dispatch, dan operator overloading."""
class MetodePembayaran:
    def __init__(self, nama_metode):
        self.nama_metode = nama_metode

    def bayar(self, tagihan):
        raise NotImplementedError("Subclass wajib mengimplementasikan bayar().")

class TransferBank(MetodePembayaran):
    def __init__(self, nama_bank, nomor_va):
        super().__init__(f"Transfer Bank {nama_bank}")
        self.nomor_va = nomor_va

    def bayar(self, tagihan):
        biaya_admin = 4000
        print(f"[{self.nama_metode}] Total: Rp{tagihan + biaya_admin:,.0f}")
        print("Virtual Account:", self.nomor_va)
        return True

class EWallet(MetodePembayaran):
    def __init__(self, nama_provider, nomor_hp, saldo_wallet):
        super().__init__(f"E-Wallet {nama_provider}")
        self.nomor_hp = nomor_hp
        self.saldo_wallet = saldo_wallet

    def bayar(self, tagihan):
        cashback = tagihan * 0.05
        if self.saldo_wallet < tagihan:
            print(f"[{self.nama_metode}] Gagal: saldo tidak cukup.")
            return False
        self.saldo_wallet -= tagihan
        print(f"[{self.nama_metode}] Pembayaran Rp{tagihan:,.0f} berhasil.")
        print(f"Cashback Rp{cashback:,.0f}; sisa saldo Rp{self.saldo_wallet:,.0f}")
        return True

class CryptoPayment:
    """Tidak mewarisi MetodePembayaran, tetapi memenuhi pola duck typing."""
    def __init__(self, wallet_address, crypto_symbol="USDT"):
        self.wallet_address = wallet_address
        self.crypto_symbol = crypto_symbol

    def bayar(self, tagihan):
        total_crypto = tagihan / 16000
        print(f"[Crypto] Rp{tagihan:,.0f} = {total_crypto:.2f} {self.crypto_symbol}")
        print("Transaksi simulasi untuk wallet", self.wallet_address)
        return True

def proses_checkout_pesanan(daftar_opsi_bayar, total_belanja):
    print(f"\n=== CHECKOUT Rp{total_belanja:,.0f} ===")
    hasil = []
    for opsi in daftar_opsi_bayar:
        print("\nMemproses:", getattr(opsi, "nama_metode", type(opsi).__name__))
        hasil.append(opsi.bayar(total_belanja))
    return hasil

class Dompet:
    def __init__(self, pemilik, saldo):
        self.pemilik = pemilik
        self.saldo = saldo

    def __add__(self, other):
        if isinstance(other, Dompet):
            return Dompet(f"{self.pemilik} & {other.pemilik}", self.saldo + other.saldo)
        if isinstance(other, (int, float)):
            return Dompet(self.pemilik, self.saldo + other)
        return NotImplemented

    def __eq__(self, other):
        return isinstance(other, Dompet) and self.saldo == other.saldo

    def __str__(self):
        return f"Dompet({self.pemilik}): Rp{self.saldo:,.0f}"

if __name__ == "__main__":
    channel = [
        TransferBank("BCA", "880121140001"),
        EWallet("GoPay", "081234567890", 500000),
        CryptoPayment("0x71C...b89A", "USDT"),
    ]
    proses_checkout_pesanan(channel, 320000)
    print("\n--- Operator Overloading ---")
    d1, d2 = Dompet("Andi", 150000), Dompet("Budi", 250000)
    print("Dompet 1:", d1)
    print("Dompet 2:", d2)
    print("Hasil d1 + d2:", d1 + d2)
    print("Apakah saldo sama?", d1 == d2)
