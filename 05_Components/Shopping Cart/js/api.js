export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "T-Shirt", price: 19.99 },
        { id: 2, name: "Jeans", price: 49.99 },
        { id: 3, name: "Sneakers", price: 89.99 },
        { id: 4, name: "Hat", price: 14.99 },
      ]);
    }, 500);
  });
}

