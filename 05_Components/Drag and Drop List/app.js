const list = document.getElementById('list');
let draggedItem = null;

// Handle drag start
function handleDragStart(e) {
    const li = e.target.closest('li');
    draggedItem = li;
    li.classList.add('dragging');
    li.setAttribute('aria-grabbed', 'true');
}

// Handle drag end
function handleDragEnd(e) {
    const li = e.target.closest('li');
    li.classList.remove('dragging');
    li.setAttribute('aria-grabbed', 'false');
    draggedItem = null;
}

// Handle drag over
function handleDragOver(e) {
    e.preventDefault();

    const target = e.target.closest('li');
    if (!target || target === draggedItem) return;

    // Gets the position of the target element on the screen:
    const { top, height } = target.getBoundingClientRect();

    // Decides whether the cursor is:
    const before = e.clientY < top + height / 2;

    // Calculates where to insert the dragged item:
    const refNode = before ? target : target.nextSibling;

    // Only insert if not already in that position
    if (draggedItem && refNode && draggedItem !== refNode) {
        list.insertBefore(draggedItem, refNode);
    }
}

// Attach event listeners
list.addEventListener('dragstart', handleDragStart);
list.addEventListener('dragend', handleDragEnd);
list.addEventListener('dragover', handleDragOver);
