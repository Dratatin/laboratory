import { gsap } from "gsap";    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

class StickyCardAnimation {
    constructor(component) {
        this.component = component;
        this.stickyCards = component.querySelectorAll('[data-stickycard-item]')
        this.mountAnimation();    }
    mountAnimation() {
        this.stickyCards.forEach((card, index) => {
            const gsapTopAnimation = 30*(index+1);
            const stickytop = 60*(index+1) - gsapTopAnimation;
            card.style.top = `${stickytop}px`;
            
            gsap.to(card, {
                duration: 1,
                scale: 0.8,
                top: gsapTopAnimation,
                scrollTrigger: {
                    trigger: card,
                    scrub: true,
                    start: () => `top ${stickytop}`,
                    end: () => `bottom ${stickytop}`,
                },
            })
        });
    }
}


const stickyComponent = document.querySelector('[data-stickycard-section]');
if(stickyComponent) {
    new StickyCardAnimation(stickyComponent);
}


// onEnter: () => {
//     card.classList.add("active");
// },
// onLeave: () => {
//     card.classList.remove("active");
// }