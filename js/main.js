// ===========================================
// AWARD-WINNING INTERACTIONS V2.0
// ===========================================

// Feature 49: Robust Error Handling
window.onerror = function (msg, url, line, col, error) {
    console.warn("[Caramella System] Handled:", msg);
    return false;
};

document.addEventListener('DOMContentLoaded', () => {
    // Phase 2 Logic
    // F42: Greeting
    const h = new Date().getHours();
    const greet = h < 12 ? 'Good Morning' : h < 18 ? 'Good Afternoon' : 'Good Evening';
    const gEl = document.getElementById('greeting');
    if (gEl) gEl.innerText = greet + ", BRUNEI";

    // F2: Toggle
    window.toggleTheme = () => {
        document.body.classList.toggle('light-mode');
        const btn = document.querySelector('.nav-btn');
        if (btn) btn.innerHTML = document.body.classList.contains('light-mode') ? 'ðŸŒ™' : 'â˜€';
    };

    // F10: Haptics
    if (navigator.vibrate) {
        document.querySelectorAll('button, a').forEach(b => {
            b.addEventListener('pointerdown', () => navigator.vibrate(5));
        });
    }

    // Feature 50: System Ready Badge
    console.log("%c CARAMELLA BRUNEI %c SYSTEM ONLINE ", "background: #FFD700; color: #000; font-weight: bold; padding: 5px;", "background: #111; color: #fff; padding: 5px;");

    initPreloader();
    initParticles();
    initGallery();
    initHero();
    initAnimations();
    initAwardCursor();
    initNavbar();
    initMobileMenu();
    initCounterAnimation();
    initMagneticButtons();
    initScrollProgress(); // Feature 2: Scroll Progress
    initContactForm(); // Feature 21: Contact Form
    init3DTilt(); // NEW: Unreal-lite Effect

    // Feature 11: Configurator
    window.setMaterial = (part, color) => {
        const el = document.querySelector(`.${part}-part`);
        if (el) {
            el.style.fill = color;
            if (navigator.vibrate) navigator.vibrate(10);
        }
    };

    // Feature 12: Wishlist System
    let wishlist = JSON.parse(localStorage.getItem('caramella_wishlist') || '[]');

    window.toggleWishlist = (url, alt) => {
        const index = wishlist.findIndex(item => item.url === url);
        if (index === -1) {
            wishlist.push({ url, alt });
        } else {
            wishlist.splice(index, 1);
        }
        localStorage.setItem('caramella_wishlist', JSON.stringify(wishlist));
        updateWishlistUI();
        if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
    };

    window.updateWishlistUI = () => {
        const badge = document.getElementById('wish-count-badge');
        if (badge) {
            badge.innerText = wishlist.length;
            badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
        }

        // Update dots on cards
        document.querySelectorAll('.wishlist-trigger').forEach(btn => {
            const url = btn.parentElement.querySelector('img').src;
            btn.classList.toggle('active', wishlist.some(item => url.includes(item.url)));
        });
    };

    window.showWishlist = () => {
        const modal = document.getElementById('wishlist-modal');
        const grid = document.getElementById('wishlist-display-grid');
        grid.innerHTML = wishlist.length > 0 ? '' : '<p style="text-align:center; opacity:0.5; grid-column: 1/-1;">Your shortlist is empty.</p>';

        wishlist.forEach(item => {
            const div = document.createElement('div');
            div.className = 'wish-item';
            div.innerHTML = `
                        <img src="${item.url}" alt="${item.alt}">
                    `;
            grid.appendChild(div);
        });

        modal.classList.add('visible');
    };

    window.closeWishlist = () => {
        document.getElementById('wishlist-modal').classList.remove('visible');
    };

    updateWishlistUI();
});

// Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 800);
    });
}
// Auto-update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Feature 2: Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Feature 10: Testimonial Carousel
function initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    if (cards.length === 0) return;

    let currentIndex = 0;

    function showTestimonial(index) {
        cards.forEach((card, i) => {
            card.classList.remove('active', 'prev');
            if (i === index) {
                card.classList.add('active');
            } else if (i < index || (index === 0 && i === cards.length - 1)) {
                card.classList.add('prev');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Auto-rotate every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        showTestimonial(currentIndex);
    }, 5000);

    // Click on dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIndex = i;
            showTestimonial(currentIndex);
        });
    });
}

// Initialize testimonials
initTestimonials();


// Feature 13: Back-to-Top Button with Progress Ring
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    const progressRing = btn?.querySelector('.progress-ring');
    if (!btn || !progressRing) return;

    const circumference = 2 * Math.PI * 22; // r=22
    progressRing.style.strokeDasharray = circumference;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;

        // Show/hide button
        if (scrollTop > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }

        // Update progress ring
        const offset = circumference - (scrollPercent * circumference);
        progressRing.style.strokeDashoffset = offset;
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
initBackToTop();

// Feature 14: Cookie Consent Logic
function initCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    const btn = document.getElementById('acceptCookies');
    if (!banner || localStorage.getItem('cookiesAccepted')) return;

    // Show after 3s
    setTimeout(() => {
        banner.classList.add('visible');
    }, 3000);

    btn.addEventListener('click', () => {
        banner.classList.remove('visible');
        localStorage.setItem('cookiesAccepted', 'true');
    });
}
initCookieBanner();

// Feature 16: Dynamic Social Proof

// 1. ASSETS - Top 6 Showcase (More in Design Concepts)
// 1. ASSETS - Top 6 Showcase (More in Design Concepts)
const assetUrls = [
    "images/img_4.jpg",
    "images/img_1.jpg",
    "images/img_2.jpg",
    "images/img_3.jpg",
    "images/img_5.jpg",
    "images/img_6.jpg"
];

// SEO-Optimized Alt Tags for Brunei Market
const seoAltTags = [
    "Custom kitchen cabinets Brunei - Scandinavian minimalist design by Caramella",
    "Luxury walk-in wardrobe Brunei - Premium closet system with LED lighting",
    "Modern TV console unit Brunei - Bespoke entertainment center installation",
    "Contemporary bathroom vanity Brunei - Moisture-resistant cabinet design",
    "High-end kitchen island Brunei - CNC precision countertop joinery",
    "Tropical climate wardrobe Brunei - Humidity-resistant storage solutions",
    "Premium kitchen renovation Brunei - Full cabinet fit-out by Caramella",
    "Custom built-in cabinetry Brunei - Architectural joinery specialist",
    "Luxury interior design Brunei - Bespoke furniture manufacturing",
    "Modern kitchen design BSB - Best kitchen contractor Brunei Muara",
    "Premium wardrobe installation Brunei - Master bedroom storage solutions",
    "Custom carpentry work Brunei - Precision CNC wood cutting services",
    "Kitchen cabinet supplier Brunei - Quality melamine and plywood materials",
    "Interior fit-out contractor Brunei - Residential renovation specialist",
    "Bespoke joinery Brunei Darussalam - Award-winning cabinet maker",
    "Luxury home renovation Brunei - High-end interior design solutions",
    "Custom wardrobe design Brunei - Walk-in closet specialist BSB",
    "Modern minimalist kitchen Brunei - Contemporary cabinet installation",
    "Premium countertop installation Brunei - Solid surface and quartz options",
    "Best interior designer Brunei - Caramella architectural joinery",
    "Kitchen renovation contractor BSB - Quality craftsmanship guaranteed",
    "Luxury bathroom cabinets Brunei - Waterproof vanity solutions",
    "Custom entertainment unit Brunei - Built-in TV wall installation",
    "Premium bedroom furniture Brunei - Bespoke headboard and wardrobes",
    "Modern office fit-out Brunei - Commercial interior contractor",
    "High-quality kitchen cabinets Brunei - European hardware supplier",
    "Custom shoe rack Brunei - Entryway storage cabinet design",
    "Luxury dressing room Brunei - Premium closet organization system",
    "Contemporary dining furniture Brunei - Custom sideboard installation",
    "Best renovation contractor Brunei - Trusted since 2015"
];

function initGallery() {
    const grid = document.getElementById('gallery-grid');
    const shuffled = [...assetUrls].sort(() => 0.5 - Math.random());
    let currentIndex = 0;
    const batchSize = 6;

    function loadBatch() {
        const endIndex = Math.min(currentIndex + batchSize, shuffled.length);

        for (let i = currentIndex; i < endIndex; i++) {
            const url = shuffled[i];
            const altText = seoAltTags[i % seoAltTags.length];
            const el = document.createElement('div');
            el.className = 'gallery-item reveal-stone';

            // Assign category for Feature 33
            const cats = ['kitchen', 'wardrobe'];
            el.dataset.category = cats[i % cats.length];

            // Feature 15: Lazy Loading Blur-up & Feature 12: Wishlist
            el.innerHTML = `
                        <img src="${url}" loading="lazy" alt="${altText}" class="blur-load" onload="this.classList.add('loaded')">
                    `;
            el.onclick = () => {
                const lb = document.getElementById('lightbox');
                document.getElementById('lightbox-img').src = url;
                document.getElementById('lightbox-img').alt = altText;
                lb.classList.add('active');
            };



            grid.appendChild(el);
        }

        currentIndex = endIndex;

        // Remove Load More button if all images loaded
        if (currentIndex >= shuffled.length) {
            const loadMoreBtn = document.getElementById('load-more-btn');
            if (loadMoreBtn) loadMoreBtn.remove();
        }
    }

    // Load first batch
    loadBatch();

    // Create Load More button
    if (shuffled.length > batchSize) {
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.id = 'load-more-btn';
        loadMoreBtn.className = 'btn-luxury';
        loadMoreBtn.textContent = 'Load More';
        loadMoreBtn.style.margin = '3rem auto';
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.style.position = 'relative';
        loadMoreBtn.style.zIndex = '10';
        loadMoreBtn.onclick = loadBatch;
        grid.parentElement.appendChild(loadMoreBtn);
    }

    // Close Lightbox
    document.querySelector('.close-lightbox').onclick = () => document.getElementById('lightbox').classList.remove('active');
    document.getElementById('lightbox').onclick = (e) => {
        if (e.target === document.getElementById('lightbox')) document.getElementById('lightbox').classList.remove('active');
    };


}

function initHero() {
    const container = document.querySelector('.hero-bg-slider');
    // User-selected premium showcase images
    const slides = [
        "https://static.wixstatic.com/media/0bdd38_0780da52ffb64b20a389602f32b546a8~mv2.jpg",
        "https://static.wixstatic.com/media/0bdd38_adee565ffe4c4239811a64c1e88ba479~mv2.jpg",
        "https://static.wixstatic.com/media/0bdd38_3b842e104b9a4ac8bdd9f6ec840e8f1b~mv2.jpg",
        "https://static.wixstatic.com/media/0bdd38_6320f0df73fc4ced9aa1f0eb0c816244~mv2.jpg"
    ];

    const img = new Image();
    img.src = slides[0];
    img.onload = () => {
        slides.forEach((url, i) => {
            const d = document.createElement('div');
            d.className = `hero-slide ${i === 0 ? 'active' : ''}`;
            d.style.backgroundImage = `url('${url}')`;
            container.appendChild(d);
        });

        let cur = 0;
        setInterval(() => {
            const els = document.querySelectorAll('.hero-slide');
            els[cur].classList.remove('active');
            cur = (cur + 1) % els.length;
            els[cur].classList.add('active');
        }, 8000); // Calm: 6000ms Ã¢â€ â€™ 8000ms for contemplative viewing
    };
}

function initRefraction() {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const cards = document.querySelectorAll('.service-card, .hero-badge');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--x', `${x}%`);
            card.style.setProperty('--y', `${y}%`);
        });
    });
}

function initAnimations() {
    initRefraction(); // Activate physics
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-stone').forEach(el => obs.observe(el));
}

function initParticles() {
    return; // disabled for simplicity
    const container = document.getElementById('particles');
    if (!container || window.innerWidth < 768) return; // Skip on mobile

    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

function initAwardCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    if (!cursor || window.innerWidth < 968) return; // Skip on mobile/tablet

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, button, .gallery-item, .service-box');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

function initNavbar() {
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });
}

function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.textContent = navLinks.classList.contains('active') ? '\u2715' : '\u2630';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.textContent = '\u2630';
        });
    });
}

// Animated Counters for Trust Numbers
function initCounterAnimation() {
    const trustNumbers = document.querySelectorAll('.trust-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    trustNumbers.forEach(num => observer.observe(num));
}

function animateCounter(el) {
    const text = el.textContent;
    const hasPlus = text.includes('+');
    const numMatch = text.match(/\d+/);
    if (!numMatch) return; // Non-numeric like "CNC"

    const target = parseInt(numMatch[0]);
    let current = 0;
    const duration = 4000; // Calm: 2000ms Ã¢â€ â€™ 4000ms for gentle counting
    const step = target / (duration / 16);

    function update() {
        current += step;
        if (current >= target) {
            el.textContent = target + (hasPlus ? '+' : '');
        } else {
            el.textContent = Math.round(current) + (hasPlus ? '+' : '');
            requestAnimationFrame(update);
        }
    }
    update();
}

// Feature 21: Advanced WhatsApp Form Logic
function initContactForm() {
    const form = document.getElementById('inquiryForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Gather Data
        const name = document.getElementById('entryName').value.trim();
        const phone = document.getElementById('entryPhone').value.trim();
        const address = document.getElementById('entryAddress').value.trim();
        const date = document.getElementById('entryDate').value;
        const budget = document.getElementById('entryBudget').value.trim();
        const remarks = document.getElementById('entryRemarks').value.trim();

        // Multi-select helpers
        const getChecked = (cls) => Array.from(document.querySelectorAll(`.${cls}:checked`)).map(c => c.value).join(', ');

        const status = getChecked('status-check');
        const materials = getChecked('mat-check');
        const countertops = getChecked('top-check');
        const doors = getChecked('door-check');

        const hob = document.getElementById('appHob').value;
        const hood = document.getElementById('appHood').value;
        const oven = document.getElementById('appOven').value;

        // Build Message
        let msg = `*NEW ENTRY FORM QUERY*\n\n`;
        msg += `*CLIENT INFO*\nName: ${name}\nTel: ${phone}\nAdd: ${address}\nAppt: ${date}\n\n`;
        msg += `*PROJECT INFO*\nStatus: ${status}\nBudget: ${budget}\n\n`;
        msg += `*KITCHEN SPEC*\nMat: ${materials}\nTop: ${countertops}\nHob: ${hob} | Hood: ${hood} | Oven: ${oven}\n\n`;
        msg += `*WARDROBE SPEC*\nDoors: ${doors}\n\n`;
        msg += `*REMARKS*\n${remarks}`;

        // Open WhatsApp
        const url = `https://wa.me/6737187185?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    });
}

// Feature 34: Price Calculator Logic
function initCalculator() {
    const modal = document.getElementById('calcModal');
    if (!modal) return;

    // Buttons
    const types = document.querySelectorAll('.calc-type');
    const lengthInput = document.getElementById('calcLength');
    const counterSelect = document.getElementById('calcCounter');
    const priceDisplay = document.getElementById('calcPrice');
    const closeBtn = document.querySelector('.close-calc');
    const bookBtn = document.getElementById('calcBookBtn');
    const counterSection = document.getElementById('countertopSection');

    // Open/Close logic
    window.openCalc = () => {
        modal.classList.add('active');
        // Center modal content
        const container = modal.querySelector('.calc-container');
        container.style.marginTop = '10vh';
        calculate();
    };

    closeBtn.onclick = () => modal.classList.remove('active');

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    if (bookBtn) {
        bookBtn.onclick = () => {
            modal.classList.remove('active');
            const contactSection = document.getElementById('contact');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });

            const type = document.querySelector('.calc-type.active').innerText;
            const len = lengthInput.value;
            const est = priceDisplay.innerText;
            const msg = document.getElementById('formMessage');
            if (msg) msg.value = `I'm interested in a ${type} (approx ${len}ft). Estimate was ${est}.`;
        };
    }

    types.forEach(btn => {
        btn.addEventListener('click', () => {
            types.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            calculate();
        });
    });

    if (lengthInput) lengthInput.addEventListener('input', calculate);
}
initCalculator();

function calculate() {
    const typeBtn = document.querySelector('.calc-type.active');
    const lengthInput = document.getElementById('calcLength');
    const materialSelect = document.getElementById('calcMaterial');
    const hardwareSelect = document.getElementById('calcHardware');
    const counterSelect = document.getElementById('calcCounter');
    const priceDisplay = document.getElementById('calcPrice');
    const counterSection = document.getElementById('countertopSection');

    if (!typeBtn || !lengthInput) return;

    const type = typeBtn.dataset.value;
    const len = parseFloat(lengthInput.value) || 0;
    const matMultiplier = parseFloat(materialSelect.value) || 1.0;
    const hardwareRate = parseFloat(hardwareSelect.value) || 150;
    const counterRate = parseFloat(counterSelect.value) || 0;

    // Base Structural Yield per Linear Foot
    let baseRate = (type === 'kitchen') ? 220 : 180;

    if (type === 'wardrobe') {
        if (counterSection) counterSection.style.display = 'none';
    } else {
        if (counterSection) counterSection.style.display = 'block';
    }

    const total = (baseRate * len * matMultiplier) + (hardwareRate * len) + (counterRate * len);
    const min = Math.round(total * 0.95);
    const max = Math.round(total * 1.05);

    if (priceDisplay) {
        priceDisplay.innerText = `$${min.toLocaleString()} - $${max.toLocaleString()}`;
        if (navigator.vibrate) navigator.vibrate(5);
    }
}

// Feature 38: Animated Stats (Intersection Observer)
function initStats() {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            if (end === 100) obj.innerHTML += '%';
            if (end === 500) obj.innerHTML += '+';
            if (end === 10) obj.innerHTML += '+';
        }
    };
    window.requestAnimationFrame(step);
}
// initStats(); // removed for polish

// ===========================================
// SAPPHIRE ENGINE V5: LIQUID PHYSICS 
// ===========================================
function initMagneticButtons() {
    // STOP PHYSICS ON MOBILE (SAVES BATTERY)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const buttons = document.querySelectorAll('.btn-luxury');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Magnetic Pull Strength
            const strength = 0.4;

            btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            btn.style.transition = 'transform 0.1s cubic-bezier(0.165, 0.84, 0.44, 1)'; // Instant response
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)'; // Elastic snap back
        });
    });
}

// ===========================================
// SAPPHIRE ENGINE V5: UNREAL-LITE 3D TILT 
// ===========================================
function init3DTilt() {
    const hero = document.getElementById('hero-section');
    const content = document.querySelector('.hero-content-3d');

    if (!hero || !content || window.innerWidth < 1200 || 'ontouchstart' in window) return; // disable on touch/mobile

    hero.addEventListener('mousemove', (e) => {
        const { offsetWidth: width, offsetHeight: height } = hero;
        const { clientX: x, clientY: y } = e;

        // Calculate percentage from center (0 to 1)
        const xPos = (x / width - 0.5);
        const yPos = (y / height - 0.5);

        // Tilt intensity
        const tiltX = yPos * 10; // degrees
        const tiltY = xPos * -10; // degrees

        content.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px)`;
    });

    hero.addEventListener('mouseleave', () => {
        content.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    });
}
