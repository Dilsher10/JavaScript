const API_URL = 'https://dummyjson.com/products';
const limit = 10;
let currentPage = 1;
let totalPages = 0;

const productList = document.getElementById("products");
const pagination = document.getElementById("pagination");
const message = document.getElementById("message");

async function fetchProducts(page = 1) {
    const skip = (page - 1) * limit;

    try {
        showMessage('Loading...', 'loading');

        const response = await fetch(`${API_URL}?limit=${limit}&skip=${skip}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        totalPages = Math.ceil(data.total / limit);
        renderProducts(data.products);
        renderPagination();
        clearMessage();
    } catch (error) {
        showMessage(err.message || 'Something went wrong', 'error');
    }
}

function renderProducts(products) {
    productList.innerHTML = products.map(product => `
    <div>
      ${product.title} — $${product.price}
    </div>
  `).join('');
}


function renderPagination() {

    let buttons = "";

    buttons += `<button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>`;

    for (let i = 1; i <= totalPages; i++) {
        buttons += `<button onclick="goToPage(${i})" style="margin: 2px; font-weight: ${i === currentPage ? 'bold' : 'normal'}">${i}</button>`;
    }

    buttons += `<button onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;

    pagination.innerHTML = buttons;
}


function goToPage(page) {
    currentPage = page
    fetchProducts(currentPage)
}


function showMessage(text) {
  message.textContent = text;
}


function clearMessage() {
  message.textContent = '';
}


fetchProducts(currentPage);

