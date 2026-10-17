console.log("=== ARROW FUNCTION ===");

const tambah = (a, b) => a + b;

const sapa = () => "Halo, selamat belajar!";

const kuadrat = x => x * x;

const diskon = (harga, persen) =>
  harga - (harga * persen / 100);

console.log(tambah(5, 3));
console.log(sapa());
console.log(kuadrat(4));
console.log(diskon(100000, 20));