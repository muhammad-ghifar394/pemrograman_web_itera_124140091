
const mahasiswa = {
  nama: "Mughi",
  akademik: {
    programStudi: {
      nama: "Teknik Informatika",
      fakultas: "Teknologi Industri"
    },
    semester: 3
  }
};

// Destructuring object hingga 3 level
const {
  nama,
  akademik: {
    programStudi: { nama: jurusan, fakultas },
    semester
  }
} = mahasiswa;

console.log("=== NESTED DESTRUCTURING ===");
console.log("Nama:", nama);
console.log("Jurusan:", jurusan);
console.log("Fakultas:", fakultas);
console.log("Semester:", semester);
