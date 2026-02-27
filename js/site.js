(function () {
    function initSharedNav() {
        var nav = document.querySelector('.navbar');
        if (!nav) return;

        var menuToggle = nav.querySelector('.menu-toggle');
        var navLinks = nav.querySelector('.nav-links');
        var mobileMedia = window.matchMedia('(max-width: 968px)');

        if (nav) {
            var navScrollRafPending = false;
            var navIsScrolled = nav.classList.contains('scrolled');

            function updateNavScrolledState() {
                var shouldBeScrolled = (window.scrollY || window.pageYOffset || 0) > 50;
                if (shouldBeScrolled !== navIsScrolled) {
                    nav.classList.toggle('scrolled', shouldBeScrolled);
                    navIsScrolled = shouldBeScrolled;
                }
                navScrollRafPending = false;
            }

            function scheduleNavScrolledUpdate() {
                if (navScrollRafPending) return;
                navScrollRafPending = true;
                window.requestAnimationFrame(updateNavScrolledState);
            }

            updateNavScrolledState();
            window.addEventListener('scroll', scheduleNavScrolledUpdate, { passive: true });
        }

        if (!menuToggle || !navLinks) return;
        if (menuToggle.dataset.navBound === '1') return;

        if (!menuToggle.querySelector('.menu-icon')) {
            menuToggle.textContent = '';
            var icon = document.createElement('span');
            icon.className = 'menu-icon';
            icon.setAttribute('aria-hidden', 'true');
            menuToggle.appendChild(icon);
        }

        function isMobile() {
            return mobileMedia.matches;
        }

        function closeMenu() {
            navLinks.classList.remove('active');
            navLinks.classList.remove('nav-active');
            menuToggle.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        }

        function openMenu() {
            if (!isMobile()) return;
            navLinks.classList.add('active');
            navLinks.classList.add('nav-active');
            menuToggle.classList.add('is-open');
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.classList.add('menu-open');
        }

        menuToggle.dataset.navBound = '1';
        menuToggle.setAttribute('aria-expanded', 'false');

        menuToggle.addEventListener('click', function (event) {
            event.stopPropagation();
            if (navLinks.classList.contains('active')) closeMenu();
            else openMenu();
        });

        navLinks.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', function () {
            if (navLinks.classList.contains('active')) closeMenu();
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) closeMenu();
        });

        window.addEventListener('resize', function () {
            if (!isMobile()) closeMenu();
        });

        if (mobileMedia.addEventListener) {
            mobileMedia.addEventListener('change', function (event) {
                if (!event.matches) closeMenu();
            });
        }
    }

    /* Toned down: coordinate shifting felt 'template-y' and distracting. 
       Keeping for potential future micro-use, but disabling broadcast. */
    function initScrollGradient() {
        return;
    }

    function initLightboxScrollLock() {
        var lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        var scrollY = 0;
        var locked = false;

        function lock() {
            if (locked) return;
            locked = true;
            scrollY = window.scrollY || window.pageYOffset || 0;
            document.body.classList.add('lb-open');
            document.body.style.top = '-' + scrollY + 'px';
        }

        function unlock() {
            if (!locked) return;
            locked = false;
            document.body.classList.remove('lb-open');
            document.body.style.top = '';
            window.scrollTo(0, scrollY);
        }

        function sync() {
            var isOpen = lightbox.classList.contains('active');
            if (isOpen) lock();
            else unlock();
        }

        function closeActiveLightboxes() {
            var overlays = document.querySelectorAll('.lightbox.active');
            if (!overlays.length) return false;
            overlays.forEach(function (overlay) {
                overlay.classList.remove('active');
            });
            return true;
        }

        // Initial state
        sync();

        // Observe class changes (pages toggle lightbox via .active).
        if (window.MutationObserver) {
            var mo = new MutationObserver(sync);
            mo.observe(lightbox, { attributes: true, attributeFilter: ['class'] });
        }

        // Escape should close open lightboxes and ensure scroll lock state stays in sync.
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            closeActiveLightboxes();
            sync();
        });

        // Safety: when navigating away/back, ensure we never stay locked.
        window.addEventListener('pageshow', sync);
        window.addEventListener('pagehide', unlock);
    }

    /* WhatsApp float removed during De-AI distraction pass */

    function initAnalyticsHooks() {
        function send(eventName) {
            try {
                if (typeof window.plausible === 'function') window.plausible(eventName);
            } catch (_) { }
            try {
                if (typeof window.gtag === 'function') window.gtag('event', eventName);
            } catch (_) { }
        }

        document.addEventListener('click', function (e) {
            var el = e.target && (e.target.closest ? e.target.closest('[data-analytics]') : null);
            if (!el) return;
            var name = el.getAttribute('data-analytics');
            if (name) send(name);
        }, { passive: true });

        // Netlify form submit hook (non-blocking).
        document.querySelectorAll('form[data-netlify=\"true\"]').forEach(function (form) {
            form.addEventListener('submit', function () {
                send('netlify_form_submit');
            }, { passive: true });
        });
    }

    /* ── Company age (auto-updates from founding date 2015-01-11) ── */
    function initCompanyAge() {
        var founded = new Date(2015, 0, 11); // January 11, 2015
        var now = new Date();
        var years = now.getFullYear() - founded.getFullYear();
        if (now.getMonth() < founded.getMonth() ||
            (now.getMonth() === founded.getMonth() && now.getDate() < founded.getDate())) {
            years--;
        }
        document.querySelectorAll('.company-years').forEach(function (el) {
            el.textContent = years + '+';
        });
        document.querySelectorAll('.company-years-text').forEach(function (el) {
            el.textContent = years + '+ years';
        });
    }

    /* ── Scroll-Reveal (IntersectionObserver) ── */
    function initScrollReveal() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (!('IntersectionObserver' in window)) return;

        // Collect revealable elements: sections, cards, grid children, headings
        var selectors = [
            'section > .container',
            '.service-card',
            '.card',
            '.faq-item',
            '.gallery-item',
            '.testimonial-card',
            'h2',
            '.stats-strip',
            '.image-break'
        ];

        var elements = document.querySelectorAll(selectors.join(','));
        elements.forEach(function (el) {
            // Skip if already has reveal or is inside a hero
            if (el.classList.contains('reveal') || el.closest('.hero')) return;
            el.classList.add('reveal');
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Added bit of "stagger" feel via CSS transition delays if needed,
                    // but primarily ensuring it doesn't fire too aggressively.
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05, // Fire earlier so it doesn't "pop" mid-view
            rootMargin: '0px 0px -20px 0px' // Less aggressive margin
        });

        document.querySelectorAll('.reveal').forEach(function (el) {
            observer.observe(el);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initSharedNav();
            initScrollGradient();
            initLightboxScrollLock();
            initAnalyticsHooks();
            initCompanyAge();
            initScrollReveal();
        });
    } else {
        initSharedNav();
        initScrollGradient();
        initLightboxScrollLock();
        initAnalyticsHooks();
        initCompanyAge();
        initScrollReveal();
    }
})();
