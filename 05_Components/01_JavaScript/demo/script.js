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

let currentImage = null;

// Create dots based on the number of images
images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
        setActiveImage(images[index]);
    });
    dotsContainer.appendChild(dot);
});

const updateActiveDot = () => {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach(dot => dot.classList.remove("active"));
    dots[images.indexOf(currentImage)].classList.add("active");
};


const setActiveImage = (targetImage) => {
    currentImage = targetImage;
    activeImage.setAttribute('src', targetImage);
    updateActiveDot();
}

setActiveImage(images[0]);

leftArrow.addEventListener('click', () => {
    let currentIndex = images.indexOf(currentImage);
    if (currentIndex - 1 < 0) {
        currentIndex = images.length - 1;
    } else {
        currentIndex--;
    }
    setActiveImage(images[currentIndex]);
});


rightArrow.addEventListener('click', () => {
    let currentIndex = images.indexOf(currentImage);
    if (currentIndex + 1 === images.length) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    setActiveImage(images[currentIndex]);
});



setInterval(() => {
    let currentIndex = images.indexOf(currentImage);
    if (currentIndex + 1 === images.length) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    setActiveImage(images[currentIndex]);
}, 3000)