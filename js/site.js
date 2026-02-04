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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSharedNav);
    } else {
        initSharedNav();
    }
})();
