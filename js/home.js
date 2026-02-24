// ===========================================
// Homepage interactions (extracted from index.html)
// ===========================================

// ===========================================
// Homepage interactions
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // Keep startup focused on visible homepage behavior only.
    initGallery();
    initAnimations();
    initCounterAnimation();
    initMagneticButtons();
    initScrollProgress();
    initTestimonials();

});

// Auto-update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Testimonial Carousel
function initTestimonials() {
    const cards = document.querySelectorAll('#testimonialCarousel .testimonial-card');
    const dots = document.querySelectorAll('#testimonialDots .testimonial-dot');
    if (!cards.length) return;
    let current = 0;

    function show(index) {
        cards.forEach((c, i) => {
            c.classList.remove('active', 'prev');
            if (i === current) c.classList.add('prev');
        });
        current = index;
        cards[current].classList.add('active');
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => show(parseInt(dot.dataset.index)));
    });

    setInterval(() => show((current + 1) % cards.length), 6000);
}

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

// Feature 16: Dynamic Social Proof

// Homepage gallery assets
const assetUrls = [
    "images/img_4.webp",
    "images/img_1.webp",
    "images/img_2.webp",
    "images/img_3.webp",
    "images/img_5.webp",
    "images/img_6.webp"
];

// Descriptive alt text for gallery images
const seoAltTags = [
    "Custom kitchen cabinets in Brunei with clean modern layout",
    "Walk-in wardrobe installation in Brunei with integrated storage",
    "Built-in TV console and wall joinery for a family living room",
    "Moisture-resistant bathroom vanity and storage cabinetry",
    "Kitchen island with durable top and precision joinery detailing",
    "Humidity-ready wardrobe system designed for Brunei homes",
    "Full kitchen renovation with coordinated cabinet layout",
    "Architectural built-in cabinetry tailored to room dimensions",
    "Custom interior joinery with balanced material palette",
    "Modern kitchen cabinet run for a compact urban home",
    "Master bedroom wardrobe with practical compartment planning",
    "Locally fabricated cabinetry with CNC-cut panels and quality hardware"
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
            const webpUrl = url.replace(/\.jpg$/i, '.webp');
            const altText = seoAltTags[i % seoAltTags.length];
            const el = document.createElement('div');
            el.className = 'gallery-item reveal-stone';

            // Assign category for Feature 33
            const cats = ['kitchen', 'wardrobe'];
            el.dataset.category = cats[i % cats.length];

            // Feature 15: Lazy Loading Blur-up (Wishlist removed per user request)
            el.innerHTML = `
                <picture>
                    <source type="image/webp" srcset="${webpUrl}">
                    <img src="${url}" loading="lazy" decoding="async" alt="${altText}" class="blur-load" onload="this.classList.add('loaded')" width="400" height="400" style="aspect-ratio: 1 / 1;">
                </picture>
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
    const duration = 4000; // Calm: 2000ms -> 4000ms for gentle counting
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
// removed for polish


// ===========================================
// Phase 2 Logic (Rescue)
// ===========================================

// ===========================================
// Subtle button magnetism
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
// Engineering Panel Toggle
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // F49: Loader (Fix Loop)
    const l = document.getElementById('loader');
    if (l) setTimeout(() => l.classList.add('hidden'), 1500);

});



function toggleSchematic() {
    const schematic = document.getElementById('schematic-layer');
    const panelB = document.getElementById('panel-b');

    if (schematic.style.opacity === '1') {
        schematic.style.opacity = '0';
        panelB.style.transform = 'translate(80px, -40px)';
    } else {
        schematic.style.opacity = '1';
        panelB.style.transform = 'translate(0, 0)'; // Snap shut
        if (navigator.vibrate) navigator.vibrate(10);
    }
}
