import { products } from './data.js';
import { filterProducts } from './filter.js';
import { getUniqueCategories } from './categories.js';
import { debounce } from './utils.js';

const state = {
  filters: {
    category: '',
    maxPrice: Infinity,
    keyword: '',
  }
};

// DOM Elements
const productListEl = document.getElementById("product-list");
const categoryEl = document.getElementById("filter-category");
const priceEl = document.getElementById("filter-price");
const searchEl = document.getElementById("filter-search");

// Render products
function renderProductList(productArray) {
  productListEl.innerHTML = "";

  if (productArray.length === 0) {
    productListEl.innerHTML = "<p>No products found.</p>";
    return;
  }

  productArray.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: $${p.price}</p>
    `;
    productListEl.appendChild(div);
  });
}

// Filter + render
function updateAndRender() {
  const result = filterProducts(products, state.filters);
  renderProductList(result);
}

// Setup filters
function setupFilters() {
  const categories = getUniqueCategories(products);
  categoryEl.innerHTML = `<option value="">All</option>` +
    categories.map(c => `<option value="${c}">${c}</option>`).join('');

  categoryEl.addEventListener("change", e => {
    state.filters.category = e.target.value;
    updateAndRender();
  });

  priceEl.addEventListener("input", e => {
    const value = parseFloat(e.target.value);
    state.filters.maxPrice = isNaN(value) ? Infinity : value;
    updateAndRender();
  });

  searchEl.addEventListener("input", debounce(e => {
    state.filters.keyword = e.target.value;
    updateAndRender();
  }, 300));
}

// Init
setupFilters();
updateAndRender();
