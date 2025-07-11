export function createActionButton(label, onClick, ariaLabel) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.setAttribute('aria-label', ariaLabel);
    btn.addEventListener('click', onClick);
    return btn;
}