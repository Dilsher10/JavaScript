const images = [
    "https://picsum.photos/id/1018/1000/500",
    "https://picsum.photos/id/1019/1000/500",
    "https://picsum.photos/id/1020/1000/500",
    "https://picsum.photos/id/1021/1000/500",
    "https://picsum.photos/id/1022/1000/500",
];

let currentImage = null;

const activeImage = document.getElementById('activeImage');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

const setActiveImage = (targetImage) => {
    currentImage = targetImage;
    activeImage.setAttribute('src', targetImage);
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


