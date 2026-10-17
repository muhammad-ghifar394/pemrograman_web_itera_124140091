
const penjualan = [
  { produk: "Laptop", kategori: "Elektronik", harga: 7500000, jumlah: 2 },
  { produk: "Mouse", kategori: "Elektronik", harga: 150000, jumlah: 5 },
  { produk: "Buku", kategori: "Alat Tulis", harga: 50000, jumlah: 10 },
  { produk: "Keyboard", kategori: "Elektronik", harga: 300000, jumlah: 3 },
  { produk: "Pulpen", kategori: "Alat Tulis", harga: 10000, jumlah: 20 }
];

// 1. Filter produk elektronik
const produkElektronik = penjualan.filter(item => {
  return item.kategori === "Elektronik";
});

// 2. Map untuk menghitung total per produk
const detailPenjualan = produkElektronik.map(item => ({
  produk: item.produk,
  total: item.harga * item.jumlah
}));

// 3. Reduce untuk menghitung total seluruh penjualan
const totalPenjualan = detailPenjualan.reduce((total, item) => {
  return total + item.total;
}, 0);

console.log("=== ANALISIS PENJUALAN ===");
console.log("Detail:", detailPenjualan);
console.log("Total penjualan elektronik: Rp" + totalPenjualan);
