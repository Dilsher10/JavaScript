(function () {
    // Get DOM elements
    const form = document.getElementById('multiStepForm');
    const steps = Array.from(form.querySelectorAll('.step')); // All step divs
    const nextBtn = document.getElementById('next');
    const backBtn = document.getElementById('back');

    // Current step index (0-based)
    let currentStep = 0;

    /**
     * Show the step at the given index and hide others
     */
    function showStep(index) {
        steps.forEach((step, i) => {
            step.hidden = i !== index; // Show current, hide others
        });

        // Hide Back button on first step
        backBtn.style.display = index === 0 ? 'none' : 'inline';

        // Change Next button text to "Submit" on last step
        nextBtn.textContent = index === steps.length - 1 ? 'Submit' : 'Next';
    }

    /**
     * Validate inputs in the current step
     * Uses native HTML5 input validation
     */
    function validateCurrentStep() {
        const inputs = steps[currentStep].querySelectorAll('input');
        for (let input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity(); // Show native validation error
                return false;
            }
        }
        return true;
    }

    /**
     * Fill the review step with submitted values
     * Uses FormData to read all inputs from the form
     */
    function fillReview() {
        const data = new FormData(form); // Collect all form fields
        const output = [];

        for (let [key, value] of data.entries()) {
            // Generate HTML for review section
            output.push(`<p><strong>${key}:</strong> ${value}</p>`);
        }

        // Insert the generated HTML into the review div
        document.getElementById('review').innerHTML = output.join('');
    }

    /**
     * Handler for Next button click
     */
    nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            // Validate current step before moving on
            if (!validateCurrentStep()) return;

            // Go to next step
            currentStep++;

            // If next step is the review step, populate it
            if (currentStep === steps.length - 1) fillReview();

            // Show the updated step
            showStep(currentStep);
        } else {
            // On final step, treat it as submission
            alert('Form submitted!');
            form.reset();          // Clear form
            currentStep = 0;       // Reset step to beginning
            showStep(currentStep); // Show first step again
        }
    });

    /**
     * Handler for Back button click
     */
    backBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    /**
     * Initial setup: show first step
     */
    showStep(currentStep);
})();

