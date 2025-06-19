// DOM elements
const uploader = document.getElementById('uploader');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const errorMsg = document.getElementById('errorMsg');

// Configuration constants
const MAX_FILES = 5;
const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

// Clicking the uploader triggers the hidden file input
uploader.addEventListener('click', () => fileInput.click());

// Allow keyboard interaction (Enter/Space)
uploader.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput.click();
    }
});

// Drag over styling
uploader.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploader.classList.add('dragover');
});

// Remove drag style on leave
uploader.addEventListener('dragleave', () => {
    uploader.classList.remove('dragover');
});

// Handle file drop
uploader.addEventListener('drop', (e) => {
    e.preventDefault();
    uploader.classList.remove('dragover');
    handleFiles(e.dataTransfer.files); // Process dropped files
});

// Handle file input change
fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files); // Process selected files
});

// Validate and display files
function handleFiles(files) {
    errorMsg.textContent = ''; // Clear previous error
    fileList.innerHTML = '';   // Clear previous file list
    const fileArray = Array.from(files);

    // Validate file count
    if (fileArray.length > MAX_FILES) {
        errorMsg.textContent = `You can upload a maximum of ${MAX_FILES} files.`;
        return;
    }

    // Process each valid file
    fileArray.forEach((file) => {
        // Type check
        if (!ACCEPTED_TYPES.includes(file.type)) {
            errorMsg.textContent = `Invalid file type: ${file.name}`;
            return;
        }

        // Size check
        if (file.size > MAX_SIZE) {
            errorMsg.textContent = `File too large: ${file.name} exceeds 2MB.`;
            return;
        }

        // Create file item element
        const item = document.createElement('div');
        item.className = 'file-item';

        // Show file name and size
        const name = document.createElement('div');
        name.className = 'file-name';
        name.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        item.appendChild(name);

        // Create and attach progress bar
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressContainer.appendChild(progressBar);
        item.appendChild(progressContainer);

        // Upload status
        const status = document.createElement('div');
        status.className = 'status';
        status.textContent = 'Uploading...';
        item.appendChild(status);

        // Optional image preview
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.className = 'preview-img';
            img.src = URL.createObjectURL(file);
            item.appendChild(img);
        }

        // Add item to the file list
        fileList.appendChild(item);

        // Simulate upload with progress bar animation
        simulateUpload(progressBar, status);
    });
}

// Simulated upload animation logic
function simulateUpload(progressBar, statusEl) {
    let progress = 0;
    const duration = 1000 + Math.random() * 2000; // Random 1–3 sec duration
    const interval = 50;
    const steps = duration / interval;
    const stepSize = 100 / steps;

    const uploadInterval = setInterval(() => {
        progress += stepSize;
        progressBar.style.width = `${Math.min(progress, 100)}%`;

        if (progress >= 100) {
            clearInterval(uploadInterval);
            statusEl.textContent = 'Uploaded';
            statusEl.style.color = 'green';
        }
    }, interval);
}