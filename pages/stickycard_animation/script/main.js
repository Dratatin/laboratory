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

class CustomScrollTrigger {
    constructor(component) {
        this.pinComponent = component;
        this.timeline = null;
        this.itemList = component.querySelector('[data-stickycard-list]')
        this.stickyCards = component.querySelectorAll('[data-stickycard-item]');
        this.init();
    }

    init() {
        this.timeline = this.createTimeline();
    }

    createTimeline() {
        const itemListHeight = this.itemList.offsetHeight;
        const timeline = gsap.timeline({
            ease: "none",
            scrollTrigger: {
                pin: true,
                scrub: true,
                trigger: this.pinComponent,
                start: "top top",
                end: () => `+=${itemListHeight}`,
                invalidateOnRefresh: true,
            }
        });

        this.stickyCards.forEach((card, index) => {
            if (index !== 0) {
                timeline.to(card, {
                    ease: "none",
                    duration: 1 * index,
                    yPercent: -100 * index,
                }, 0);
                if (index < this.stickyCards.length) {
                    timeline.to(this.stickyCards[index-1], {
                        ease: "none",
                        duration: 1,
                        scale: 0.8,
                    }, `-=1`);
                }
            }
        });
        return timeline;
    }
}

const stickyComponent = document.querySelector('[data-stickycard-section]');
const stickyComponentBis = document.querySelector('[data-stickycard-pin]');

if(stickyComponent) {
    new StickyCardAnimation(stickyComponent);
}

if(stickyComponentBis) {
    new CustomScrollTrigger(stickyComponentBis);
}


// onEnter: () => {
//     card.classList.add("active");
// },
// onLeave: () => {
//     card.classList.remove("active");
// }


// class StickyCardAnimationBis {
//     constructor(component) {
//         this.pinComponent = component;
//         this.itemList = component.querySelector('[data-stickycard-list]')
//         this.stickyCards = component.querySelectorAll('[data-stickycard-item]');
//         this.mountAnimation();    }
//     mountAnimation() {
//         const itemListHeight = this.itemList.offsetHeight;

//         gsap.to(this.pinComponent, {
//             scrollTrigger: {
//                 trigger: this.pinComponent,
//                 scrub: true,
//                 start: () => `top top`,
//                 end: () => `+=${itemListHeight}`,
//                 pin: true,
//                 markers: true
//             },
//         })

//         this.stickyCards.forEach((card, index) => {
//             gsap.to(card, {
//                 duration: 1,
//                 yPercent: -100 * index,
//                 scrollTrigger: {
//                     trigger: card,
//                     scrub: true,
//                     start: () => `top top`,
//                     end: () => `bottom+=150px`,
//                     markers: true,
//                 },
//                 ease: "expoScale(0.5,7,none)"
//             })
//         });

//         // this.stickyCards.forEach((card, index) => {
//         //     const finalTopPosition = 40;
//         //     const initialTopPosition = 100;
//         //     card.style.top = `${initialTopPosition}px`;
            
//         //     gsap.to(card, {
//         //         duration: 1,
//         //         scale: 0.8,
//         //         top: finalTopPosition,
//         //         scrollTrigger: {
//         //             trigger: card,
//         //             scrub: true,
//         //             start: () => `top ${initialTopPosition}`,
//         //             end: () => `bottom+=150px ${initialTopPosition}`,
//         //         },
//         //         ease: "expoScale(0.5,7,none)"
//         //     })
//         // });
//     }
// }


class StickyCardAnimationBis {
    constructor(component) {
        this.pinComponent = component;
        this.itemList = component.querySelector('[data-stickycard-list]')
        this.stickyCards = component.querySelectorAll('[data-stickycard-item]')
        this.mountAnimation();    }
    mountAnimation() {
        const itemListHeight = this.itemList.offsetHeight;

        this.stickyCards.forEach((card, index) => {
            gsap.to(card, {
              scrollTrigger: {
                trigger: card,
                start: () => `top bottom-=100`,
                end: () => `top top+=40`,
                scrub: true,
                markers: true,
                invalidateOnRefresh: true
              },
              ease: "none",
            });
          
            ScrollTrigger.create({
              trigger: card,
              start: "top top",
              pin: true,
              pinSpacing: false,
              markers: true,
              id: 'pin',
              end: 'max',
              invalidateOnRefresh: true,
            });
          });

        // this.stickyCards.forEach((card, index) => {
        //     const finalTopPosition = 40;
        //     const initialTopPosition = 100;
        //     card.style.top = `${initialTopPosition}px`;
            
        //     gsap.to(card, {
        //         duration: 1,
        //         scale: 0.8,
        //         top: finalTopPosition,
        //         scrollTrigger: {
        //             trigger: card,
        //             scrub: true,
        //             start: () => `top ${initialTopPosition}`,
        //             end: () => `bottom+=150px ${initialTopPosition}`,
        //         },
        //         ease: "expoScale(0.5,7,none)"
        //     })
        // });
        // gsap.to(this.stickyCards, {
        //     yPercent: -100,
        //     stagger: 0.5,
        //     scrollTrigger: {
        //         pin: this.pinComponent,
        //         markers: true,
        //         scrub: true,
        //         start: "top top",
        //         end: () => `+=${itemListHeight}`,
        //         invalidateOnRefresh: true
        //     }
        // });
    }
}