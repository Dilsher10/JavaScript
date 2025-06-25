// Get references to DOM elements
let inputField = document.getElementById('inputField');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');

// Load the list from localStorage when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // Retrieve saved items from localStorage or initialize with an empty array
    const savedItems = JSON.parse(localStorage.getItem('todoList')) || [];
    // Add each saved item to the DOM
    savedItems.forEach(addItemToDOM);
});

// Add a new item when the "Add" button is clicked
addBtn.addEventListener('click', () => {
    // Get trimmed input value
    const value = inputField.value.trim();

    // Do nothing if input is empty
    if (value === "") return;

    // Add item to the DOM
    addItemToDOM(value);
    // Save item to localStorage
    saveItemToLocalStorage(value);
    // Clear the input field
    inputField.value = "";
});

// Helper function to add a list item to the DOM
function addItemToDOM(value) {
    const li = document.createElement('li'); // Create new list item
    li.textContent = value; // Set item text

    // Create a delete button for the item
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    // When delete button is clicked, remove item from DOM and localStorage
    deleteBtn.addEventListener('click', () => {
        li.remove(); // Remove item from DOM
        removeItemFromLocalStorage(value); // Remove from localStorage
    });

    // Append delete button to list item
    li.appendChild(deleteBtn);
    // Append list item to the list
    list.appendChild(li);
}

// Save a new item to localStorage
function saveItemToLocalStorage(value) {
    // Get current saved items or empty array
    const savedItems = JSON.parse(localStorage.getItem('todoList')) || [];
    // Add new item to array
    savedItems.push(value);
    // Save updated array to localStorage
    localStorage.setItem('todoList', JSON.stringify(savedItems));
}

// Remove a specific item from localStorage
function removeItemFromLocalStorage(value) {
    // Get current saved items
    let savedItems = JSON.parse(localStorage.getItem('todoList')) || [];
    // Filter out the item to be removed
    savedItems = savedItems.filter(item => item !== value);
    // Save updated array back to localStorage
    localStorage.setItem('todoList', JSON.stringify(savedItems));
}
