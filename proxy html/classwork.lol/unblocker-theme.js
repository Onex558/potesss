(function () {
  'use strict';

  var STORAGE_KEY = 'kiwi-homepage-theme';
  var DEFAULT = '#30ff00';
  var THEMES = {
    '#ff0000': true, '#ff5500': true, '#ffea00': true, '#30ff00': true,
    '#00fffb': true, '#001aff': true, '#6f00ff': true, '#ff00f2': true
  };
  var THEME_LOGOS = {
    '#ff0000': '/images/themes/kiwi-red.png',
    '#ff5500': '/images/themes/kiwi-orange.png',
    '#ffea00': '/images/themes/kiwi-yellow.png',
    '#30ff00': '/images/kiwi-logo.png',
    '#00fffb': '/images/themes/kiwi-cyan.png',
    '#001aff': '/images/themes/kiwi-blue.png',
    '#6f00ff': '/images/themes/kiwi-purple.png',
    '#ff00f2': '/images/themes/kiwi-pink.png'
  };

  function readTheme() {
    try {
      var color = String(localStorage.getItem(STORAGE_KEY) || '').toLowerCase();
      return THEMES[color] ? color : DEFAULT;
    } catch (_) {
      return DEFAULT;
    }
  }

  function toRgb(hex) {
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16)
    ];
  }

  function toHsv(rgb) {
    var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
    var hue = 0;
    if (delta) {
      if (max === r) hue = ((g - b) / delta) % 6;
      else if (max === g) hue = (b - r) / delta + 2;
      else hue = (r - g) / delta + 4;
      hue *= 60;
      if (hue < 0) hue += 360;
    }
    return { h: hue, s: max ? delta / max : 0 };
  }

  function mixWithWhite(rgb, amount) {
    return rgb.map(function (value) {
      return Math.round(value * (1 - amount) + 255 * amount);
    });
  }

  function applyTheme() {
    var color = readTheme();
    var rgb = toRgb(color);
    var hsv = toHsv(rgb);
    var root = document.documentElement;
    root.dataset.kiwiUnblockerTheme = color;
    root.style.setProperty('--kiwi', color);
    root.style.setProperty('--kiwi-logo-image', 'url("' + THEME_LOGOS[color] + '")');
    root.style.setProperty('--kiwi-rgb', rgb.join(', '));
    root.style.setProperty('--kiwi-dim', 'rgb(' + rgb.map(function (value) {
      return Math.round(value * .8);
    }).join(', ') + ')');
    root.style.setProperty('--kiwi-glow', 'rgba(' + rgb.join(', ') + ', .2)');
    root.style.setProperty('--kiwi-hue', Math.round(hsv.h - 109) + 'deg');
    root.style.setProperty('--kiwi-saturation', Math.max(.45, hsv.s).toFixed(3));
    window.kiwiUnblockerStarRgb = mixWithWhite(rgb, .45).join(',');
  }

  applyTheme();
  window.addEventListener('storage', function (event) {
    if (event.key === STORAGE_KEY) applyTheme();
  });
}());