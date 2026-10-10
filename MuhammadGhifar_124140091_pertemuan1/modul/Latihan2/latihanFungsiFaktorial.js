function faktorial(angka) {
    if (angka < 0 || !Number.isInteger(angka)) {
        return "Masukkan bilangan bulat nonnegatif!";
    }

    let hasil = 1;

    for (let i = 1; i <= angka; i++) {
        hasil *= i;
    }

    return hasil;
}

console.log("Faktorial 5 =", faktorial(5));
console.log("Faktorial 0 =", faktorial(0));