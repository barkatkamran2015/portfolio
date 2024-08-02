document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    if (password === 'blogpass') { // Replace 'blogpass' with your desired password
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('blog-form').style.display = 'block';
        renderAdminBlogPosts(); // Render posts with delete options
    } else {
        alert('Incorrect password!');
    }
});

document.getElementById('blog-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageFile = document.getElementById('imageFile').files[0];

    if (imageFile) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const newPost = {
                title: title,
                content: content,
                imageUrl: e.target.result, // Data URL of the image
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };

            // Add new post to Firestore
            db.collection('blogPosts').add(newPost).then(() => {
                alert('New post added successfully!');
                document.getElementById('blog-form').reset();
                renderAdminBlogPosts(); // Refresh posts with delete options
            }).catch((error) => {
                console.error('Error adding blog post: ', error);
            });
        };

        reader.readAsDataURL(imageFile); // Read the image file as a Data URL
    } else {
        alert('Please upload an image.');
    }
});

function renderAdminBlogPosts() {
    const blogContainer = document.getElementById('admin-blog-container');
    blogContainer.innerHTML = '';

    // Fetch blog posts from Firestore
    db.collection('blogPosts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
            const post = doc.data();
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post');

            const titleElement = document.createElement('h2');
            titleElement.innerText = post.title;

            const contentElement = document.createElement('p');
            contentElement.innerText = post.content;

            const imageElement = document.createElement('img');
            imageElement.src = post.imageUrl;
            imageElement.alt = post.title;

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete Post';
            deleteButton.onclick = () => deleteAdminPost(doc.id);

            postElement.appendChild(titleElement);
            postElement.appendChild(contentElement);
            postElement.appendChild(imageElement);
            postElement.appendChild(deleteButton);

            blogContainer.appendChild(postElement);
        });
    });
}

// Function to delete a blog post
function deleteAdminPost(id) {
    db.collection('blogPosts').doc(id).delete().then(() => {
        console.log('Post deleted successfully');
        renderAdminBlogPosts();
    }).catch((error) => {
        console.error('Error deleting post: ', error);
    });
}
