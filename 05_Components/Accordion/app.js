function setupAccordion(containerSelector) {
    const container = document.querySelector(containerSelector);
    const items = Array.from(container.querySelectorAll('.accordion-item'));
    const focusableButtons = items.map(item => item.querySelector('.question'));

    const closeAll = () => {
        items.forEach(item => {
            const button = item.querySelector('.question');
            const answer = item.querySelector('.answer');
            const icon = item.querySelector('.icon');

            button.setAttribute('aria-expanded', 'false');
            answer.hidden = true;
            answer.setAttribute('aria-hidden', 'true');
            icon?.classList.remove('active');
        });
    };


    const toggleItem = (item) => {
        const button = item.querySelector('.question');
        const answer = item.querySelector('.answer');
        const icon = item.querySelector('.icon');
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        closeAll();

        if (!isExpanded) {
            button.setAttribute('aria-expanded', 'true');
            answer.hidden = false;
            icon?.classList.add('active');
        } else {
            button.setAttribute('aria-expanded', 'false');
            answer.hidden = true;
            icon?.classList.remove('active');
        }
    };



    const handleKeydown = (e, index) => {
        const total = focusableButtons.length;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                let nextIndex = index + 1;
                if (nextIndex >= total) {
                    nextIndex = 0;
                }
                focusableButtons[nextIndex].focus();
                break;

            case 'ArrowUp':
                e.preventDefault();
                let prevIndex = index - 1;
                if (prevIndex < 0) {
                    prevIndex = total - 1;
                }
                focusableButtons[prevIndex].focus();
                break;

            case 'Enter':
            case ' ':
                e.preventDefault();
                toggleItem(items[index]);
                break;
        }
    };



    items.forEach((item, index) => {
        const button = item.querySelector('.question');
        button.addEventListener('click', () => toggleItem(item));
        button.addEventListener('keydown', (e) => handleKeydown(e, index));
    });
}



document.addEventListener('DOMContentLoaded', () => {
    setupAccordion('#accordionGroup', { allowMultipleOpen: false });
});
