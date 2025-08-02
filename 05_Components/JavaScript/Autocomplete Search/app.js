const input = document.getElementById('input');
const results = document.getElementById('results');
let debounceTimer = null;
let cache = {};
let currentIndex = -1;



function handleKeydown(e) {
    const items = results.querySelectorAll('p');

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();

            currentIndex = currentIndex + 1;
            if (currentIndex >= items.length) {
                currentIndex = 0;
            }
            highlightItem(items);
            input.value = items[currentIndex].textContent;
            break;

        case 'ArrowUp':
            e.preventDefault();
            currentIndex = currentIndex - 1;
            if (currentIndex < 0) {
                currentIndex = items.length - 1;
            }
            highlightItem(items);
            input.value = items[currentIndex].textContent;
            break;
    }
}


function highlightItem(items) {
    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('active');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    })
}



function handleFocus() {
    let query = input.value.trim();
    if (cache[query]) {
        renderSuggestion(cache[query])
    }
    fetchSuggestions(query);
}



function handleBlur() {
    setTimeout(() => {
        clearResults();
    }, 300)
}



function handleInput() {
    let query = input.value.trim();
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (cache[query]) {
            renderSuggestion(cache[query])
        }
        fetchSuggestions(query);
    }, 300)
}


async function fetchSuggestions(query) {
    try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const data = await res.json();
        const products = data.products.slice(0, 10);
        cache[query] = products;
        renderSuggestion(products);
    } catch (error) {
        console.log(error);
    }
}


function renderSuggestion(items) {
    clearResults()
    items.forEach((product) => {
        const p = document.createElement('p');
        p.textContent = product.title;
        p.addEventListener('click', () => {
            input.value = product.title;
        });
        results.appendChild(p)
    });
}


function clearResults() {
    results.innerHTML = '';
}

input.addEventListener('input', handleInput);
input.addEventListener('focus', handleFocus);
input.addEventListener('blur', handleBlur);
input.addEventListener('keydown', handleKeydown);


