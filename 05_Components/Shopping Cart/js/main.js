// Main app logic: initializes UI, handles product/cart events
import { fetchProducts } from "./api.js";
import { renderProducts } from "./products.js";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  getTotal,
  getItemCount,
} from "./cart.js";

// DOM elements
const productsContainer = document.getElementById("products");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const clearCartBtn = document.getElementById("clear-cart-btn");

let products = [];

// Render the cart UI with current items and totals
function renderCart() {
  const cart = getCart();
  cartItemsContainer.innerHTML = "";

  for (const item of cart) {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.quantity} - $${(item.quantity * item.price).toFixed(2)}
      <button data-remove="${item.id}" aria-label="Remove ${item.name}">Remove</button>
    `;
    cartItemsContainer.appendChild(li);
  }

  cartTotal.textContent = `Total: $${getTotal().toFixed(2)}`;
  cartCount.textContent = `Cart (${getItemCount()})`;
}

// Handle "Add to Cart" button click
function handleProductClick(e) {
  const addBtn = e.target.closest("button[data-add]");
  if (!addBtn) return;

  const productDiv = e.target.closest(".product");
  const productId = parseInt(productDiv.dataset.id);
  const product = products.find((p) => p.id === productId);
  addToCart(product);
  renderCart();
}

// Handle "Remove from Cart" button click
function handleCartClick(e) {
  const removeBtn = e.target.closest("button[data-remove]");
  if (!removeBtn) return;

  const productId = parseInt(removeBtn.dataset.remove);
  removeFromCart(productId);
  renderCart();
}

// Bind Clear Cart button
clearCartBtn.addEventListener("click", () => {
  clearCart();
  renderCart();
});

// Event delegation for products and cart items
productsContainer.addEventListener("click", handleProductClick);
cartItemsContainer.addEventListener("click", handleCartClick);

// Load and render products + cart on page load
(async function init() {
  products = await fetchProducts();
  renderProducts(products, productsContainer);
  renderCart();
})();
