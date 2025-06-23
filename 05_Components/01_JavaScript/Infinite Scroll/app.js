const postsContainer = document.getElementById('posts-container');
const loader = document.getElementById('loader');

let page = 1;
const limit = 10;
let loading = false;
let isEnd = false;


// === Throttle Utility ===
function throttle(fn, delay) {
    let timer = null;
    return function (...args) {
        if (timer) return;
        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, delay);
    };
}


// === Fetch Posts ===
async function fetchPosts(page, limit) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
}

// === Render Posts ===
function renderPosts(posts) {
    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        postsContainer.appendChild(div);
    });
}

// === Load More Posts ===
async function loadMorePosts() {
    if (loading || isEnd) return;
    loading = true;
    loader.textContent = 'Loading...';

    try {
        const posts = await fetchPosts(page, limit);
        if (posts.length === 0) {
            loader.textContent = 'No more posts.';
            isEnd = true;
            observer.disconnect();
            return;
        }
        renderPosts(posts);
        page++;
    } catch (error) {
        loader.textContent = 'Error loading posts';
        console.error(error);
    } finally {
        loading = false;
    }
}

// === Throttled Load Function ===
const throttledLoad = throttle(loadMorePosts, 500);

// === Intersection Observer ===
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        throttledLoad();
    }
}, {
    root: null,
    threshold: 0.1
});

observer.observe(loader);
loadMorePosts(); // Initial load
