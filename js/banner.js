document.addEventListener('DOMContentLoaded', function() {
    // Banner configuration
    const bannerMessage = '<b>Under Construction:</b> Our website is currently under construction. Stay tuned for updates!';

    // Check if the banner was already closed in this session
    if (sessionStorage.getItem('bannerClosed') === 'true') {
        return;
    }

    // --- Create Banner Element ---
    const banner = document.createElement('div');
    banner.id = 'notification-banner';
    banner.className = 'notification-banner';

    const paragraph = document.createElement('p');
    paragraph.innerHTML = bannerMessage;
    banner.appendChild(paragraph);

    const closeBtn = document.createElement('button');
    closeBtn.id = 'close-banner-btn';
    closeBtn.className = 'close-btn';
    closeBtn.setAttribute('aria-label', 'Close banner');
    closeBtn.innerHTML = '&times;';
    banner.appendChild(closeBtn);

    // --- Apply Styles --- 
    Object.assign(banner.style, {
        backgroundColor: '#ffcc00', // Original yellow
        color: '#000',
        padding: '10px 20px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        fontSize: '1em' // Restoring original font size
    });

    Object.assign(paragraph.style, {
        margin: '0',
        paddingRight: '20px' // Space for the close button
    });

    Object.assign(closeBtn.style, {
        background: 'transparent',
        border: 'none',
        color: '#000',
        fontSize: '2rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        lineHeight: '1'
    });

    // --- Add banner to the page ---
    document.body.insertBefore(banner, document.body.firstChild);

    // --- Logic to prevent header overlap ---
    const navbar = document.querySelector('.navbar');
    const mainContent = document.querySelector('main');
    const initialMainPaddingTop = 85; // From original CSS

    function adjustLayoutForBanner() {
        if (!banner || !navbar) return;
        const bannerHeight = banner.offsetHeight;
        navbar.style.top = `${bannerHeight}px`;
        if (mainContent) {
            mainContent.style.paddingTop = `${initialMainPaddingTop + bannerHeight}px`;
        }
    }

    function resetLayoutAfterBanner() {
        if (!navbar) return;
        navbar.style.top = '0px';
        if (mainContent) {
            mainContent.style.paddingTop = `${initialMainPaddingTop}px`;
        }
    }

    // Adjust layout once banner is visible
    // Use a short timeout to ensure banner has rendered and has a height
    setTimeout(adjustLayoutForBanner, 50);

    // Handle close button click
    closeBtn.addEventListener('click', () => {
        banner.style.display = 'none';
        sessionStorage.setItem('bannerClosed', 'true');
        resetLayoutAfterBanner();
    });

    // Adjust layout on resize if banner is visible
    window.addEventListener('resize', () => {
        if (banner.style.display !== 'none') {
            adjustLayoutForBanner();
        }
    });
});
