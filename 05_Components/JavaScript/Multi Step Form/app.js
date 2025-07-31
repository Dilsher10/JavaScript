const form = document.getElementById('multiStepForm');
const steps = Array.from(form.querySelectorAll('.step'));
const nextBtn = document.getElementById('next');
const backBtn = document.getElementById('back');


let currentStep = 0;


function showStep(index) {
    // Show current, hide others
    steps.forEach((step, i) => {
        if (i === index) {
            step.hidden = false;
        } else {
            step.hidden = true;
        }
    });
    backBtn.style.display = index === 0 ? 'none' : 'inline';
    nextBtn.textContent = index === steps.length - 1 ? 'Submit' : 'Next';
}



function nextStep() {
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
}



function backStep(){
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}



function fillReview() {
    const data = new FormData(form); // Collect all form fields
    const output = [];
    for (let [key, value] of data.entries()) {
        output.push(`<p><strong>${key}:</strong> ${value}</p>`);
    }
    document.getElementById('review').innerHTML = output.join('');
}



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


nextBtn.addEventListener('click', nextStep);
backBtn.addEventListener('click', backStep);
showStep(currentStep);

