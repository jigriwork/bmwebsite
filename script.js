document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }

    const topbar = document.getElementById('topbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobilePanel = document.querySelector('.mobile-panel');
    const mobileLinks = document.querySelectorAll('.mobile-panel a');

    const handleScroll = () => {
        if (!topbar) return;

        if (window.scrollY > 20) {
            topbar.classList.add('scrolled');
        } else {
            topbar.classList.remove('scrolled');
        }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (menuToggle && mobilePanel) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobilePanel.classList.toggle('active');
            menuToggle.classList.toggle('active', isOpen);
            mobilePanel.setAttribute('aria-hidden', String(!isOpen));
        });

        mobileLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobilePanel.classList.remove('active');
                menuToggle.classList.remove('active');
                mobilePanel.setAttribute('aria-hidden', 'true');
            });
        });
    }
});