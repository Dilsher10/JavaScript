const images = [
    "https://picsum.photos/id/1018/1000/500",
    "https://picsum.photos/id/1019/1000/500",
    "https://picsum.photos/id/1020/1000/500",
    "https://picsum.photos/id/1021/1000/500",
    "https://picsum.photos/id/1022/1000/500",
];

const activeImage = document.getElementById("activeImage");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const dotsContainer = document.getElementById("dotsContainer");

let currentIndex = 0;
let autoplayTimeout;
let touchStartX = 0;
let touchEndX = 0;


// Touch Support

function handleTouchStartX(e){
    touchStartX = e.changedTouch[0].screenX;
}

function handleTouchEndX(e){
    touchEndX = e.changedTouch[0].screenX;
    handleGesture();
}

function handleGesture(){
    if(touchEndX < touchStartX - 50){
        goToNextImage();
    } else if(touchEndX > touchEndX + 50){
        goToPrevImage();
    }
}


// Mouse Events

function handleMouseEnter(){
    clearTimeout(autoplayTimeout);
}

function handleMouseLeave(){
    resetAutoplay();
}




// Keyboard Navigation
function handleKeydown(e){
    if(e.key === 'Arrowright'){
        goToNextImage();
    } else if(e.key === 'ArrowLeft'){
        goToPrevImage();
    }
}




// Create dots
images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
        setActiveImage(index);
    });
    dotsContainer.appendChild(dot);
});


function setActiveImage(index) {
    currentIndex = index;
    activeImage.setAttribute("src", images[currentIndex]);
    updateActiveDot();
    resetAutoplay();
}

function updateActiveDot() {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}

function goToNextImage() {
    const nextIndex = (currentIndex + 1) % images.length;
    setActiveImage(nextIndex);
}

function goToPrevImage() {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setActiveImage(prevIndex);
}

// Autoplay function with reset
function resetAutoplay() {
    clearTimeout(autoplayTimeout);
    autoplayTimeout = setTimeout(goToNextImage, 3000);
}

// Button click handlers
leftArrow.addEventListener("click", goToPrevImage);
rightArrow.addEventListener("click", goToNextImage);
document.addEventListener('keydown', handleKeydown);
activeImage.addEventListener('mouseenter', handleMouseEnter);
activeImage.addEventListener('mouseleave', handleMouseLeave);
activeImage.addEventListener('touchstart', handleTouchStartX);

// Initialize
setActiveImage(currentIndex);
