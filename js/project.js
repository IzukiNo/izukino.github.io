import { initApp } from "./main.js";

function initHashScroll() {
    const hash = window.location.hash;
    const validHashes = ['#code', '#edit'];

    if (validHashes.includes(hash)) {
        const targetSection = document.querySelector(hash);

        if (!targetSection) return;

        setTimeout(() => {
            const headerOffset = 96;
            const top =
                targetSection.getBoundingClientRect().top +
                window.pageYOffset -
                headerOffset;

            window.scrollTo({ top, behavior: 'smooth' });
        }, 150);
    }
}

export function initProjectPage() {
    initApp();
    initHashScroll();
}