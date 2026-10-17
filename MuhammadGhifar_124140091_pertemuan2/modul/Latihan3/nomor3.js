
const jenisProperti = "nama";
const namaKolom = "harga";
const nilaiProperti = "Laptop";
const nilaiHarga = 7500000;

const product = {
  [jenisProperti]: nilaiProperti,
  [namaKolom]: nilaiHarga,
  ["stok"]: 10
};

console.log("=== COMPUTED PROPERTY ===");
console.log(product);

// Contoh penggunaan dengan key dinamis
const key = "kategori";

product[key] = "Elektronik";

console.log(product);
