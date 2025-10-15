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

class TypeWriter {
    constructor(element, texts, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.texts = texts;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
        this.pauseTime = pauseTime;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.cursorVisible = true;
        
        // Mulai efek typing
        this.type();
        // Mulai efek blink cursor
        this.blinkCursor();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        let displayText = '';
        
        if (this.isDeleting) {
            // Menghapus teks
            displayText = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            // Mengetik teks
            displayText = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        // Update teks dengan cursor
        this.updateDisplay(displayText);
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            // Selesai mengetik, tunggu sebentar lalu mulai menghapus
            setTimeout(() => {
                this.isDeleting = true;
                this.type();
            }, this.pauseTime);
            return;
        }
        
        if (this.isDeleting && this.charIndex === 0) {
            // Selesai menghapus, pindah ke teks berikutnya
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }
        
        const speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
        setTimeout(() => this.type(), speed);
    }
    
    updateDisplay(text) {
        const cursor = this.cursorVisible ? '<span class="typing-cursor">|</span>' : '<span class="typing-cursor" style="opacity: 0">|</span>';
        this.element.innerHTML = text + cursor;
    }
    
    blinkCursor() {
        setInterval(() => {
            this.cursorVisible = !this.cursorVisible;
            const currentText = this.texts[this.textIndex].substring(0, this.charIndex);
            this.updateDisplay(currentText);
        }, 500); // Blink setiap 500ms
    }
}

// Cara penggunaan
const element = document.getElementById('typing-text');
const texts = [
    "Majelis Permusyawaratan Kelas",
    "MPK MAN IC OKI",
    "Kirimkan Aspirasi dan Ide-ide Kreatifmu",
    "Ayo Berkontribusi Untuk Sekolah!"
];

new TypeWriter(element, texts, 100, 50, 2000);

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
