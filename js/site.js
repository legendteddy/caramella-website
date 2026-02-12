(function () {
    function initSharedNav() {
        var nav = document.querySelector('.navbar');
        if (!nav) return;

        var menuToggle = nav.querySelector('.menu-toggle');
        var navLinks = nav.querySelector('.nav-links');
        var mobileMedia = window.matchMedia('(max-width: 968px)');

        if (nav) {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 50) nav.classList.add('scrolled');
                else nav.classList.remove('scrolled');
            });
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

    function initScrollGradient() {
        var root = document.documentElement;
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        function updateScrollVars() {
            var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            var progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
            var yShift = Math.round(progress * 140);
            var xShift = Math.round(progress * 80);
            root.style.setProperty('--scroll-y', yShift + 'px');
            root.style.setProperty('--scroll-x', xShift + 'px');
        }

        if (reduceMotion.matches) {
            root.style.setProperty('--scroll-y', '0px');
            root.style.setProperty('--scroll-x', '0px');
            return;
        }

        updateScrollVars();
        window.addEventListener('scroll', updateScrollVars, { passive: true });
        window.addEventListener('resize', updateScrollVars);
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

        // Initial state
        sync();

        // Observe class changes (pages toggle lightbox via .active).
        if (window.MutationObserver) {
            var mo = new MutationObserver(sync);
            mo.observe(lightbox, { attributes: true, attributeFilter: ['class'] });
        }

        // Fallback: close should always unlock.
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') sync();
        });

        // Safety: when navigating away/back, ensure we never stay locked.
        window.addEventListener('pageshow', sync);
        window.addEventListener('pagehide', unlock);
    }

    function initFloatingWhatsApp() {
        if (document.body && document.body.dataset && document.body.dataset.noWhatsapp === '1') return;
        if (document.querySelector('.whatsapp-float')) return;

        var a = document.createElement('a');
        a.href = 'https://wa.me/6737187185';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'whatsapp-float';
        a.setAttribute('aria-label', 'Chat on WhatsApp');
        a.setAttribute('data-analytics', 'whatsapp_float');

        // Inline SVG so pages don't need per-file assets.
        a.innerHTML = '' +
            '<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\">' +
            '<path d=\"M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z\" />' +
            '</svg>';

        document.body.appendChild(a);
    }

    function initMobileCtaDock() {
        if (document.body && document.body.dataset && document.body.dataset.noCtaDock === '1') return;
        if (document.querySelector('.cta-dock')) return;

        var dock = document.createElement('div');
        dock.className = 'cta-dock';
        dock.innerHTML = '' +
            '<div class=\"cta-row\">' +
            '<a class=\"btn-primary\" href=\"contact-us.html\" data-analytics=\"cta_quote\">Get a Quote</a>' +
            '<a class=\"btn-secondary\" href=\"https://wa.me/6737187185\" target=\"_blank\" rel=\"noopener noreferrer\" data-analytics=\"cta_whatsapp\">WhatsApp</a>' +
            '</div>';
        document.body.appendChild(dock);
    }

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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initSharedNav();
            initScrollGradient();
            initLightboxScrollLock();
            initFloatingWhatsApp();
            // initMobileCtaDock(); — removed: too salesman-aggressive for a premium brand
            initAnalyticsHooks();
        });
    } else {
        initSharedNav();
        initScrollGradient();
        initLightboxScrollLock();
        initFloatingWhatsApp();
        // initMobileCtaDock(); — removed: too salesman-aggressive for a premium brand
        initAnalyticsHooks();
    }
})();
