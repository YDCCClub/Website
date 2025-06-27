document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.querySelector('.navbar');

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
    });

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

    // Notification Banner Logic
    const banner = document.getElementById('notification-banner');
    const closeBtn = document.getElementById('close-banner-btn');
    const mainContent = document.querySelector('main');
    const initialMainPaddingTop = 85; // From CSS

    function adjustLayoutForBanner() {
        if (!banner) return;
        const bannerHeight = banner.offsetHeight;
        navbar.style.top = `${bannerHeight}px`;
        if (mainContent) {
            mainContent.style.paddingTop = `${initialMainPaddingTop + bannerHeight}px`;
        }
    }

    function resetLayoutAfterBanner() {
        navbar.style.top = '0px';
        if (mainContent) {
            mainContent.style.paddingTop = `${initialMainPaddingTop}px`;
        }
    }

    if (banner && closeBtn) {
        const bannerText = banner.querySelector('p');

        // Show banner if not closed and has text
        if (sessionStorage.getItem('bannerClosed') !== 'true' && bannerText && bannerText.textContent.trim() !== '') {
            banner.style.display = 'block';
            // Use a short timeout to ensure banner has rendered and has a height
            setTimeout(adjustLayoutForBanner, 50);
        }

        // Handle close button click
        closeBtn.addEventListener('click', () => {
            banner.style.display = 'none';
            sessionStorage.setItem('bannerClosed', 'true');
            resetLayoutAfterBanner();
        });

        // Adjust layout on resize if banner is visible
        window.addEventListener('resize', () => {
            if (banner.style.display === 'block') {
                adjustLayoutForBanner();
            }
        });
    }
});
