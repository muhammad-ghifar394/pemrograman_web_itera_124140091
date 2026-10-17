
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  displayInfo() {
    console.log(`Produk: ${this.name}`);
    console.log(`Harga: Rp${this.price}`);
  }
}

class DigitalProduct extends Product {
  constructor(name, price, fileSize) {
    super(name, price);
    this.fileSize = fileSize;
  }

  displayInfo() {
    super.displayInfo();
    console.log(`Ukuran file: ${this.fileSize} MB`);
  }
}

class PhysicalProduct extends Product {
  constructor(name, price, weight) {
    super(name, price);
    this.weight = weight;
  }

  displayInfo() {
    super.displayInfo();
    console.log(`Berat: ${this.weight} gram`);
  }
}

const ebook = new DigitalProduct("E-book JavaScript", 50000, 15);
const mouse = new PhysicalProduct("Mouse Wireless", 150000, 200);

console.log("=== DIGITAL PRODUCT ===");
ebook.displayInfo();

console.log("\n=== PHYSICAL PRODUCT ===");
mouse.displayInfo();
