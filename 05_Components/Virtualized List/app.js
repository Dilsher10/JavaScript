(function () {
    // Constants
    const ITEM_HEIGHT = 30;              // Height of each list item (in pixels)
    const VISIBLE_COUNT = 15;            // Number of items visible in the viewport at once
    const BUFFER = 5;                    // Extra items rendered above/below viewport for smoothness
    const TOTAL_ITEMS = 10000;           // Total number of items in the list

    // Get the scrolling container
    const container = document.getElementById('list-container');

    // Create a fake spacer div to simulate the total scroll height
    const viewport = document.createElement('div');
    viewport.className = 'list-viewport';
    viewport.style.height = `${TOTAL_ITEMS * ITEM_HEIGHT}px`; // Total height of all items
    container.appendChild(viewport);

    // This container will hold the actual rendered visible items
    const itemsContainer = document.createElement('div');
    itemsContainer.style.position = 'absolute'; // Positioned relative to container scroll
    container.appendChild(itemsContainer);

    // Render only the visible items (plus buffer)
    function renderVisibleItems() {
        const scrollTop = container.scrollTop; // How far we've scrolled from the top

        // Calculate index of first visible item
        const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);

        // Calculate index of last visible item (with buffer)
        const endIndex = Math.min(
            TOTAL_ITEMS - 1,
            startIndex + VISIBLE_COUNT + BUFFER
        );

        // Move the items container to align with the first visible item
        itemsContainer.style.top = `${startIndex * ITEM_HEIGHT}px`;

        // Clear any previously rendered items
        itemsContainer.innerHTML = '';

        // Render only the visible + buffered items
        for (let i = startIndex; i <= endIndex; i++) {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.textContent = `Item ${i + 1}`; // Display 1-based index
            itemsContainer.appendChild(item);
        }
    }

    // Initial render when page loads
    renderVisibleItems();

    // Re-render items on scroll
    container.addEventListener('scroll', renderVisibleItems);
})();
