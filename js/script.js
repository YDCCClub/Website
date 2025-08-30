// Function to check for WebP support
function checkWebPSupport(callback) {
    const webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

// Add 'webp' or 'no-webp' class to html element
checkWebPSupport(function(supported) {
    if (supported) {
        document.documentElement.classList.add('webp');
    } else {
        document.documentElement.classList.add('no-webp');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.querySelector('.navbar');
    const mainEl = document.querySelector('main');
    const banner = document.querySelector('.notification-banner');

    // Ensure content is never hidden behind the fixed navbar (and banner if visible)
    function updateOffsets() {
        const navH = navbar ? navbar.offsetHeight : 0;
        let bannerH = 0;
        if (banner) {
            const bannerStyles = window.getComputedStyle(banner);
            const isVisible = bannerStyles.display !== 'none' && bannerStyles.visibility !== 'hidden';
            bannerH = isVisible ? banner.offsetHeight : 0;
        }
        const total = navH + bannerH;
        if (mainEl) {
            mainEl.style.paddingTop = total + 'px';
        }
    }

    // Toggle mobile nav
    hamburger.addEventListener('click', () => {
        const isExpanded = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu on link click
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        // Recompute offsets when navbar height may change due to scrolled class
        updateOffsets();
    });

    // Recalculate on load and when viewport size changes
    updateOffsets();
    window.addEventListener('resize', updateOffsets);

    // Observe banner visibility changes (if banner is toggled via JS)
    if (banner) {
        const mo = new MutationObserver(updateOffsets);
        mo.observe(banner, { attributes: true, attributeFilter: ['style', 'class'] });
        window.addEventListener('load', updateOffsets);
    }

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.anim-slide-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close all other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle the clicked item
            if (isExpanded) {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = null;
            } else {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });



    // Dynamically load Google Tag Manager script after a delay
    setTimeout(function() {
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-1P9GBCRGLV';
        document.head.appendChild(gtagScript);

        gtagScript.onload = function() {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1P9GBCRGLV');
        };
    }, 3000); // 3-second delay
});
