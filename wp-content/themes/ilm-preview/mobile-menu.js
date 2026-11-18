/**
 * Mobile Menu Handler
 * Responsive hamburger menu for small devices
 * Features: Toggle menu, submenu expand/collapse, smooth transitions
 */

(function() {
    'use strict';

    const menuToggle = document.querySelector('.header__toggle');
    const mobileMenu = document.querySelector('.mobileMenu');
    const closeButtons = document.querySelectorAll('.item-mobileMenu__toggle');
    
    if (!menuToggle || !mobileMenu) {
        return;
    }

    // ═══════════════════════════════════════════════════════════════
    // MAIN MENU TOGGLE
    // ═══════════════════════════════════════════════════════════════

    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ═══════════════════════════════════════════════════════════════
    // SUBMENU TOGGLE
    // ═══════════════════════════════════════════════════════════════

    closeButtons.forEach(button => {
        const listItem = button.closest('.item-mobileMenu');
        if (!listItem) return;

        const sublist = listItem.querySelector('.mobileMenu__sublist');
        if (!sublist) return;

        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle current submenu
            const isActive = sublist.classList.contains('active');
            sublist.classList.toggle('active');
            button.classList.toggle('active');

            // Smooth height animation
            if (!isActive) {
                sublist.style.maxHeight = sublist.scrollHeight + 'px';
            } else {
                sublist.style.maxHeight = '0';
            }
        });

        // Add smooth height transition
        sublist.style.transition = 'max-height 300ms ease-out';
        sublist.style.overflow = 'hidden';
        sublist.style.maxHeight = '0';
    });

    // ═══════════════════════════════════════════════════════════════
    // CLOSE MENU ON LINK CLICK
    // ═══════════════════════════════════════════════════════════════

    const mobileMenuLinks = mobileMenu.querySelectorAll('a:not([href="#"])');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Don't close if it's just toggling a submenu
            if (!this.closest('.item-mobileMenu__toggle')) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════
    // PERFORMANCE: Use Intersection Observer for lazy menu rendering
    // ═══════════════════════════════════════════════════════════════

    if ('IntersectionObserver' in window) {
        const images = mobileMenu.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.loading = 'lazy';
                    observer.unobserve(entry.target);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ═══════════════════════════════════════════════════════════════
    // ACCESSIBILITY: Handle touch devices
    // ═══════════════════════════════════════════════════════════════

    if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch-device');
    }
})();
