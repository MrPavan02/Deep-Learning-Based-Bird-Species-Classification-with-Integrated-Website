const bird1 = document.getElementById("bird-1");
const container1 = document.getElementById("scrollContainer");
const birdStartX1 = window.innerWidth - 60;
let lastScrollTop1 = 0;

container1.addEventListener("scroll", () => {
    const scrollTop1 = container1.scrollTop;
    const maxScroll1 = container1.scrollHeight - container1.clientHeight + 80;
    const progress1 = scrollTop1 / maxScroll1;
    const birdX1 = birdStartX1 - progress1 * (birdStartX1 - 10);

    bird1.style.transform = `translateX(${birdX1 - birdStartX1}px)`;

    if (scrollTop1 < lastScrollTop1) {
        bird1.src = "../static/uploads/bird-right.png";
    } else {
        bird1.src = "../static/uploads/bird-left.png";
    }

    lastScrollTop1 = scrollTop1;
});

const bird2 = document.getElementById("bird-2");
const container2 = document.getElementById("scrollContainer");
const birdStartX2 = window.innerWidth - 58;
let lastScrollTop2 = 0;

container2.addEventListener("scroll", () => {
    const scrollTop2 = container2.scrollTop;
    const maxScroll2 = container2.scrollHeight - container2.clientHeight + 81;
    const progress2 = scrollTop2 / maxScroll2;
    const birdX2 = birdStartX2 - progress2 * (birdStartX2 - 10);

    bird2.style.transform = `translateX(${birdX2 - birdStartX2}px)`;

    if (scrollTop2 < lastScrollTop2) {
        bird2.src = "../static/uploads/bird-right.png";
    } else {
        bird2.src = "../static/uploads/bird-left.png";
    }

    lastScrollTop2 = scrollTop2;
});

