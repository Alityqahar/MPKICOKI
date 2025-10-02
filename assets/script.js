// Smooth scrolling untuk anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect pada scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});

// Smooth scrolling untuk anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar-custom').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect pada scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Animate on load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    // Inisialisasi carousel dengan interval
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
    });
    // Hide loading overlay with minimal delay
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        setTimeout(() => {
            overlay.classList.add('hide');
            setTimeout(() => { overlay.style.display = 'none'; }, 600);
        }, 500);
    }
});

// Efek transparansi navbar saat scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-custom');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 4px 24px 0 rgba(120,119,198,0.15), 0 1.5px 0 0 #7877c6';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.97)';
        navbar.style.boxShadow = '0 4px 24px 0 rgba(120,119,198,0.10), 0 1.5px 0 0 #7877c6';
    }
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});
backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
AOS.init();

// Animate on load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
