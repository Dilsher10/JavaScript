const CART_KEY = 'cart';

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function loadCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}



// export function loadCart() {
//     const raw = localStorage.getItem(CART_KEY);
//     try {
//         return raw ? JSON.parse(raw) : [];
//     } catch (e) {
//         return [];
//     }
// }
