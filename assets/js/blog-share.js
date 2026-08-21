(function () {
    'use strict';

    document.querySelectorAll('.blog-share').forEach(function (share) {
        var trigger = share.querySelector('.blog-share-trigger');
        var options = share.querySelector('.blog-share-options');
        var status = share.querySelector('.blog-share-status');
        var title = share.getAttribute('data-share-title') || document.title;
        var url = window.location.href.split('#')[0];
        var encodedUrl = encodeURIComponent(url);
        var encodedTitle = encodeURIComponent(title);

        share.querySelector('[data-share-platform="linkedin"]').href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodedUrl;
        share.querySelector('[data-share-platform="x"]').href = 'https://twitter.com/intent/tweet?text=' + encodedTitle + '&url=' + encodedUrl;
        share.querySelector('[data-share-platform="email"]').href = 'mailto:?subject=' + encodedTitle + '&body=' + encodeURIComponent(title + '\n\n' + url);

        function setOptions(open) {
            options.hidden = !open;
            trigger.setAttribute('aria-expanded', String(open));
        }

        trigger.addEventListener('click', function () {
            if (navigator.share) {
                navigator.share({ title: title, text: title, url: url }).catch(function (error) {
                    if (error && error.name !== 'AbortError') setOptions(true);
                });
                return;
            }
            setOptions(options.hidden);
        });

        share.querySelector('[data-share-platform="copy"]').addEventListener('click', function () {
            navigator.clipboard.writeText(url).then(function () {
                status.textContent = 'Link copied';
                setOptions(false);
                window.setTimeout(function () { status.textContent = ''; }, 2500);
            }).catch(function () {
                status.textContent = 'Copy failed';
            });
        });

        document.addEventListener('click', function (event) {
            if (!share.contains(event.target)) setOptions(false);
        });

        share.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                setOptions(false);
                trigger.focus();
            }
        });
    });
}());
