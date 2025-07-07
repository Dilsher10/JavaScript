// Renders the product list in the DOM
export function renderProducts(products, container) {
  container.innerHTML = "";

  for (const product of products) {
    const div = document.createElement("div");
    div.className = "product";
    div.dataset.id = product.id;

    // Each product includes name, price, and add-to-cart button
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button data-add>Add to Cart</button>
    `;

    container.appendChild(div);
  }
}
