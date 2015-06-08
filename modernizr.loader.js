(function (global) {
    'use strict';

    function cacheModernizr() {
        try {
            sessionStorage.setItem(global.ModernizrLoader.storageKey, JSON.stringify(global.Modernizr));
        } catch (e) {}
    }

    function loadByUrl(modernizrUrl) {
        var script = document.createElement('script');
        script.async = true;
        script.onload = setTimeout.bind(null, cacheModernizr, 200);
        script.src = modernizrUrl;
        document.documentElement.firstElementChild.appendChild(script);
    }

    function loadModernizr(modernizrUrl) {
        try {
            // get cached
            var cached = JSON.parse(sessionStorage.getItem(global.ModernizrLoader.storageKey));

            // check what was cached object
            if (Object(cached) === cached) {
                global.Modernizr = cached;
            } else {
                loadByUrl(modernizrUrl);
            }
        } catch (e) {
            loadByUrl(modernizrUrl);
        }
    }

    global.ModernizrLoader = {
        load : loadModernizr,
        storageKey: 'CachedModernizr'
    };
}(window));
