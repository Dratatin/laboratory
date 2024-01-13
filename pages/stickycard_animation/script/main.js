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
            const finalTopPosition = 30*(index+1);
            const initialTopPosition = 60*(index+1) - finalTopPosition;
            card.style.top = `${initialTopPosition}px`;
            
            gsap.to(card, {
                duration: 1,
                scale: 0.8,
                top: finalTopPosition,
                scrollTrigger: {
                    trigger: card,
                    scrub: true,
                    start: () => `top ${initialTopPosition}`,
                    end: () => `bottom ${initialTopPosition}`,
                },
            })
        });
    }
}

class StickyCardAnimationBis {
    constructor(component) {
        this.component = component;
        this.stickyCards = component.querySelectorAll('[data-stickycard-item]')
        this.mountAnimation();    }
    mountAnimation() {
        this.stickyCards.forEach((card, index) => {
            const finalTopPosition = 40;
            const initialTopPosition = 100;
            card.style.top = `${initialTopPosition}px`;
            
            gsap.to(card, {
                duration: 1,
                scale: 0.8,
                top: finalTopPosition,
                scrollTrigger: {
                    trigger: card,
                    scrub: true,
                    start: () => `top ${initialTopPosition}`,
                    end: () => `bottom+=150px ${initialTopPosition}`,
                },
                ease: "expoScale(0.5,7,none)"
            })
        });
    }
}


const stickyComponent = document.querySelector('[data-stickycard-section]');
const stickyComponentBis = document.querySelector('[data-stickycard-section-bis]');

if(stickyComponent) {
    new StickyCardAnimation(stickyComponent);
}

if(stickyComponentBis) {
    new StickyCardAnimationBis(stickyComponentBis);
}


// onEnter: () => {
//     card.classList.add("active");
// },
// onLeave: () => {
//     card.classList.remove("active");
// }