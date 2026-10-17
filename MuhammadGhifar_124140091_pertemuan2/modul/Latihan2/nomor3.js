
const dataDasar = {
  nama: "Mughi",
  jurusan: "Sistem Informasi",
  semester: 2
};

const dataAkademik = {
  jurusan: "Teknik Informatika",
  semester: 3,
  ipk: 3.75
};

const dataPembaruan = {
  semester: 4,
  status: "Aktif"
};

const mahasiswa = {
  ...dataDasar,
  ...dataAkademik,
  ...dataPembaruan
};

console.log("=== MERGE OBJECT ===");
console.log(mahasiswa);
