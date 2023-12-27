const wrapper = document.querySelector(".wrapper");
const coursel = document.querySelector(".coursel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = coursel.querySelector(".card").offsetWidth;
const courselChildrens = [...coursel.children];

let isDragging = false, startX, startscrollLeft, timeoutId;

let cardPerView = Math.round(coursel.offsetWidth / firstCardWidth);

courselChildrens.slice(-cardPerView).reverse().forEach(card => {
    coursel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

courselChildrens.slice(0, cardPerView).reverse().forEach(card => {
    coursel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        coursel.scrollLeft += btn.id === "left" ? - firstCardWidth : firstCardWidth;
    })
});

const dragStart = (e) => {
    isDragging = true;
    coursel.classList.add("dragging");
    startX = e.pageX;
    startscrollLeft = coursel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return;
    coursel.scrollLeft = startscrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    coursel.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(() => coursel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

const indiniteScroll = () => {
    if(coursel.scrollLeft === 0) {
        coursel.classList.add("no-transition");
        coursel.scrollLeft = coursel.scrollWidth - (2 * coursel.offsetWidth);
        coursel.classList.remove("no-transition");
    }
    else if(Math.ceil(coursel.scrollLeft) === coursel.scrollWidth - coursel.offsetWidth) {
        coursel.classList.add("no-transition");
        coursel.scrollLeft = coursel.offsetWidth;
        coursel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if(wrapper.matches(":hover")) autoPlay();
}

coursel.addEventListener("mousedown", dragStart);
coursel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
coursel.addEventListener("scroll", indiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);