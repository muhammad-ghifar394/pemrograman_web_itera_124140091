
const mahasiswa = [
  { nama: "Alya", nilai: 85 },
  { nama: "Bima", nilai: 90 },
  { nama: "Citra", nilai: 75 },
  { nama: "Doni", nilai: 80 }
];

function hitungRataRata(data) {
  if (data.length === 0) {
    return 0;
  }

  const total = data.reduce((jumlah, item) => {
    return jumlah + item.nilai;
  }, 0);

  return total / data.length;
}

const rataRata = hitungRataRata(mahasiswa);

console.log("=== RATA-RATA NILAI ===");
console.log("Rata-rata:", rataRata);
