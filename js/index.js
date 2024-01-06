var menuToggle = document.querySelector('.menu-toggle');
  
menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');

    document.body.dataset.nav = document.body.dataset.nav === 'true' ? 'false' : 'true';
});
