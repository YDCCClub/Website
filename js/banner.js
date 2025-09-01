document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('notification-banner');
    const closeBtn = document.getElementById('close-banner-btn');
    const body = document.body;

    // If banner doesn't exist or was closed this session, do nothing.
    if (!banner || sessionStorage.getItem('bannerClosed') === 'true') {
        // Ensure the class is removed if the banner is not shown on page load
        if (body.classList.contains('banner-visible')) {
            body.classList.remove('banner-visible');
        }
        return;
    }

    // Show the banner and adjust layout.
    banner.style.display = 'flex';
    body.classList.add('banner-visible');

    // Handle the close button click.
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            banner.style.display = 'none';
            body.classList.remove('banner-visible');
            sessionStorage.setItem('bannerClosed', 'true');
        });
    }
});
