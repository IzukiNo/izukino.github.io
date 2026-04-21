// ======================================
// PROJECT.JS - Project page specific logic
// ======================================
// Card reveal animations are handled by IntersectionObserver in main.js.
// This file handles the hash-based smooth scroll feature.

document.addEventListener('DOMContentLoaded', () => {

    // Feature: Hash Routing Smooth Scroll (#edit, #code)
    const hash = window.location.hash;
    const validHashes = ['#code', '#edit'];

    if (validHashes.includes(hash)) {
        const targetSection = document.querySelector(hash);

        if (targetSection) {
            // Brief timeout lets the browser finish painting before scrolling
            setTimeout(() => {
                const headerOffset = 96; // Account for fixed header height
                const top = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;

                window.scrollTo({ top, behavior: 'smooth' });
            }, 150);
        }
    }

});
