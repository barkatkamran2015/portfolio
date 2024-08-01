// Function to get URL parameters
function getQueryParams() {
    const params = {};
    window.location.search.substring(1).split('&').forEach(param => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
    });
    return params;
}

// Function to render a single blog post
function renderBlogPost() {
    const params = getQueryParams();
    const postIndex = params.index;

    const storedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = storedPosts[postIndex];

    if (post) {
        const postContainer = document.getElementById('post-content');

        const titleElement = document.createElement('h2');
        titleElement.innerText = post.title;

        const contentElement = document.createElement('p');
        contentElement.innerText = post.content;

        const imageElement = document.createElement('img');
        imageElement.src = post.imageUrl;
        imageElement.alt = post.title;

        postContainer.appendChild(titleElement);
        postContainer.appendChild(contentElement);
        postContainer.appendChild(imageElement);
    } else {
        const postContainer = document.getElementById('post-content');
        postContainer.innerHTML = '<p>Post not found.</p>';
    }
}

// Initial rendering of the blog post
document.addEventListener('DOMContentLoaded', renderBlogPost);
