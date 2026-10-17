console.log("=== VAR DI DALAM DAN LUAR BLOCK ===");

var nama = "Mughi";

if (true) {
  var nama = "JavaScript";
  console.log("Di dalam block:", nama);
}

console.log("Di luar block:", nama);