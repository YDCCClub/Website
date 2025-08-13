(function($) {
    $(document).ready(function() {
        const albumGrid = $('#gallery-container');
        const modal = $('#gallery-modal');
        const closeModal = $('.close');
        const imageCarousel = $('#image-carousel');

        if (typeof albums !== 'undefined' && albums.length > 0) {
            albums.forEach((album, index) => {
                const albumThumbnail = `
                    <div class="album-thumbnail" data-index="${index}">
                        <img src="${album.thumbnail}" alt="${album.name}">
                        <div class="album-name">${album.name}</div>
                    </div>
                `;
                albumGrid.append(albumThumbnail);
            });
        } else {
            albumGrid.append('<p>No albums have been configured yet. Edit <code>js/album-config.js</code> to add your albums.</p>');
        }

        // Reveal the gallery container now that it's populated to prevent FOUC
        albumGrid.show();

        albumGrid.on('click', '.album-thumbnail', function() {
            const albumIndex = $(this).data('index');
            const album = albums[albumIndex];

            if (album && album.images.length > 0) {
                // Set the album title in the modal
                $('#modal-album-title').text(album.name);

                album.images.forEach(image => {
                    const imageElement = `<div><img src="${image}" style="width:100%;"></div>`;
                    imageCarousel.append(imageElement);
                });

                modal.show();

                imageCarousel.slick({
                    dots: true,
                    infinite: true,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear',
                    adaptiveHeight: true
                });
            }
        });

        const closeAndClearModal = () => {
            modal.hide();
            if (imageCarousel.hasClass('slick-initialized')) {
                imageCarousel.slick('unslick');
            }
            imageCarousel.empty();
            // Also clear the title
            $('#modal-album-title').text('');
        };

        closeModal.on('click', closeAndClearModal);

        $(window).on('click', function(event) {
            if ($(event.target).is(modal)) {
                closeAndClearModal();
            }
        });

        $(document).on('keydown', function(event) {
            if (event.key === "Escape") {
                closeAndClearModal();
            }
        });
    });
})(jQuery);
