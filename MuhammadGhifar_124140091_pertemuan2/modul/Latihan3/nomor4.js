
function tampilkanProduk({
  nama = "Produk tanpa nama",
  harga = 0,
  kategori = "Umum"
} = {}) {
  console.log("=== INFORMASI PRODUK ===");
  console.log(`Nama: ${nama}`);
  console.log(`Harga: Rp${harga}`);
  console.log(`Kategori: ${kategori}`);
}

tampilkanProduk({
  nama: "Headset",
  harga: 250000,
  kategori: "Elektronik"
});

console.log("\n=== DENGAN DATA SEBAGIAN ===");

tampilkanProduk({
  nama: "Buku Pemrograman"
});

console.log("\n=== TANPA ARGUMEN ===");

tampilkanProduk();
