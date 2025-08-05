export function renderProducts(products, container) {
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
        return;
    }

    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <h3>${p.name}</h3>
            <p>Category: ${p.category}</p>
            <p>Price: $${p.price}</p>
        `;
        container.appendChild(div);
    });
}