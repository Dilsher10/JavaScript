import { saveCart, loadCart } from "./storage.js";

let cart = loadCart();

export function getCart() {
    return cart;
}

export function addToCart(product) {
    let existing = cart.find((item) => item.id === product.id);
    if (existing) {
        existing.quantity++
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart)
}


export function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    saveCart(cart);
}



export function getTotal() {
    return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
}



export function countCartItems() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}



export function clearCart(){
    cart = [];
    saveCart(cart);
}