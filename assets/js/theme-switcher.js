(function () {
    'use strict';

    var STORAGE_KEY = 'theme-style';

    // Restore theme on load (backup for inline script)
    (function restore() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                document.documentElement.dataset.themeStyle = saved;
            }
        } catch(e) {}
    })();

    var THEMES = [
        { id: 'default', label: '默认', hint: 'PaperMod', color: '#4a9eff' },
        { id: 'minimal', label: '极简冷淡', hint: 'Monochrome', color: '#666666' },
        { id: 'japanese', label: '日系清新', hint: '和風', color: '#e88d9f' },
        { id: 'korean', label: '韩式潮流', hint: 'K-스타일', color: '#7c3aed' },
        { id: 'pixel', label: '像素艺术', hint: '8-bit', color: '#8bac0f' },
        { id: 'retro', label: '中式复古', hint: '古風', color: '#c43a31' },
    ];

    function getTheme() {
        return localStorage.getItem(STORAGE_KEY) || 'default';
    }

    function setTheme(styleId) {
        var html = document.documentElement;
        if (styleId === 'default') {
            delete html.dataset.themeStyle;
            localStorage.removeItem(STORAGE_KEY);
        } else {
            html.dataset.themeStyle = styleId;
            localStorage.setItem(STORAGE_KEY, styleId);
        }
    }

    function applyTheme(styleId) {
        setTheme(styleId);

        var items = document.querySelectorAll('.theme-style-item');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.toggle('active', items[i].dataset.style === styleId);
        }

        closePanel();
    }

    function closePanel() {
        var panel = document.getElementById('theme-style-panel');
        var btn = document.getElementById('theme-style-toggle');
        if (panel) panel.classList.remove('open');
        if (btn) btn.classList.remove('active');
    }

    function buildPanel() {
        var btn = document.getElementById('theme-style-toggle');
        if (!btn) return;

        var panel = document.createElement('div');
        panel.className = 'theme-style-panel';
        panel.id = 'theme-style-panel';
        panel.setAttribute('role', 'menu');

        var current = getTheme();

        for (var i = 0; i < THEMES.length; i++) {
            var t = THEMES[i];
            (function (theme) {
                var item = document.createElement('button');
                item.className = 'theme-style-item' + (theme.id === current ? ' active' : '');
                item.dataset.style = theme.id;
                item.setAttribute('role', 'menuitem');
                item.setAttribute('tabindex', '0');

                var swatch = document.createElement('span');
                swatch.className = 'theme-swatch';
                swatch.style.backgroundColor = theme.color;

                var info = document.createElement('span');
                info.className = 'theme-info';

                var nameEl = document.createElement('span');
                nameEl.className = 'theme-name';
                nameEl.textContent = theme.label;

                var hintEl = document.createElement('span');
                hintEl.className = 'theme-desc';
                hintEl.textContent = theme.hint;

                info.appendChild(nameEl);
                info.appendChild(hintEl);
                item.appendChild(swatch);
                item.appendChild(info);

                item.addEventListener('click', function (e) {
                    e.stopPropagation();
                    applyTheme(theme.id);
                });

                panel.appendChild(item);
            })(t);
        }

        btn.parentNode.appendChild(panel);

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            panel.classList.toggle('open');
        });

        document.addEventListener('click', function (e) {
            if (!panel.contains(e.target) && e.target !== btn) {
                closePanel();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closePanel();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildPanel);
    } else {
        buildPanel();
    }
})();
