import { addToCart, countCartItems, getCart, getTotal, removeFromCart, clearCart } from "./cart.js";
import { fetchProducts } from "./api.js";
import { renderProducts } from "./products.js";
import { saveCart } from "./storage.js";

const productsContainer = document.getElementById('products');
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const clearCartBtn = document.getElementById("clear-cart-btn");


let products = [];

function renderCart() {
    const cart = getCart();
    cartItemsContainer.innerHTML = "";
    cart.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `
         ${item.name} x <input type='number' min='1' max='10' value='${item.quantity}' id='${item.id}'> - $${(item.quantity * item.price).toFixed(2)}
         <button id="${item.id}">remove</button>
        `;
        cartItemsContainer.appendChild(li);
    });
    cartTotal.textContent = `Total: $${getTotal().toFixed(2)}`;
    cartCount.textContent = `Cart (${countCartItems()})`;
}


function handleProductClick(e) {
    const addBtn = e.target.closest("button");
    const btnId = parseInt(addBtn.id);
    if (!addBtn) return;
    const product = products.find((p) => p.id === btnId);
    addToCart(product)
    renderCart()
}


function handleCartClick(e) {
    const removeBtn = e.target.closest("button");
    if (!removeBtn) return;
    const productId = parseInt(removeBtn.id);
    removeFromCart(productId);
    renderCart();
}


function handleClearCart() {
    clearCart();
    renderCart();
}


function handleChangeQuantity(e) {
    const input = e.target;
    if (input.tagName !== 'INPUT' || input.type !== 'number') return;
    const id = parseInt(input.id);
    const newQuantity = parseInt(input.value);
    let cart = getCart();
    const product = cart.find((p) => p.id === id);
    product.quantity = newQuantity;
    if (product) {
        saveCart(cart);
        renderCart();
    }
}


async function init() {
    products = await fetchProducts();
    renderProducts(products, productsContainer);
    renderCart()
}

init()


productsContainer.addEventListener("click", handleProductClick);
cartItemsContainer.addEventListener("click", handleCartClick);
clearCartBtn.addEventListener("click", handleClearCart);
cartItemsContainer.addEventListener("change", handleChangeQuantity);
