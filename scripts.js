document.addEventListener("DOMContentLoaded", function() {
    const toggler = document.querySelector('.navbar-toggler');

    toggler.addEventListener('click', function() {
        this.classList.toggle('collapsed');
    });
});
