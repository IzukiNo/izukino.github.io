document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    const validHashes = ['#code', '#edit'];

    if (validHashes.includes(hash)) {
        const targetSection = document.querySelector(hash);

        if (targetSection) {
            setTimeout(() => {
                const headerOffset = 96;
                const top = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;

                window.scrollTo({ top, behavior: 'smooth' });
            }, 150);
        }
    }

});
