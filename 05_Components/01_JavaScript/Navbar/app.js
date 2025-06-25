// Select the toggle button and nav menu
const toggleBtn = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Add click event to toggle menu visibility
toggleBtn.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  toggleBtn.setAttribute('aria-expanded', isOpen);
});
