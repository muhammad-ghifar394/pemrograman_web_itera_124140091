
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  get productName() {
    return this.name;
  }

  get productPrice() {
    return this.price;
  }

  set productPrice(newPrice) {
    if (newPrice < 0) {
      console.log("Harga tidak boleh negatif!");
      return;
    }

    this.price = newPrice;
  }
}

const product = new Product("Keyboard", 200000);

console.log("Nama:", product.productName);
console.log("Harga awal:", product.productPrice);

product.productPrice = 175000;
console.log("Harga baru:", product.productPrice);

product.productPrice = -50000;
console.log("Harga akhir:", product.productPrice);
