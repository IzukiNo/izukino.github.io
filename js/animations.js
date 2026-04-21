// ============================================================
// ANIMATIONS.JS — Motion (Framer Motion) Vanilla JS
// Docs: https://motion.dev/docs
// ============================================================

import { animate, inView, hover, stagger } from 'https://cdn.jsdelivr.net/npm/motion@latest/+esm';

// ── Shared transition config ─────────────────────────────────
const EASE_OUT = [0.22, 1, 0.36, 1];     // cubic-bezier spring feel
const DUR_MED = 0.35;
const DUR_SLOW = 0.55;

// ============================================================
// 1. HERO REVEAL — staggered entrance on load
// ============================================================
function initHeroReveal() {
    const heroItems = document.querySelectorAll('.reveal');
    if (!heroItems.length) return;

    // Pre-set initial state
    animate(heroItems, { opacity: 0, y: 20 }, { duration: 0 });

    // Stagger reveal after a brief paint settle
    animate(
        heroItems,
        { opacity: 1, y: 0 },
        {
            duration: DUR_SLOW,
            easing: EASE_OUT,
            delay: stagger(0.1, { start: 0.05 })
        }
    );
}

// ============================================================
// 2. SCROLL REVEAL — cards + section headers
// ============================================================
function initScrollReveal() {
    // Section headers
    document.querySelectorAll('.section-header').forEach(el => {
        animate(el, { opacity: 0, y: 24 }, { duration: 0 });

        inView(el, () => {
            animate(el, { opacity: 1, y: 0 }, {
                duration: DUR_SLOW,
                easing: EASE_OUT
            });
        }, { amount: 0.2 });
    });

    // Card grids — stagger per group
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

// ============================================================
// 3. HOVER — cards
// ============================================================
function initCardHover() {
    document.querySelectorAll('.project-card, .video-card').forEach(card => {
        hover(card, () => {
            animate(card, { y: -6, scale: 1.015 }, {
                duration: DUR_MED,
                easing: EASE_OUT
            });

            // Return cleanup — runs on hover end
            return () => {
                animate(card, { y: 0, scale: 1 }, {
                    duration: DUR_MED,
                    easing: EASE_OUT
                });
            };
        });
    });
}

// ============================================================
// 4. HOVER — buttons & nav links
// ============================================================
function initButtonHover() {
    // Primary buttons — subtle lift
    document.querySelectorAll('.btn-primary, .nav-cta, .project-link').forEach(btn => {
        hover(btn, () => {
            animate(btn, { scale: 1.03 }, { duration: DUR_MED, easing: EASE_OUT });
            return () => animate(btn, { scale: 1 }, { duration: DUR_MED, easing: EASE_OUT });
        });

        // Tap — press down
        btn.addEventListener('pointerdown', () => {
            animate(btn, { scale: 0.96 }, { duration: 0.12, easing: EASE_OUT });
        });
        btn.addEventListener('pointerup', () => {
            animate(btn, { scale: 1 }, { duration: DUR_MED, easing: EASE_OUT });
        });
        btn.addEventListener('pointerleave', () => {
            animate(btn, { scale: 1 }, { duration: DUR_MED, easing: EASE_OUT });
        });
    });

    // Ghost / repo buttons — scale only (border handled by CSS)
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

// ============================================================
// 5. HOVER — hero avatar
// ============================================================
function initAvatarHover() {
    const avatar = document.querySelector('.hero-avatar img');
    if (!avatar) return;

    hover(avatar, () => {
        animate(avatar, { scale: 1.04 }, { duration: DUR_SLOW, easing: EASE_OUT });
        return () => animate(avatar, { scale: 1 }, { duration: DUR_SLOW, easing: EASE_OUT });
    });
}

// ============================================================
// 6. HOVER — social links
// ============================================================
function initSocialHover() {
    document.querySelectorAll('.social-links a').forEach(link => {
        hover(link, () => {
            animate(link, { y: -3 }, { duration: DUR_MED, easing: EASE_OUT });
            return () => animate(link, { y: 0 }, { duration: DUR_MED, easing: EASE_OUT });
        });
    });
}

// ============================================================
// 7. THEME TOGGLE — spin on click for feedback
// ============================================================
function initToggleAnimation() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
        animate(btn, { rotate: [0, 180], scale: [1, 0.88, 1] }, {
            duration: 0.4,
            easing: EASE_OUT
        });
    });
}

// ── Init all ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initHeroReveal();
    initScrollReveal();
    initCardHover();
    initButtonHover();
    initAvatarHover();
    initSocialHover();
    initToggleAnimation();
});
