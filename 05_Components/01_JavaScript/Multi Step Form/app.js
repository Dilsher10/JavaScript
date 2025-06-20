(function () {
    const form = document.getElementById('multiStepForm');
    const steps = Array.from(form.querySelectorAll('.step'));
    const nextBtn = document.getElementById('next');
    const backBtn = document.getElementById('back');
    let currentStep = 0;

    function showStep(index) {
        steps.forEach((step, i) => {
            step.hidden = i !== index;
        });
        backBtn.style.display = index === 0 ? 'none' : 'inline';
        nextBtn.textContent = index === steps.length - 1 ? 'Submit' : 'Next';
    }

    function validateCurrentStep() {
        const inputs = steps[currentStep].querySelectorAll('input');
        for (let input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return false;
            }
        }
        return true;
    }

    function fillReview() {
        const data = new FormData(form);
        const output = [];
        for (let [key, value] of data.entries()) {
            output.push(`<p><strong>${key}:</strong> ${value}</p>`);
        }
        document.getElementById('review').innerHTML = output.join('');
    }

    nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            if (!validateCurrentStep()) return;
            currentStep++;
            if (currentStep === steps.length - 1) fillReview();
            showStep(currentStep);
        } else {
            alert('Form submitted!');
            form.reset();
            currentStep = 0;
            showStep(currentStep);
        }
    });

    backBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    showStep(currentStep);
})();