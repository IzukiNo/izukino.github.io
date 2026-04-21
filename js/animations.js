import { animate, inView, hover, stagger } from 'https://cdn.jsdelivr.net/npm/motion@latest/+esm';

const EASE_OUT = [0.22, 1, 0.36, 1];
const DUR_MED = 0.2;
const DUR_SLOW = 0.3;

function initScrollReveal() {
    document.querySelectorAll('.section-header').forEach(el => {
        animate(el, {
            opacity: 0,
            y: 32,
            scale: 0.96,
            filter: "blur(2px)"
        }, { duration: 0 });

        const run = () => {
            animate(el, {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)"
            }, {
                duration: 0.7,
                easing: [0.16, 1, 0.3, 1]
            });
        };

        const isAboveFold = el.getBoundingClientRect().top < window.innerHeight;
        isAboveFold ? requestAnimationFrame(run) : inView(el, run, { amount: 0.2 });
    });


    document.querySelectorAll('.project-list, .video-list').forEach(list => {
        const cards = list.querySelectorAll('.project-card, .video-card');
        if (!cards.length) return;

        cards.forEach((card, i) => {
            const driftX = (Math.random() - 0.5) * 12;
            const delay = i * 0.1;

            animate(card, {
                opacity: 0,
                y: 40,
                x: driftX,
                scale: 0.95,
                filter: "blur(2px)"
            }, { duration: 0 });

            const run = () => {
                animate(card, {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    scale: 1,
                    filter: "blur(0px)"
                }, {
                    duration: 0.75,
                    easing: [0.16, 1, 0.3, 1],
                    delay
                });
            };

            const isAboveFold = card.getBoundingClientRect().top < window.innerHeight;
            isAboveFold ? requestAnimationFrame(run) : inView(card, run, { amount: 0.15 });
        });
    });
}

function initCardHover() {
    document.querySelectorAll('.project-card, .video-card').forEach(card => {
        hover(card, () => {
            animate(card, { y: -4, scale: 1.02 }, {
                duration: DUR_MED,
                easing: EASE_OUT
            });

            return () => {
                animate(card, { y: 0, scale: 1 }, {
                    duration: DUR_MED,
                    easing: EASE_OUT
                });
            };
        });
    });
}

function initButtonHover() {
    document.querySelectorAll('.btn-primary, .nav-cta, .project-link').forEach(btn => {
        hover(btn, () => {
            animate(btn, { y: -2, scale: 1.02 }, { duration: DUR_MED, easing: EASE_OUT });
            return () => animate(btn, { y: 0, scale: 1 }, { duration: DUR_MED, easing: EASE_OUT });
        });

        btn.addEventListener('pointerdown', () => {
            animate(btn, { y: 0, scale: 0.97 }, { duration: 0.12, easing: EASE_OUT });
        });
        btn.addEventListener('pointerup', () => {
            animate(btn, { scale: 1 }, { duration: DUR_MED, easing: EASE_OUT });
        });
        btn.addEventListener('pointerleave', () => {
            animate(btn, { y: 0, scale: 1 }, { duration: DUR_MED, easing: EASE_OUT });
        });
    });

    document.querySelectorAll('.btn-ghost, .project-repo, .video-link').forEach(btn => {
        hover(btn, () => {
            animate(btn, { scale: 1.02 }, { duration: DUR_MED, easing: EASE_OUT });
            return () => animate(btn, { scale: 1 }, { duration: DUR_MED, easing: EASE_OUT });
        });

        btn.addEventListener('pointerdown', () => {
            animate(btn, { scale: 0.97 }, { duration: 0.12, easing: EASE_OUT });
        });
        btn.addEventListener('pointerup', () => {
            animate(btn, { scale: 1 }, { duration: DUR_MED, easing: EASE_OUT });
        });
        btn.addEventListener('pointerleave', () => {
            animate(btn, { scale: 1 }, { duration: DUR_MED, easing: EASE_OUT });
        });
    });
}

function initAvatarHover() {
    const avatar = document.querySelector('.hero-avatar img');
    if (!avatar) return;

    hover(avatar, () => {
        animate(avatar, { scale: 1.04 }, { duration: DUR_SLOW, easing: EASE_OUT });
        return () => animate(avatar, { scale: 1 }, { duration: DUR_SLOW, easing: EASE_OUT });
    });
}

function initSocialHover() {
    document.querySelectorAll('.social-links a').forEach(link => {
        hover(link, () => {
            animate(link, { y: -3 }, { duration: DUR_MED, easing: EASE_OUT });
            return () => animate(link, { y: 0 }, { duration: DUR_MED, easing: EASE_OUT });
        });
    });
}

function initToggleAnimation() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
        animate(btn, { scale: [1, 0.85, 1], rotate: [0, 15, -5, 0] }, {
            duration: 0.4,
            easing: EASE_OUT
        });
    });
}

function initPageTransitions() {
    const pageWrapper = document.querySelector('.page-transition');
    const bg = document.getElementById('particle-background');

    if (!pageWrapper) return;

    // ===== INITIAL STATE =====
    if (bg) {
        animate(bg, {
            opacity: 0,
            scale: 1.05
        }, { duration: 0 });
    }

    // ===== ENTER =====
    requestAnimationFrame(() => {
        pageWrapper.classList.add('fade-in');

        if (bg) {
            animate(bg, {
                opacity: 1,
                scale: 1
            }, {
                duration: 1.6,
                easing: [0.22, 1, 0.36, 1],
                delay: 0.15
            });
        }
    });

    // ===== EXIT =====
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');

            if (!href || href.startsWith('#') || target === '_blank') return;
            if (href.startsWith('mailto') || href.startsWith('tel')) return;
            if (e.ctrlKey || e.metaKey || e.shiftKey) return;

            e.preventDefault();

            pageWrapper.classList.remove('fade-in');
            pageWrapper.classList.add('fade-out');

            if (bg) {
                animate(bg, {
                    opacity: 0,
                    scale: 1.05
                }, {
                    duration: 0.5,
                    easing: [0.4, 0, 0.2, 1]
                });
            }

            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });
}

function initIndexReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    elements.forEach((el, i) => {
        const driftX = (Math.random() - 0.5) * 16;
        const delay = i * 0.06;

        animate(el, {
            opacity: 0,
            y: 40,
            x: driftX,
            scale: 0.94,
            filter: "blur(6px)"
        }, { duration: 0 });

        const run = () => {
            animate(el, {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                filter: "blur(0px)"
            }, {
                duration: 0.6,
                easing: EASE_OUT,
                delay
            });
        };


        const isAboveFold = el.getBoundingClientRect().top < window.innerHeight;

        if (isAboveFold) {
            requestAnimationFrame(run);
        } else {
            inView(el, run, { amount: 0.2 });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initCardHover();
    initButtonHover();
    initAvatarHover();
    initSocialHover();
    initToggleAnimation();
    initPageTransitions();
    initIndexReveal();
});
