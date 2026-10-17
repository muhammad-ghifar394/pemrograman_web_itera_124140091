
const mahasiswa = [
  { nama: "Alya", jurusan: "Informatika" },
  { nama: "Bima", jurusan: "Sistem Informasi" },
  { nama: "Citra", jurusan: "Informatika" },
  { nama: "Doni", jurusan: "Sistem Informasi" },
  { nama: "Eka", jurusan: "Informatika" }
];

function groupBy(array, key) {
  return array.reduce((hasil, item) => {
    const nilaiKey = item[key];

    if (!hasil[nilaiKey]) {
      hasil[nilaiKey] = [];
    }

    hasil[nilaiKey].push(item);
    return hasil;
  }, {});
}

const hasil = groupBy(mahasiswa, "jurusan");

console.log("=== GROUP BY JURUSAN ===");
console.log(hasil);
