console.log("=== TEMPLATE LITERALS ===");

const nama = "Mughi";
const jurusan = "Teknik Informatika";

const html = `
<div class="card">
  <h2>Halo, ${nama}!</h2>
  <p>Jurusan: ${jurusan}</p>
  <p>Selamat belajar JavaScript!</p>
</div>
`;

console.log(html);