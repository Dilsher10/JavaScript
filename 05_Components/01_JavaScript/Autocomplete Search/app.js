const input = document.getElementById('autocomplete-input');
const resultsBox = document.getElementById('autocomplete-results');
let debounceTimer = null;

const API_URL = 'https://dummyjson.com/products/search?q=';



input.addEventListener('input', () => {
  const query = input.value.trim();

  clearTimeout(debounceTimer);

  if (query === '') {
    clearResults();
    return;
  }

  debounceTimer = setTimeout(() => {
    fetchSuggestions(query);
  }, 300);
});



async function fetchSuggestions(query) {
  try {
    const res = await fetch(API_URL + query);
    const data = await res.json();
    const products = data.products.slice(0, 10); // show top 10
    renderResults(products);
  } catch (error) {
    clearResults();
    console.error('Error fetching suggestions:', error);
  }
}



function renderResults(items) {
  clearResults();

  if (items.length === 0) return;

  items.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item.title;
    div.className = 'result-item';
    div.onclick = () => {
      input.value = item.title;
      clearResults();
    };
    resultsBox.appendChild(div);
  });
}



function clearResults() {
  resultsBox.innerHTML = '';
}
