
const daftarMahasiswa = [
  { nama: "Alya", jurusan: "Informatika", nilai: 90 },
  { nama: "Bima", jurusan: "Sistem Informasi", nilai: 85 },
  { nama: "Citra", jurusan: "Teknik Komputer", nilai: 92 }
];

console.log("=== DESTRUCTURING FOR...OF ===");

for (const { nama, jurusan, nilai } of daftarMahasiswa) {
  console.log(`${nama} | ${jurusan} | Nilai: ${nilai}`);
}
