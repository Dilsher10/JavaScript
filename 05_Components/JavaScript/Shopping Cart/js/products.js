export function renderProducts(products, container) {
    products.forEach((product) => {
        const div = document.createElement('div');
        div.className = "product";
        div.innerHTML = `
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button id="${product.id}">Add To Cart</button>
        `;
        container.appendChild(div);
    });
}



