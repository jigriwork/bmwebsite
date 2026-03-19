document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Audio Player Logic
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const rewindBtn = document.getElementById('rewindBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const bgMusic = document.getElementById('bgMusic');
    
    if (audioPlayer && bgMusic) {
        // Play/Pause completely toggles
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    audioPlayer.classList.add('playing');
                }).catch(error => {
                    console.error("Audio playback failed:", error);
                });
            } else {
                bgMusic.pause();
                audioPlayer.classList.remove('playing');
            }
        });

        // Rewind 10 seconds
        rewindBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            bgMusic.currentTime = Math.max(0, bgMusic.currentTime - 10);
        });

        // Forward 10 seconds
        forwardBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            bgMusic.currentTime = Math.min(bgMusic.duration, bgMusic.currentTime + 10);
        });
    }

    // Instagram Live Feed Integration (Instafeed.js)
    const instafeedContainer = document.getElementById('instafeed');
    // NOTE TO OWNER: To make this live, you need an Instagram Long-Term Access Token.
    // Generate one via Facebook Developer -> Instagram Basic Display.
    // Paste it inside the quotes below. Until then, it shows the premium static fallback grid.
    const INSTAGRAM_ACCESS_TOKEN = ''; 

    if (instafeedContainer && typeof Instafeed !== 'undefined' && INSTAGRAM_ACCESS_TOKEN !== '') {
        try {
            var feed = new Instafeed({
                accessToken: INSTAGRAM_ACCESS_TOKEN,
                limit: 6,
                template: '<div class="insta-item"><a href="{{link}}" target="_blank" rel="noopener"><img title="{{caption}}" src="{{image}}" alt="Instagram post" /><div class="insta-overlay"><i data-lucide="instagram"></i></div></a></div>',
                after: function() {
                    lucide.createIcons();
                }
            });
            instafeedContainer.innerHTML = '';
            feed.run();
        } catch (error) {
            console.error("Instafeed initialization failed:", error);
        }
    }

    // Scroll to Top Logic
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY || document.documentElement.scrollTop;
            if (scrollPos > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
