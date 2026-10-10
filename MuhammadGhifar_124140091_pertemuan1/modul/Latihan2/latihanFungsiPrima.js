function cekPrima(angka) {
    if (!Number.isInteger(angka) || angka <= 1) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(angka); i++) {
        if (angka % i === 0) {
            return false;
        }
    }

    return true;
}

console.log("7:", cekPrima(7));
console.log("10:", cekPrima(10));
console.log("1:", cekPrima(1));