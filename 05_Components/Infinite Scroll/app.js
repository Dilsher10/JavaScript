const postsContainer = document.getElementById('posts-container');
const loader = document.getElementById('loader');

let page = 1;
const limit = 10;
let isLoading = false;
let timeoutId = null; // for throttling



// ✅ Fetch posts from API
async function fetchPosts(page, limit) {
    try {
        const skip = (page - 1) * limit;
        const res = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        return data.posts;
    } catch (error) {
        console.error(error);
    }
}



// ✅ Render posts on page
function renderPosts(posts) {
    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        postsContainer.appendChild(div);
    });
}



// ✅ Load more posts
async function loadMorePosts() {
    if (isLoading) return;

    isLoading = true;

    const posts = await fetchPosts(page, limit);

    if (!posts || posts.length === 0) {
        loader.textContent = 'No more posts';
        observer.disconnect(); // stop observing
        return;
    }

    renderPosts(posts);
    page++;
    isLoading = false;
}



// ✅ Throttled Observer Callback using setTimeout only
function handleIntersect(entries) {
    
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        if (entries[0].isIntersecting) {
            loadMorePosts();
        }
    }, 500); // 500ms throttle
}



// ✅ Setup IntersectionObserver
const observer = new IntersectionObserver(handleIntersect, {
    root: null,
    threshold: 0.1,
});

observer.observe(loader);

// ✅ Load first posts
loadMorePosts();