
const angkaBersarang = [
  1,
  [2, 3],
  [4, [5, 6]],
  [[7, 8], 9]
];

function flattenArray(array) {
  return array.reduce((hasil, item) => {
    if (Array.isArray(item)) {
      return hasil.concat(flattenArray(item));
    }

    return hasil.concat(item);
  }, []);
}

const hasil = flattenArray(angkaBersarang);

console.log("=== FLATTEN ARRAY ===");
console.log("Sebelum:", angkaBersarang);
console.log("Sesudah:", hasil);
