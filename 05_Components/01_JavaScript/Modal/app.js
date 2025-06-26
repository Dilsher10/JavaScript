const modal = document.getElementById('modal');
const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');

let lastFocused = null;

function openModal() {
    lastFocused = document.activeElement; // Save current focus (e.g., "Open Modal" button)
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus(); // Focus inside the modal
}

function closeModal() {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    lastFocused.focus(); // Return focus to the button that opened the modal
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
        closeModal();
    }
});

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);


