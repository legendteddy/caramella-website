document.addEventListener('DOMContentLoaded', () => {
            initGallery();
            initLightbox();
            initHeroForce(); // Renamed from initTiltEffect (Hero)
            initMagneticButtons();
        });

        // ===========================================
        // Subtle button magnetism
        // ===========================================
        function initMagneticButtons() {
            const buttons = document.querySelectorAll('.btn-primary');

            buttons.forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    const strength = 0.4;

                    btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
                    btn.style.transition = 'transform 0.1s cubic-bezier(0.165, 0.84, 0.44, 1)';
                });

                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = 'translate(0, 0)';
                    btn.style.transition = 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
                });
            });
        }

        // ===========================================
        // Desktop-only hero tilt
        // ===========================================
        function initHeroForce() {
            const hero = document.getElementById('hero-section');
            const content = document.querySelector('.hero-content-3d');

            if (!hero || !content || window.innerWidth < 968) return;

            hero.addEventListener('mousemove', (e) => {
                const { offsetWidth: width, offsetHeight: height } = hero;
                const { clientX: x, clientY: y } = e;

                const xPos = (x / width - 0.5);
                const yPos = (y / height - 0.5);

                const tiltX = yPos * 10;
                const tiltY = xPos * -10;

                content.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px)`;
            });

            hero.addEventListener('mouseleave', () => {
                content.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
            });
        }

        // Concept images - curated selection with SEO alt tags for Brunei
        // Concept images - curated selection with SEO alt tags for Brunei
        const conceptImages = [
            {
                url: "images/img_1.webp",
                title: "Modern Minimalism",
                category: "kitchen",
                alt: "Modern minimalist kitchen concept for homes in Brunei",
                large: true
            },
            {
                url: "images/img_2.webp",
                title: "Warm Textures",
                category: "wardrobe",
                alt: "Walk-in wardrobe concept with warm wood textures"
            },
            {
                url: "images/img_3.webp",
                title: "Industrial Elegance",
                category: "kitchen",
                alt: "Industrial-inspired kitchen concept for modern homes"
            },
            {
                url: "images/img_4.webp",
                title: "Timeless Luxury",
                category: "kitchen",
                alt: "Timeless kitchen concept with premium material contrast",
                large: true
            },
            {
                url: "images/img_5.webp",
                title: "Scandinavian Purity",
                category: "kitchen",
                alt: "Scandinavian-style kitchen concept with minimalist surfaces"
            },
            {
                url: "images/img_6.webp",
                title: "Dark Drama",
                category: "other",
                alt: "Dark dramatic interior design Brunei - Premium moody aesthetic joinery"
            },
            {
                url: "images/img_7.webp",
                title: "Floating Forms",
                category: "other",
                alt: "Floating cabinet design Brunei - Innovative handleless modern storage"
            },
            {
                url: "images/img_8.webp",
                title: "Organic Flow",
                category: "kitchen",
                alt: "Organic kitchen concept with curved flow and soft transitions",
                large: true
            },
            {
                url: "images/img_9.webp",
                title: "Coastal Serenity",
                category: "other",
                alt: "Coastal interior design Brunei - Serene tropical-inspired joinery"
            },
            {
                url: "images/img_10.webp",
                title: "Contemporary Kitchen",
                alt: "Contemporary kitchen design Brunei - Modern cabinet layout BSB"
            },
            {
                url: "images/img_11.webp",
                title: "Luxury Living",
                alt: "Luxury living room cabinet Brunei - Built-in entertainment unit",
                large: true
            },
            {
                url: "images/img_12.webp",
                title: "Modern Wardrobe",
                alt: "Modern wardrobe design Brunei - Sleek storage solutions"
            },
            {
                url: "images/img_13.webp",
                title: "Premium Finishes",
                alt: "Premium cabinet finishes Brunei - High-end surface materials"
            },
            {
                url: "images/img_14.webp",
                title: "Compact Kitchen",
                alt: "Compact kitchen design Brunei - Space-efficient cabinet solutions"
            },
            {
                url: "images/img_15.webp",
                title: "Walk-In Closet",
                alt: "Walk-in closet design Brunei - Master bedroom wardrobe installation",
                large: true
            },
            {
                url: "images/img_16.webp",
                title: "Kitchen Island",
                alt: "Kitchen island design Brunei - Central cooking workspace"
            },
            {
                url: "images/img_17.webp",
                title: "Bathroom Vanity",
                alt: "Bathroom vanity Brunei - Moisture-resistant cabinet design"
            },
            {
                url: "images/img_18.webp",
                title: "TV Console",
                alt: "TV console unit Brunei - Entertainment center cabinet"
            },
            {
                url: "images/img_19.webp",
                title: "Tropical Kitchen",
                alt: "Tropical kitchen design Brunei - Climate-adapted cabinet solutions",
                large: true
            },
            {
                url: "images/img_20.webp",
                title: "Minimalist Storage",
                alt: "Minimalist storage design Brunei - Clean line cabinet concepts"
            },
            {
                url: "images/img_21.webp",
                title: "Executive Office",
                alt: "Executive office cabinet Brunei - Professional workspace design"
            }
        ];

        function initGallery() {
            const grid = document.getElementById('gallery-grid');
            grid.innerHTML = '';

            conceptImages.forEach((item, index) => {
                const el = document.createElement('div');
                el.className = `gallery-item${item.large ? ' large' : ''} tilt`;
                const webpUrl = item.url.replace(/\.jpg$/i, '.webp');
                el.innerHTML = `
                <picture>
                    <source type="image/webp" srcset="${webpUrl}">
                    <img src="${item.url}" loading="lazy" decoding="async" width="640" height="480" alt="${item.alt || item.title}">
                </picture>
            `;
                el.dataset.src = item.url;
                grid.appendChild(el);

                setTimeout(() => el.classList.add('visible'), 50 + (index * 80));
            });

            // Re-init lightbox and tilt for new items
            setTimeout(() => {
                initLightbox();
                initTiltEffect();
            }, 100);
        }

        // 3D Tilt Effect
        function initTiltEffect() {
            if (window.innerWidth < 968) return; // Skip on mobile

            const items = document.querySelectorAll('.gallery-item.tilt');
            items.forEach(item => {
                item.addEventListener('mousemove', (e) => {
                    const rect = item.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    item.style.setProperty('--rotateX', `${-rotateX}deg`);
                    item.style.setProperty('--rotateY', `${rotateY}deg`);
                });

                item.addEventListener('mouseleave', () => {
                    item.style.setProperty('--rotateX', '0deg');
                    item.style.setProperty('--rotateY', '0deg');
                });
            });
        }

        function initLightbox() {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const closeBtn = document.querySelector('.close-lightbox');
            const galleryItems = document.querySelectorAll('.gallery-item');
            let currentIndex = 0;

            // Build image array (preserve accessible alt text from thumbnails)
            const images = Array.from(galleryItems).map(item => {
                const img = item.querySelector('img');
                return {
                    src: item.dataset.src,
                    alt: img?.getAttribute('alt') || ''
                };
            });

            function showImage(index) {
                if (index < 0) index = images.length - 1;
                if (index >= images.length) index = 0;
                currentIndex = index;
                lightboxImg.src = images[currentIndex].src;
                lightboxImg.alt = images[currentIndex].alt;
            }

            galleryItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    currentIndex = index;
                    showImage(currentIndex);
                    lightbox.classList.add('active');
                });
            });

            closeBtn.addEventListener('click', () => {
                lightbox.classList.remove('active');
            });

            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                }
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!lightbox.classList.contains('active')) return;
                if (e.key === 'Escape') lightbox.classList.remove('active');
                if (e.key === 'ArrowRight') showImage(currentIndex + 1);
                if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
            });

            // Feature 12: Touch Swipe Gestures
            let touchStartX = 0;
            let touchEndX = 0;

            lightbox.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            lightbox.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });

            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Swipe left - next image
                        showImage(currentIndex + 1);
                    } else {
                        // Swipe right - previous image
                        showImage(currentIndex - 1);
                    }
                }
            }
        }
