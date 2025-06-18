const list = document.getElementById('draggable-list');
let draggedItem = null;

list.addEventListener('dragstart', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  draggedItem = li;
  li.classList.add('dragging');
  li.setAttribute('aria-grabbed', 'true');
});

list.addEventListener('dragend', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  li.classList.remove('dragging');
  li.setAttribute('aria-grabbed', 'false');
  draggedItem = null;
});

list.addEventListener('dragover', (e) => {
  e.preventDefault();
  const target = e.target.closest('li');
  if (!target || target === draggedItem) return;

  const { top, height } = target.getBoundingClientRect();
  const before = e.clientY < top + height / 2;
  const refNode = before ? target : target.nextSibling;

  if (refNode !== draggedItem) {
    list.insertBefore(draggedItem, refNode);
  }
});
