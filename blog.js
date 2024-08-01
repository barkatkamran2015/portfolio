// Function to render blog posts
function renderBlogPosts() {
    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = '';

    const storedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    storedPosts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');

        const titleElement = document.createElement('h2');
        titleElement.innerText = post.title;

        const contentElement = document.createElement('p');
        contentElement.innerText = post.content; // Show full content

        const imageElement = document.createElement('img');
        imageElement.src = post.imageUrl;
        imageElement.alt = post.title;

        postElement.appendChild(titleElement);
        postElement.appendChild(contentElement);
        postElement.appendChild(imageElement);

        blogContainer.appendChild(postElement);
    });
}

// Initial rendering of blog posts
document.addEventListener('DOMContentLoaded', renderBlogPosts);
