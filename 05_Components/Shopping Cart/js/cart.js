// Business logic for managing the shopping cart
import { saveCart, loadCart } from "./storage.js";

let cart = loadCart(); // initialize from localStorage

// Return current cart
export function getCart() {
  return cart;
}

// Add item to cart, increment quantity if already exists
export function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
}

// Remove item from cart
export function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
}

// Clear entire cart
export function clearCart() {
  cart = [];
  saveCart(cart);
}

// Get total price of all items
export function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Get total quantity of items
export function getItemCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
