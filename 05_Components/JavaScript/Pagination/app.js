const productsList = document.getElementById('products');
const pagination = document.getElementById('pagination');
const message = document.getElementById('message');


const limit = 10;
let currentPage = 1;
let totalPages = 0;



async function fetchData(page = 1) {
    try {
        showMessage('Loading...', 'loading');
        const skip = (page - 1) * limit;
        const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        const data = await res.json();
        totalPages = Math.ceil(data.total / limit);
        renderData(data.products);
        renderPagination();
        clearMessage();
    } catch (error) {
        showMessage(err.message || 'Something went wrong', 'error');
    }
}


function renderData(data) {
    productsList.innerHTML = '';
    data.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
        <img src='${item.images[0]}' alt='${item.title}'>
        <h3>${item.title}</h3>
        <h3>$${item.price}</h3>
        `;
        productsList.appendChild(div);
    });
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
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    fetchData(currentPage);
}


function showMessage(text) {
    message.textContent = text;
}


function clearMessage() {
    message.textContent = '';
}


fetchData(currentPage)
