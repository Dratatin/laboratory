class ToFullScreen {
    constructor(elem) {
        this.elem = elem;
        this.fullScreenElem = this.elem.querySelector("[data-full-screen]");
        this.isVideo = this.fullScreenElem.dataset.fullScreen === "video";
        this.init();
    }
    init() {
        this.elem.addEventListener("click", (e) => {
            this.handleClickOpen(e);
        })
        this.fullScreenElem.addEventListener("click", (e) => {
            this.handleClickClose(e);
        })
    }
    calcuateElementPos() {
        const ElemWidth = this.elem.offsetWidth;
        const ElemHeight = this.elem.offsetHeight;
        const leftPos = this.elem.offsetLeft;
        const topPos = this.elem.offsetTop;
        
        const centralPosX = (leftPos + (ElemWidth / 2)) / window.innerWidth * 100;
        const centralPosY = (topPos + (ElemHeight / 2)) / window.innerHeight * 100;
        
        this.fullScreenElem.style.setProperty('--x-pos', centralPosX + "%")
        this.fullScreenElem.style.setProperty('--y-pos', centralPosY + "%")
    }
    handleClickOpen(e) {
        e.preventDefault();
        e.stopPropagation();
        this.calcuateElementPos(this.elem);
        this.toggleAnimation();

        if (this.isVideo) {
            this.fullScreenElem.querySelector("video").play();
        }
    }
    handleClickClose(e) {
        e.preventDefault();
        e.stopPropagation();
        this.toggleAnimation();

        if (this.isVideo) {
            this.fullScreenElem.querySelector("video").pause();
        }
    }
    toggleAnimation() {
        this.fullScreenElem.classList.toggle("animate")
    }
}



const cards = document.querySelectorAll("[data-card-animation]");
cards.forEach((card) => {
    new ToFullScreen(card)
})