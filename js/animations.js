import { animate, inView, hover, stagger } from 'https://cdn.jsdelivr.net/npm/motion@latest/+esm';

const EASE_OUT = [0.22, 1, 0.36, 1];
const DUR_MED = 0.2;
const DUR_SLOW = 0.3;

function initScrollReveal() {
    document.querySelectorAll('.section-header').forEach(el => {
        animate(el, { opacity: 0, y: 24 }, { duration: 0 });

        inView(el, () => {
            animate(el, { opacity: 1, y: 0 }, {
                duration: DUR_SLOW,
                easing: EASE_OUT
            });
        }, { amount: 0.2 });
    });

    document.querySelectorAll('.project-list, .video-list').forEach(list => {
        const cards = list.querySelectorAll('.project-card, .video-card');
        if (!cards.length) return;

        animate(cards, { opacity: 0, y: 28 }, { duration: 0 });

        inView(list, () => {
            animate(cards, { opacity: 1, y: 0 }, {
                duration: DUR_SLOW,
                easing: EASE_OUT,
                delay: stagger(0.08)
            });
        }, { amount: 0.05 });
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
    if (!pageWrapper) return;

    requestAnimationFrame(() => {
        pageWrapper.classList.add('fade-in');
    });

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

            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
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
});
