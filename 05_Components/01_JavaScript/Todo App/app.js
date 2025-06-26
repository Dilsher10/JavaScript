const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('todoList');

// Load todos from localStorage if they exist, or start with an empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];



// Add new todo when the "Add" button is clicked
addBtn.onclick = () => {
    const value = input.value.trim(); // Get and trim input
    if (value) {
        todos.push(value); // Add new todo
        input.value = ''; // Clear input field
        saveAndRender(); // Save and update UI
    }
};




// Function to save todos to localStorage and update the UI
function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos)); // Save to localStorage
    renderTodos(); // Re-render the list
}



// Function to render the todo list
function renderTodos() {
    list.innerHTML = ''; // Clear the current list

    // Loop through the todos array and create list items
    todos.forEach((todo, index) => {
        const li = document.createElement('li'); // Create list item
        li.textContent = todo; // Set the todo text

        // Create a delete button for this todo
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';

        // When the delete button is clicked, remove the todo
        delBtn.onclick = () => {
            todos.splice(index, 1); // Remove item from array
            saveAndRender(); // Save and re-render the list
        };


        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => {
            const newValue = prompt('Edit todo:', todo);
            if (newValue !== null) {
                const trimmed = newValue.trim();
                if (trimmed) {
                    todos[index] = trimmed;
                    saveAndRender();
                }
            }
        };


        // Append delete and edit buttons to list item and add it to the list
        li.appendChild(editBtn)
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}


// Initial render on page load
renderTodos();