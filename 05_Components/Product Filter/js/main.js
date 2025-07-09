import { products } from './data.js';
import { filterProducts } from './filter.js';
import { getUniqueCategories } from './categories.js';
import { debounce } from './utils.js';
import { renderProducts } from './products.js';

const state = {
  filters: {
    category: '',
    maxPrice: Infinity,
    keyword: '',
  }
};

// DOM Elements
const productList = document.getElementById("product-list");
const categoryEl = document.getElementById("filter-category");
const priceEl = document.getElementById("filter-price");
const searchEl = document.getElementById("filter-search");


// Filter + render
function updateAndRender() {
  const result = filterProducts(products, state.filters);
  renderProducts(result, productList);
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
