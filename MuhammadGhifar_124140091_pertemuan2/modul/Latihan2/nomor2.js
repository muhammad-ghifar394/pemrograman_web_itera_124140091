
function statistik(...angka) {
  if (angka.length === 0) {
    return {
      min: null,
      max: null,
      average: null
    };
  }

  const min = Math.min(...angka);
  const max = Math.max(...angka);

  const average =
    angka.reduce((total, nilai) => total + nilai, 0)
    / angka.length;

  return { min, max, average };
}

console.log("=== REST PARAMETERS ===");
console.log(statistik(10, 20, 5, 40, 25));
console.log(statistik(7, 3, 12));
