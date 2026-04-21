const THEME_KEY = 'izukino-theme';
const DEFAULT_THEME = 'dark';

function getParticleColor() {
    const theme = document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
    return theme === 'dark' ? '#ffffff' : '#000000';
}

function initParticles() {
    if (typeof particlesJS === 'undefined') return;
    const container = document.getElementById('particle-background');
    if (!container) return;

    const color = getParticleColor();

    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }

    particlesJS('particle-background', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: color },
            shape: {
                type: 'circle',
                stroke: { width: 0, color: '#000000' },
                polygon: { nb_sides: 5 }
            },
            opacity: {
                value: 1, random: true,
                anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 2, random: true,
                anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
            },
            line_linked: {
                enable: true, distance: 150,
                color: color, opacity: 0.3, width: 0.8
            },
            move: {
                enable: true, speed: 3, direction: 'none',
                random: false, straight: false, out_mode: 'out', bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 150, line_linked: { opacity: 1.5 } },
                bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                repulse: { distance: 200, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 }
            }
        },
        retina_detect: true
    });
}

function applyTheme(theme, animate) {
    const body = document.body;

    if (!animate) {
        body.classList.add('no-transition');
    }

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    const btn = document.querySelector('.theme-toggle');
    if (btn) {
        btn.setAttribute('aria-label',
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }

    setTimeout(initParticles, 50);

    if (!animate) {
        requestAnimationFrame(() => requestAnimationFrame(() => {
            body.classList.remove('no-transition');
        }));
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
    applyTheme(current === 'dark' ? 'light' : 'dark', true);
}

function initTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    const theme = stored || DEFAULT_THEME;
    applyTheme(theme, false);

    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.addEventListener('click', toggleTheme);
}

function updateCopyright() {
    const el = document.getElementById('copyright');
    if (el) {
        el.textContent = `\u00a9 ${new Date().getFullYear()} IzukiNo \u2014 All Rights Reserved.`;
    }
}

function initIslandScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    let ticking = false;
    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.scrollY > 48);
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateCopyright();
    initIslandScroll();
    initParticles();

    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
    });
});

window.addEventListener('load', () => {
    if (typeof particlesJS !== 'undefined' &&
        (!window.pJSDom || window.pJSDom.length === 0)) {
        initParticles();
    }
});
