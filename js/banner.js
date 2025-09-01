document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('notification-banner');
    const closeBtn = document.getElementById('close-banner-btn');

    // If banner doesn't exist on the page, do nothing.
    if (!banner) {
        return;
    }

    // If banner was closed this session, hide it and stop.
    if (sessionStorage.getItem('bannerClosed') === 'true') {
        banner.style.display = 'none';
        return;
    }

    // Otherwise, ensure the banner is visible.
    banner.style.display = 'flex';

    // Handle the close button click.
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            banner.style.display = 'none';
            sessionStorage.setItem('bannerClosed', 'true');
        });
    }
});
