document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!toggleBtn || !navMenu) return;

    const toggleMenu = () => {
        const isOpen = navMenu.hasAttribute('hidden') === false;
        if (isOpen) {
            navMenu.setAttribute('hidden', '');
            toggleBtn.setAttribute('aria-expanded', 'false');
        } else {
            navMenu.removeAttribute('hidden');
            toggleBtn.setAttribute('aria-expanded', 'true');
        }
    };

    toggleBtn.addEventListener('click', toggleMenu);

    // Optional: support Enter and Space keys
    toggleBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
});
