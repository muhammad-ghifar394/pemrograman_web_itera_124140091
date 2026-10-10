const STORAGE_KEY = "miniPOS_cart_v1";

const productForm = document.getElementById("product-form");
const nameInput = document.getElementById("product-name");
const priceInput = document.getElementById("product-price");
const qtyInput = document.getElementById("product-qty");
const cashInput = document.getElementById("cash-paid");
const cartBody = document.getElementById("cart-body");
const toast = document.getElementById("toast");

let cart = loadCart();
let toastTimeout;

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value || 0);
}

function loadCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    if (!savedCart) return [];
    const parsedCart = JSON.parse(savedCart);
    if (!Array.isArray(parsedCart)) return [];
    return parsedCart.filter(item =>
      item &&
      typeof item.name === "string" &&
      Number.isFinite(item.price) &&
      Number.isInteger(item.qty) &&
      item.price >= 500 &&
      item.qty >= 1
    );
  } catch (error) {
    console.error("Gagal membaca keranjang dari localStorage:", error);
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Gagal menyimpan keranjang:", error);
    showToast("Keranjang gagal disimpan di browser.");
  }
}

function calculateTotals() {
  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
  const discount = subtotal >= 50000 ? Math.round(subtotal * 0.10) : 0;
  const grandTotal = subtotal - discount;
  return { subtotal, discount, grandTotal };
}

function renderCart() {
  cartBody.innerHTML = "";

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <tr class="empty-row">
        <td colspan="6">
          <span class="empty-icon">▧</span>
          <strong>Keranjang masih kosong</strong>
          <small>Barang yang kamu tambahkan akan muncul di sini.</small>
        </td>
      </tr>`;
  } else {
    cart.forEach((item, index) => {
      const row = document.createElement("tr");
      const values = [
        String(index + 1),
        item.name,
        formatRupiah(item.price),
        String(item.qty),
        formatRupiah(item.price * item.qty)
      ];

      values.forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });

      const actionCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "btn btn-delete";
      deleteButton.textContent = "Hapus";
      deleteButton.setAttribute("aria-label", `Hapus ${item.name} dari keranjang`);
      deleteButton.addEventListener("click", () => removeItem(index));
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);
      cartBody.appendChild(row);
    });
  }

  updateSummary();
}

function updateSummary() {
  const { subtotal, discount, grandTotal } = calculateTotals();
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  document.getElementById("item-count").innerHTML =
    `${itemCount} <small>${itemCount === 1 ? "item" : "item"}</small>`;
  document.getElementById("cart-badge").textContent = `${cart.length} barang`;
  document.getElementById("stat-total").textContent = formatRupiah(subtotal);
  document.getElementById("stat-discount").textContent = formatRupiah(discount);
  document.getElementById("subtotal").textContent = formatRupiah(subtotal);
  document.getElementById("discount").textContent = `− ${formatRupiah(discount)}`;
  document.getElementById("grand-total").textContent = formatRupiah(grandTotal);

  const discountLabel = document.getElementById("discount-label");
  const promoNote = document.getElementById("promo-note");
  if (discount > 0) {
    discountLabel.textContent = "10% aktif";
    discountLabel.classList.add("active");
    promoNote.textContent = `Diskon 10% berhasil diterapkan karena subtotal mencapai ${formatRupiah(50000)}.`;
  } else {
    discountLabel.textContent = "Belum aktif";
    discountLabel.classList.remove("active");
    const remaining = Math.max(0, 50000 - subtotal);
    promoNote.textContent = cart.length
      ? `Tambah belanja ${formatRupiah(remaining)} lagi untuk mendapatkan diskon 10%.`
      : "Belanja minimal Rp50.000 untuk mendapatkan diskon 10%.";
  }
  updatePayment();
}

function updatePayment() {
  const { grandTotal } = calculateTotals();
  const cashValue = cashInput.value.trim();
  const cash = Number(cashValue);
  const box = document.getElementById("change-box");
  const status = document.getElementById("change-status");
  const detail = document.getElementById("change-detail");

  box.classList.remove("success", "insufficient");

  if (cart.length === 0 || cashValue === "") {
    status.textContent = "Menunggu pembayaran";
    detail.textContent = cart.length === 0
      ? "Tambahkan barang sebelum melakukan pembayaran."
      : "Masukkan nominal uang bayar.";
    return;
  }

  if (!Number.isFinite(cash) || cash < 0) {
    status.textContent = "Nominal tidak valid";
    detail.textContent = "Uang bayar harus berupa angka nol atau lebih.";
    box.classList.add("insufficient");
    return;
  }

  if (cash < grandTotal) {
    status.textContent = "Uang belum mencukupi";
    detail.textContent = `Kurang ${formatRupiah(grandTotal - cash)} lagi.`;
    box.classList.add("insufficient");
  } else {
    status.textContent = "Pembayaran mencukupi";
    detail.textContent = `Kembalian: ${formatRupiah(cash - grandTotal)}`;
    box.classList.add("success");
  }
}

function clearErrors() {
  document.getElementById("name-error").textContent = "";
  document.getElementById("price-error").textContent = "";
  document.getElementById("qty-error").textContent = "";
  [nameInput, priceInput, qtyInput].forEach(input => input.classList.remove("invalid"));
}

function showFieldError(input, errorId, message) {
  document.getElementById(errorId).textContent = message;
  input.classList.add("invalid");
}

function validateProduct(name, priceRaw, qtyRaw) {
  clearErrors();
  let valid = true;
  const cleanName = name.trim();
  const price = Number(priceRaw);
  const qty = Number(qtyRaw);

  if (cleanName.length < 3) {
    showFieldError(nameInput, "name-error", "Nama barang wajib diisi minimal 3 karakter.");
    valid = false;
  }
  if (priceRaw.trim() === "" || !Number.isFinite(price) || price < 500) {
    showFieldError(priceInput, "price-error", "Harga wajib berupa angka minimal Rp500.");
    valid = false;
  }
  if (qtyRaw.trim() === "" || !Number.isInteger(qty) || qty < 1) {
    showFieldError(qtyInput, "qty-error", "Jumlah wajib berupa bilangan bulat minimal 1.");
    valid = false;
  }

  return { valid, cleanName, price, qty };
}

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = validateProduct(nameInput.value, priceInput.value, qtyInput.value);
  if (!result.valid) return;

  cart.push({
    id: (typeof crypto !== "undefined" && crypto.randomUUID)
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: result.cleanName,
    price: result.price,
    qty: result.qty
  });

  saveCart();
  renderCart();
  productForm.reset();
  qtyInput.value = "1";
  clearErrors();
  nameInput.focus();
  showToast(`${result.cleanName} berhasil ditambahkan.`);
});

function removeItem(index) {
  const removed = cart[index];
  if (!removed) return;
  cart.splice(index, 1);
  saveCart();
  renderCart();
  showToast(`${removed.name} dihapus dari keranjang.`);
}

function resetTransaction() {
  cart = [];
  saveCart();
  renderCart();
  cashInput.value = "";
  updatePayment();
  showToast("Transaksi baru siap dimulai.");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2600);
}

[nameInput, priceInput, qtyInput].forEach(input => {
  input.addEventListener("input", () => {
    input.classList.remove("invalid");
    const errorId = {
      "product-name": "name-error",
      "product-price": "price-error",
      "product-qty": "qty-error"
    }[input.id];
    document.getElementById(errorId).textContent = "";
  });
});

cashInput.addEventListener("input", updatePayment);
document.getElementById("clear-cart").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Keranjang sudah kosong.");
    return;
  }
  cart = [];
  saveCart();
  renderCart();
  showToast("Keranjang berhasil dikosongkan.");
});
document.getElementById("new-transaction").addEventListener("click", resetTransaction);

renderCart();
