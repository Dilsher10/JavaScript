const productList = document.getElementById("products");
const pagination = document.getElementById("pagination");
const message = document.getElementById("message");

const API_URL = 'https://dummyjson.com/products';
const limit = 10;
let currentPage = 1;
let totalPages = 0;

async function fetchProducts(page = 1) {
  try {
    showMessage('Loading...', 'loading');
    const skip = (page - 1) * limit;
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
    pagination.innerHTML = '';
    
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Prev';
    if (currentPage === 1) prevBtn.disabled = true;
    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        if (i === currentPage) button.className = 'active';
        button.addEventListener('click', () => goToPage(i));
        pagination.appendChild(button);
    }

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    if (currentPage === totalPages) nextBtn.disabled = true;
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
    pagination.appendChild(nextBtn);
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

