function getEmulType() {
  $gameWindow = document.getElementsByClassName('game-window')[0].classList;

  if ($gameWindow.contains("game-commodore-64")) {
    return [
      "https://vfat.classicreload.com/c64/c64joy.js",
    ];
  }
  if ($gameWindow.contains("emulator-jsdos")) {
    return [
      "/emulators/js-dos/js-dos.js?v=2",
      "/emulators/js-dos-launcher.js?v=2",
    ];
  }
  if ($gameWindow.contains("emulator-wgplayground")) {
    return null;
  }
  if ($gameWindow.contains("emulator-mess")) {
    scripts = [
      "https://vfat.classicreload.com/v7/es6-promise.js",
      "https://vfat.classicreload.com/v7/xinclude.js",
    ];
    if ($gameWindow.contains("game-imported")) {
      scripts.push(
        "/sites/all/themes/marinelli.del/js/alt_loader/loader.js",
        "/sites/all/themes/marinelli.del/js/alt_loader/gettitle.js"
      );
    }
    else {
      scripts.push(
        "https://vfat.classicreload.com/v7/loader.js",
        "https://vfat.classicreload.com/v7/gettitle.js"
      );
    }
    scripts.push(
      "https://vfat.classicreload.com/v7/broswerfs-8-31-2018.js",
      "https://vfat.classicreload.com/v7/pdg.js",
      "https://vfat.classicreload.com/v7/start.js",
      "https://vfat.classicreload.com/v7/mess.js"
    );

    return scripts;
  }
  if ($gameWindow.contains("emulator-dos")) {
    return [
      "https://vfat.classicreload.com/v6-legacy/es6-promise.js",
      "https://vfat.classicreload.com/v6-legacy/gamepad.js",
      "https://vfat.classicreload.com/v6-legacy/xinclude.js",
      "https://vfat.classicreload.com/v6-legacy/loader.js",
      "https://vfat.classicreload.com/v6-legacy/broswerfs-8-31-2018.js",
      "https://vfat.classicreload.com/v6-legacy/pdg.js",
      "https://vfat.classicreload.com/v6-legacy/start.js",
      "https://vfat.classicreload.com/v6-legacy/dos-legacy.js",
    ];
  }

  return null;
}

function loadEmul() {
  // Count how many times this function is called.
  loadEmul.count = ++loadEmul.count || 1;
  try {
    if (loadEmul.count <= 40) {
      var emulScripts = getEmulType();
      emulScripts.forEach(function (src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
      });
      // Set this to 100 so that this function only runs once.
      loadEmul.count = 100;
    }
  }
  catch (e) {
    if (loadEmul.count >= 40) {
      // Throw the exception if this still fails after running 40 times.
      throw e;
    }
    else {
      // Try again in 250 ms.
      window.setTimeout(loadEmul, 250);
    }
  }
}

function loadEmul_check() {
  if (window.jQuery && window.Drupal && window.Drupal.settings) {
    loadEmul();
  }
  else {
    window.setTimeout(loadEmul_check, 250);
  }
}
if (getEmulType() !== null) {
  loadEmul_check();
}

(function ($) {
  $(document).ready(function () {
    if (document.location.href.toLocaleLowerCase().includes('colecovision-') && $('canvas')[0] && document.location.href.toLocaleLowerCase() !== '"https://classicreload.com/colecovision-collection.html"') {
      $("<style> center{ text-align: left!important; width:648px;  } .emularity-splash-screen {    top: 107px!important; left: 0px!important;    border: 4px black solid!important;    right: 0px!important;    color: white!important;    background-color: black!important;} </style>").appendTo("head");
    } else {
      $("<style> .emularity-splash-screen {    left: 4px!important;    border: 5px black solid!important;    right: 0px!important;    color: white!important;    background-color: black!important;} </style>").appendTo("head");
    }
  });

  if ($('canvas')[0]) {
    $(".gstart").removeAttr("href");
    $('.gstart')[0].onclick = function () { }
    var playButton;
    init();

    function init() {
      playButton = $('.gstart')[0];
      playButton.addEventListener('click', adStartMethod);
    }
    function adStartMethod() {
      playButton.removeEventListener('click', adStartMethod);
      eventFire(document.getElementById('canvas'), 'click');
    }
    function eventFire(el, etype) {
      if (el.fireEvent) {
        el.fireEvent('on' + etype);
      } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    }

    function selectRestriction() {
      var gameWindow = document.getElementsByClassName('game-window')[0];
      var canvas = document.getElementById('canvas');
      var secondSidebar = document.getElementsByClassName('region-sidebar-second-wrapper')[0];
      if (window.innerWidth < 1210) {
        gameWindow.classList.remove('full-height');
        gameWindow.classList.add('full-width');
      }
      if (window.innerWidth >= 1210 && (!gameWindow.classList.contains('full-width') || !gameWindow.classList.contains('full-height'))) {
        gameWindow.classList.remove('full-width', 'full-height');
        if (canvas.clientWidth / canvas.clientHeight < 1.5) {
          gameWindow.classList.add('full-width');
        }
        else {
          gameWindow.classList.add('full-height');
        }
      }
      if (window.innerWidth - canvas.clientWidth - 400 < 350) {
        secondSidebar.classList.add('hidden');
      }
      else {
        secondSidebar.classList.remove('hidden');
      }
    }

    window.addEventListener("resize", selectRestriction);
    window.addEventListener("deviceorientation", selectRestriction);
    // window.addEventListener("load", selectRestriction);
    selectRestriction();
  }

  if ($('#expandscreen')) {
    $('#expandscreen').on('click', function () {
      if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    });
  }
})(jQuery);
;

var hasTouchScreen = false;
if ("maxTouchPoints" in navigator && 'ontouchstart' in window) {
  hasTouchScreen = navigator.maxTouchPoints > 0;
} else if ("msMaxTouchPoints" in navigator) {
  hasTouchScreen = navigator.msMaxTouchPoints > 0;
} else {
  var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
  if (mQ && mQ.media === "(pointer:coarse)") {
    hasTouchScreen = !!mQ.matches;
  } else if ('orientation' in window) {
    hasTouchScreen = true; // depredicated, but good fallback
  } else {
    // Only as a last resort, fall back to user agent sniffing
    var UA = navigator.userAgent;
    hasTouchScreen = (
      /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
      /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
    );
  }
}
if (hasTouchScreen) {
  var keyboardWrapper = document.getElementsByClassName("simple-keyboard-wrapper")[0];
  var showKeyboardWrapper = document.getElementsByClassName("show-keyboard-btn-wrapper")[0];

  showKeyboardWrapper.classList.toggle('hidden');

  document.getElementsByClassName("show-keyboard-btn")[0].addEventListener("click", () => {
    keyboardWrapper.classList.toggle('hidden');
    showKeyboardWrapper.classList.toggle('hidden');
  });

  document.getElementById("canvas").addEventListener("click", () => {
    if (keyboardWrapper.classList.contains("hidden")) {
      keyboardWrapper.classList.toggle("hidden");
    }
    if (!showKeyboardWrapper.classList.contains("hidden")) {
      showKeyboardWrapper.classList.toggle("hidden");
    }
  });
}
;
/*!
 * 
 *   simple-keyboard v2.24.1
 *   https://github.com/hodgef/simple-keyboard
 * 
 *   Copyright (c) Francisco Hodge (https://github.com/hodgef)
 * 
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 *   
 */
!function(t,e){"object"===typeof exports&&"object"===typeof module?module.exports=e():"function"===typeof define&&define.amd?define("SimpleKeyboard",[],e):"object"===typeof exports?exports.SimpleKeyboard=e():t.SimpleKeyboard=e()}(window,function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){t.exports=n(2)},function(t,e,n){},function(t,e,n){"use strict";n.r(e);n(1);function o(t){return(o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var s=function(){function t(e){var n=e.getOptions,o=e.getCaretPosition,i=e.dispatch;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.getOptions=n,this.getCaretPosition=o,this.dispatch=i,t.bindMethods(t,this)}var e,n,s;return e=t,s=[{key:"bindMethods",value:function(t,e){var n=!0,o=!1,i=void 0;try{for(var s,a=Object.getOwnPropertyNames(t.prototype)[Symbol.iterator]();!(n=(s=a.next()).done);n=!0){var u=s.value;"constructor"===u||"bindMethods"===u||(e[u]=e[u].bind(e))}}catch(r){o=!0,i=r}finally{try{n||null==a.return||a.return()}finally{if(o)throw i}}}}],(n=[{key:"getButtonClass",value:function(t){var e=t.includes("{")&&t.includes("}")&&"{//}"!==t?"functionBtn":"standardBtn",n=t.replace("{","").replace("}",""),o="";return"standardBtn"!==e&&(o=" hg-button-".concat(n)),"hg-".concat(e).concat(o)}},{key:"getDefaultDiplay",value:function(){return{"{bksp}":"backspace","{backspace}":"backspace","{enter}":"< enter","{shift}":"shift","{shiftleft}":"shift","{shiftright}":"shift","{alt}":"alt","{s}":"shift","{tab}":"tab","{lock}":"caps","{capslock}":"caps","{accept}":"Submit","{space}":" ","{//}":" ","{esc}":"esc","{escape}":"esc","{f1}":"f1","{f2}":"f2","{f3}":"f3","{f4}":"f4","{f5}":"f5","{f6}":"f6","{f7}":"f7","{f8}":"f8","{f9}":"f9","{f10}":"f10","{f11}":"f11","{f12}":"f12","{numpaddivide}":"/","{numlock}":"lock","{arrowup}":"\u2191","{arrowleft}":"\u2190","{arrowdown}":"\u2193","{arrowright}":"\u2192","{prtscr}":"print","{scrolllock}":"scroll","{pause}":"pause","{insert}":"ins","{home}":"home","{pageup}":"up","{delete}":"del","{end}":"end","{pagedown}":"down","{numpadmultiply}":"*","{numpadsubtract}":"-","{numpadadd}":"+","{numpadenter}":"enter","{period}":".","{numpaddecimal}":".","{numpad0}":"0","{numpad1}":"1","{numpad2}":"2","{numpad3}":"3","{numpad4}":"4","{numpad5}":"5","{numpad6}":"6","{numpad7}":"7","{numpad8}":"8","{numpad9}":"9"}}},{key:"getButtonDisplayName",value:function(t,e,n){return(e=n?Object.assign({},this.getDefaultDiplay(),e):e||this.getDefaultDiplay())[t]||t}},{key:"getUpdatedInput",value:function(t,e,n,o){var i=this.getOptions(),s=e;return("{bksp}"===t||"{backspace}"===t)&&s.length>0?s=this.removeAt(s,n,o):"{space}"===t?s=this.addStringAt(s," ",n,o):"{tab}"!==t||"boolean"===typeof i.tabCharOnTab&&!1===i.tabCharOnTab?"{enter}"!==t&&"{numpadenter}"!==t||!i.newLineOnEnter?t.includes("numpad")&&Number.isInteger(Number(t[t.length-2]))?s=this.addStringAt(s,t[t.length-2],n,o):"{numpaddivide}"===t?s=this.addStringAt(s,"/",n,o):"{numpadmultiply}"===t?s=this.addStringAt(s,"*",n,o):"{numpadsubtract}"===t?s=this.addStringAt(s,"-",n,o):"{numpadadd}"===t?s=this.addStringAt(s,"+",n,o):"{numpaddecimal}"===t?s=this.addStringAt(s,".",n,o):"{"===t||"}"===t?s=this.addStringAt(s,t,n,o):t.includes("{")||t.includes("}")||(s=this.addStringAt(s,t,n,o)):s=this.addStringAt(s,"\n",n,o):s=this.addStringAt(s,"\t",n,o),s}},{key:"updateCaretPos",value:function(t,e){var n=this.updateCaretPosAction(t,e);this.dispatch(function(t){t.caretPosition=n})}},{key:"updateCaretPosAction",value:function(t,e){var n=this.getOptions(),o=this.getCaretPosition();return e?o>0&&(o-=t):o+=t,n.debug&&console.log("Caret at:",o,"(".concat(this.keyboardDOMClass,")")),o}},{key:"addStringAt",value:function(t,e,n,o){var i;return n||0===n?(i=[t.slice(0,n),e,t.slice(n)].join(""),this.isMaxLengthReached()||o&&this.updateCaretPos(e.length)):i=t+e,i}},{key:"removeAt",value:function(t,e,n){var o;if(0===this.getCaretPosition())return t;var i=/([\uD800-\uDBFF][\uDC00-\uDFFF])/g;return e&&e>=0?t.substring(e-2,e).match(i)?(o=t.substr(0,e-2)+t.substr(e),n&&this.updateCaretPos(2,!0)):(o=t.substr(0,e-1)+t.substr(e),n&&this.updateCaretPos(1,!0)):t.slice(-2).match(i)?(o=t.slice(0,-2),n&&this.updateCaretPos(2,!0)):(o=t.slice(0,-1),n&&this.updateCaretPos(1,!0)),o}},{key:"handleMaxLength",value:function(t,e){var n=this.getOptions(),i=n.maxLength,s=t[n.inputName],a=s.length===i;if(e.length<=s.length)return!1;if(Number.isInteger(i))return n.debug&&console.log("maxLength (num) reached:",a),a?(this.maxLengthReached=!0,!0):(this.maxLengthReached=!1,!1);if("object"===o(i)){var u=s.length===i[n.inputName];return n.debug&&console.log("maxLength (obj) reached:",u),u?(this.maxLengthReached=!0,!0):(this.maxLengthReached=!1,!1)}}},{key:"isMaxLengthReached",value:function(){return Boolean(this.maxLengthReached)}},{key:"isTouchDevice",value:function(){return"ontouchstart"in window||navigator.maxTouchPoints}},{key:"pointerEventsSupported",value:function(){return window.PointerEvent}},{key:"camelCase",value:function(t){return!!t&&t.toLowerCase().trim().split(/[.\-_\s]/g).reduce(function(t,e){return e.length?t+e[0].toUpperCase()+e.slice(1):t})}},{key:"countInArray",value:function(t,e){return t.reduce(function(t,n){return t+(n===e)},0)}}])&&i(e.prototype,n),s&&i(e,s),t}();function a(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var u=function(){function t(e){var n=e.dispatch,o=e.getOptions;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.dispatch=n,this.getOptions=o,s.bindMethods(t,this)}var e,n,o;return e=t,(n=[{key:"handleHighlightKeyDown",value:function(t){var e=this.getOptions(),n=this.getSimpleKeyboardLayoutKey(t);this.dispatch(function(t){var o=t.getButtonElement(n)||t.getButtonElement("{".concat(n,"}"));o&&(o.style.backgroundColor=e.physicalKeyboardHighlightBgColor||"#9ab4d0",o.style.color=e.physicalKeyboardHighlightTextColor||"white")})}},{key:"handleHighlightKeyUp",value:function(t){var e=this.getSimpleKeyboardLayoutKey(t);this.dispatch(function(t){var n=t.getButtonElement(e)||t.getButtonElement("{".concat(e,"}"));n&&n.removeAttribute&&n.removeAttribute("style")})}},{key:"getSimpleKeyboardLayoutKey",value:function(t){var e;return((e=t.code.includes("Numpad")||t.code.includes("Shift")||t.code.includes("Space")||t.code.includes("Backspace")||t.code.includes("Control")||t.code.includes("Alt")||t.code.includes("Meta")?t.code:t.key)!==e.toUpperCase()||"F"===t.code[0]&&Number.isInteger(Number(t.code[1]))&&t.code.length<=3)&&(e=e.toLowerCase()),e}}])&&a(e.prototype,n),o&&a(e,o),t}();function r(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var c=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n,o;return e=t,o=[{key:"getDefaultLayout",value:function(){return{default:["` 1 2 3 4 5 6 7 8 9 0 - = {bksp}","{tab} q w e r t y u i o p [ ] \\","{lock} a s d f g h j k l ; ' {enter}","{shift} z x c v b n m , . / {shift}",".com @ {space}"],shift:["~ ! @ # $ % ^ & * ( ) _ + {bksp}","{tab} Q W E R T Y U I O P { } |",'{lock} A S D F G H J K L : " {enter}',"{shift} Z X C V B N M < > ? {shift}",".com @ {space}"]}}}],(n=null)&&r(e.prototype,n),o&&r(e,o),t}();function l(t){return(l="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function h(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var d=function(){function t(){var e=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.getOptions=function(){return e.options},this.getCaretPosition=function(){return e.caretPosition},this.registerModule=function(t,n){e.modules[t]||(e.modules[t]={}),n(e.modules[t])};var n="string"===typeof(arguments.length<=0?void 0:arguments[0])?arguments.length<=0?void 0:arguments[0]:".simple-keyboard",o="object"===l(arguments.length<=0?void 0:arguments[0])?arguments.length<=0?void 0:arguments[0]:arguments.length<=1?void 0:arguments[1];if(o||(o={}),this.utilities=new s({getOptions:this.getOptions,getCaretPosition:this.getCaretPosition,dispatch:this.dispatch}),this.caretPosition=null,this.keyboardDOM=document.querySelector(n),this.options=o,this.options.layoutName=this.options.layoutName||"default",this.options.theme=this.options.theme||"hg-theme-default",this.options.inputName=this.options.inputName||"default",this.options.preventMouseDownDefault=this.options.preventMouseDownDefault||!1,this.keyboardPluginClasses="",s.bindMethods(t,this),this.input={},this.input[this.options.inputName]="",this.keyboardDOMClass=n.split(".").join(""),this.buttonElements={},window.SimpleKeyboardInstances||(window.SimpleKeyboardInstances={}),window.SimpleKeyboardInstances[this.utilities.camelCase(this.keyboardDOMClass)]=this,this.allKeyboardInstances=window.SimpleKeyboardInstances,this.currentInstanceName=this.utilities.camelCase(this.keyboardDOMClass),this.keyboardInstanceNames=Object.keys(window.SimpleKeyboardInstances),this.isFirstKeyboardInstance=this.keyboardInstanceNames[0]===this.currentInstanceName,this.physicalKeyboard=new u({dispatch:this.dispatch,getOptions:this.getOptions}),!this.keyboardDOM)throw console.warn('"'.concat(n,'" was not found in the DOM.')),new Error("KEYBOARD_DOM_ERROR");this.render(),this.modules={},this.loadModules()}var e,n,o;return e=t,(n=[{key:"handleButtonClicked",value:function(t){var e=this.options.debug;if("{//}"===t)return!1;"function"===typeof this.options.onKeyPress&&this.options.onKeyPress(t),this.input[this.options.inputName]||(this.input[this.options.inputName]="");var n=this.utilities.getUpdatedInput(t,this.input[this.options.inputName],this.caretPosition);if(this.input[this.options.inputName]!==n&&(!this.options.inputPattern||this.options.inputPattern&&this.inputPatternIsValid(n))){if(this.options.maxLength&&this.utilities.handleMaxLength(this.input,n))return!1;this.input[this.options.inputName]=this.utilities.getUpdatedInput(t,this.input[this.options.inputName],this.caretPosition,!0),e&&console.log("Input changed:",this.input),this.options.syncInstanceInputs&&this.syncInstanceInputs(this.input),"function"===typeof this.options.onChange&&this.options.onChange(this.input[this.options.inputName]),"function"===typeof this.options.onChangeAll&&this.options.onChangeAll(this.input)}e&&console.log("Key pressed:",t)}},{key:"handleButtonMouseDown",value:function(t,e){var n=this;this.options.preventMouseDownDefault&&e.preventDefault(),this.options.stopMouseDownPropagation&&e.stopPropagation(),this.isMouseHold=!0,this.holdInteractionTimeout&&clearTimeout(this.holdInteractionTimeout),this.holdTimeout&&clearTimeout(this.holdTimeout),this.options.disableButtonHold||(this.holdTimeout=setTimeout(function(){!n.isMouseHold||(t.includes("{")||t.includes("}"))&&"{delete}"!==t&&"{backspace}"!==t&&"{bksp}"!==t&&"{space}"!==t&&"{tab}"!==t||(n.options.debug&&console.log("Button held:",t),n.handleButtonHold(t,e)),clearTimeout(n.holdTimeout)},500))}},{key:"handleButtonMouseUp",value:function(t){this.isMouseHold=!1,this.holdInteractionTimeout&&clearTimeout(this.holdInteractionTimeout),t&&"function"===typeof this.options.onKeyReleased&&this.options.onKeyReleased(t)}},{key:"handleButtonHold",value:function(t){var e=this;this.holdInteractionTimeout&&clearTimeout(this.holdInteractionTimeout),this.holdInteractionTimeout=setTimeout(function(){e.isMouseHold?(e.handleButtonClicked(t),e.handleButtonHold(t)):clearTimeout(e.holdInteractionTimeout)},100)}},{key:"syncInstanceInputs",value:function(){var t=this;this.dispatch(function(e){e.replaceInput(t.input),e.caretPosition=t.caretPosition})}},{key:"clearInput",value:function(t){t=t||this.options.inputName,this.input[t]="",this.caretPosition=0,this.options.syncInstanceInputs&&this.syncInstanceInputs(this.input)}},{key:"getInput",value:function(t){return t=t||this.options.inputName,this.options.syncInstanceInputs&&this.syncInstanceInputs(this.input),this.input[t]}},{key:"setInput",value:function(t,e){e=e||this.options.inputName,this.input[e]=t,this.options.syncInstanceInputs&&this.syncInstanceInputs(this.input)}},{key:"replaceInput",value:function(t){this.input=t}},{key:"setOptions",value:function(t){t=t||{},this.options=Object.assign(this.options,t),this.onSetOptions(t),this.render()}},{key:"onSetOptions",value:function(t){t.inputName&&(this.options.debug&&console.log("inputName changed. caretPosition reset."),this.caretPosition=null)}},{key:"clear",value:function(){this.keyboardDOM.innerHTML="",this.keyboardDOM.className=this.keyboardDOMClass,this.buttonElements={}}},{key:"dispatch",value:function(t){if(!window.SimpleKeyboardInstances)throw console.warn("SimpleKeyboardInstances is not defined. Dispatch cannot be called."),new Error("INSTANCES_VAR_ERROR");return Object.keys(window.SimpleKeyboardInstances).forEach(function(e){t(window.SimpleKeyboardInstances[e],e)})}},{key:"addButtonTheme",value:function(t,e){var n=this;if(!e||!t)return!1;t.split(" ").forEach(function(o){e.split(" ").forEach(function(e){n.options.buttonTheme||(n.options.buttonTheme=[]);var i=!1;n.options.buttonTheme.map(function(t){if(t.class.split(" ").includes(e)){i=!0;var n=t.buttons.split(" ");n.includes(o)||(i=!0,n.push(o),t.buttons=n.join(" "))}return t}),i||n.options.buttonTheme.push({class:e,buttons:t})})}),this.render()}},{key:"removeButtonTheme",value:function(t,e){var n=this;if(!t&&!e)return this.options.buttonTheme=[],this.render(),!1;t&&Array.isArray(this.options.buttonTheme)&&this.options.buttonTheme.length&&(t.split(" ").forEach(function(t,o){n.options.buttonTheme.map(function(o,i){if(e&&e.includes(o.class)||!e){var s=o.buttons.split(" ").filter(function(e){return e!==t});s.length?o.buttons=s.join(" "):(n.options.buttonTheme.splice(i,1),o=null)}return o})}),this.render())}},{key:"getButtonElement",value:function(t){var e,n=this.buttonElements[t];return n&&(e=n.length>1?n:n[0]),e}},{key:"inputPatternIsValid",value:function(t){var e,n=this.options.inputPattern;if((e=n instanceof RegExp?n:n[this.options.inputName])&&t){var o=e.test(t);return this.options.debug&&console.log('inputPattern ("'.concat(e,'"): ').concat(o?"passed":"did not pass!")),o}return!0}},{key:"setEventListeners",value:function(){!this.isFirstKeyboardInstance&&this.allKeyboardInstances||(this.options.debug&&console.log("Caret handling started (".concat(this.keyboardDOMClass,")")),document.addEventListener("keyup",this.handleKeyUp),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("mouseup",this.handleMouseUp),document.addEventListener("touchend",this.handleTouchEnd))}},{key:"handleKeyUp",value:function(t){this.caretEventHandler(t),this.options.physicalKeyboardHighlight&&this.physicalKeyboard.handleHighlightKeyUp(t)}},{key:"handleKeyDown",value:function(t){this.options.physicalKeyboardHighlight&&this.physicalKeyboard.handleHighlightKeyDown(t)}},{key:"handleMouseUp",value:function(t){this.caretEventHandler(t)}},{key:"handleTouchEnd",value:function(t){this.caretEventHandler(t)}},{key:"caretEventHandler",value:function(t){var e;t.target.tagName&&(e=t.target.tagName.toLowerCase()),this.dispatch(function(n){n.isMouseHold&&(n.isMouseHold=!1),"textarea"!==e&&"input"!==e||n.options.disableCaretPositioning?n.options.disableCaretPositioning&&(n.caretPosition=null):(n.caretPosition=t.target.selectionStart,n.options.debug&&console.log("Caret at: ",t.target.selectionStart,t.target.tagName.toLowerCase(),"(".concat(n.keyboardDOMClass,")")))})}},{key:"destroy",value:function(){document.removeEventListener("keyup",this.handleKeyUp),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("mouseup",this.handleMouseUp),document.removeEventListener("touchend",this.handleTouchEnd),this.clear()}},{key:"getButtonTheme",value:function(){var t=this,e={};return this.options.buttonTheme.forEach(function(n){var o;n.buttons&&n.class?("string"===typeof n.buttons&&(o=n.buttons.split(" ")),o&&o.forEach(function(o){var i=e[o];i?t.utilities.countInArray(i.split(" "),n.class)||(e[o]="".concat(i," ").concat(n.class)):e[o]=n.class})):console.warn('buttonTheme row is missing the "buttons" or the "class". Please check the documentation.')}),e}},{key:"onTouchDeviceDetected",value:function(){this.processAutoTouchEvents(),this.disableContextualWindow()}},{key:"disableContextualWindow",value:function(){window.oncontextmenu=function(t){if(t.target.classList.contains("hg-button"))return t.preventDefault(),t.stopPropagation(),!1}}},{key:"processAutoTouchEvents",value:function(){this.options.autoUseTouchEvents&&(this.options.useTouchEvents=!0,this.options.debug&&console.log("autoUseTouchEvents: Touch device detected, useTouchEvents enabled."))}},{key:"onInit",value:function(){this.options.debug&&console.log("".concat(this.keyboardDOMClass," Initialized")),this.setEventListeners(),"function"===typeof this.options.onInit&&this.options.onInit()}},{key:"beforeFirstRender",value:function(){this.utilities.isTouchDevice()&&this.onTouchDeviceDetected(),"function"===typeof this.options.beforeFirstRender&&this.options.beforeFirstRender(),this.isFirstKeyboardInstance&&this.utilities.pointerEventsSupported()&&!this.options.useTouchEvents&&!this.options.useMouseEvents&&this.options.debug&&console.log("Using PointerEvents as it is supported by this browser"),this.options.useTouchEvents&&this.options.debug&&console.log("useTouchEvents has been enabled. Only touch events will be used.")}},{key:"beforeRender",value:function(){"function"===typeof this.options.beforeRender&&this.options.beforeRender()}},{key:"onRender",value:function(){"function"===typeof this.options.onRender&&this.options.onRender()}},{key:"onModulesLoaded",value:function(){"function"===typeof this.options.onModulesLoaded&&this.options.onModulesLoaded()}},{key:"loadModules",value:function(){var t=this;Array.isArray(this.options.modules)&&(this.options.modules.forEach(function(e){var n=new e;if(n.constructor.name&&"Function"!==n.constructor.name){var o="module-".concat(t.utilities.camelCase(n.constructor.name));t.keyboardPluginClasses=t.keyboardPluginClasses+" ".concat(o)}n.init(t)}),this.keyboardPluginClasses=this.keyboardPluginClasses+" modules-loaded",this.render(),this.onModulesLoaded())}},{key:"getModuleProp",value:function(t,e){return!!this.modules[t]&&this.modules[t][e]}},{key:"getModulesList",value:function(){return Object.keys(this.modules)}},{key:"parseRowDOMContainers",value:function(t,e,n,o){var i=this,s=Array.from(t.children),a=0;return s.length&&n.forEach(function(n,u){var r=o[u];if(!r||!(r>n))return!1;var c=n-a,l=r-a,h=document.createElement("div");h.className+="hg-button-container";var d="".concat(i.options.layoutName,"-r").concat(e,"c").concat(u);h.setAttribute("data-skUID",d);var p=s.splice(c,l-c+1);a=l-c,p.forEach(function(t){return h.appendChild(t)}),s.splice(c,0,h),t.innerHTML="",s.forEach(function(e){return t.appendChild(e)}),i.options.debug&&console.log("rowDOMContainer",p,c,l,a+1)}),t}},{key:"render",value:function(){var t=this;this.clear(),this.initialized||this.beforeFirstRender(),this.beforeRender();var e="hg-layout-".concat(this.options.layoutName),n=this.options.layout||c.getDefaultLayout(),o=this.options.useTouchEvents||!1,i=o?"hg-touch-events":"",s=this.options.useMouseEvents||!1,a=this.options.disableRowButtonContainers,u=Array.isArray(this.options.buttonTheme)?this.getButtonTheme():{};this.keyboardDOM.className+=" ".concat(this.options.theme," ").concat(e," ").concat(this.keyboardPluginClasses," ").concat(i),n[this.options.layoutName].forEach(function(e,n){var i=e.split(" "),r=document.createElement("div");r.className+="hg-row";var c=[],l=[];i.forEach(function(e,i){var h=!a&&e.includes("[")&&e.length>1,d=!a&&e.includes("]")&&e.length>1;h&&(c.push(i),e=e.replace(/\[/g,"")),d&&(l.push(i),e=e.replace(/\]/g,""));var p=t.utilities.getButtonClass(e),f=u[e],y=t.utilities.getButtonDisplayName(e,t.options.display,t.options.mergeDisplay),m=t.options.useButtonTag?"button":"div",b=document.createElement(m);b.className+="hg-button ".concat(p).concat(f?" "+f:""),!t.utilities.pointerEventsSupported()||o||s?o?(b.ontouchstart=function(n){t.handleButtonClicked(e),t.handleButtonMouseDown(e,n)},b.ontouchend=function(){return t.handleButtonMouseUp(e)},b.ontouchcancel=function(){return t.handleButtonMouseUp(e)}):(b.onclick=function(){t.isMouseHold=!1,t.handleButtonClicked(e)},b.onmousedown=function(n){return t.handleButtonMouseDown(e,n)},b.onmouseup=function(){return t.handleButtonMouseUp(e)}):(b.onpointerdown=function(n){t.handleButtonClicked(e),t.handleButtonMouseDown(e,n)},b.onpointerup=function(){return t.handleButtonMouseUp(e)},b.onpointercancel=function(){return t.handleButtonMouseUp(e)}),b.setAttribute("data-skBtn",e);var g="".concat(t.options.layoutName,"-r").concat(n,"b").concat(i);b.setAttribute("data-skBtnUID",g),b.setAttribute("data-displayLabel",y);var v=document.createElement("span");v.innerHTML=y,b.appendChild(v),t.buttonElements[e]||(t.buttonElements[e]=[]),t.buttonElements[e].push(b),r.appendChild(b)}),r=t.parseRowDOMContainers(r,n,c,l),t.keyboardDOM.appendChild(r)}),this.onRender(),this.initialized||(this.initialized=!0,!this.utilities.pointerEventsSupported()||o||s?o?(document.ontouchend=function(){return t.handleButtonMouseUp()},document.ontouchcancel=function(){return t.handleButtonMouseUp()}):o||(document.onmouseup=function(){return t.handleButtonMouseUp()}):document.onpointerup=function(){return t.handleButtonMouseUp()},this.onInit())}}])&&h(e.prototype,n),o&&h(e,o),t}();e.default=d}])});

let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
  mergeDisplay: true,
  theme: "hg-theme-default",
  layoutName: "default",
  layout: {
    default: [
      "{alt} {modifiers} {control} {hide}",
      "Q W E R T Y U I O P",
      "A S D F G H J K L",
      "Tab Z X C V B N M",
      "{arrowup} {arrowdown} {arrowleft} {arrowright}",
      "Backspace {space} Enter",
    ],
    alt: [
      "{abc} {modifiers} {control} {hide}",
      "1 2 3 4 5 6 7 8 9 0",
      "- = ` [ ] \\ ' ; , . /",
      "{arrowup} {arrowdown} {arrowleft} {arrowright}",
      "Backspace {space} Enter",
    ],
    modifiers: [
      "{alt} {abc} {control} {hide}",
      "F1 F2 F3 F4 F5 F6",
      "F7 F8 F9 F10 F11 F12",
      "ShiftL Esc Caps ShiftR",
      "CtrlL AltL AltR CtrlR",
      "{arrowup} {arrowdown} {arrowleft} {arrowright}",
    ],
    control: [
      "{alt} {modifiers} {abc} {hide}",
      "PrnScr ScrollLock Pause",
      "Insert Home PageUp",
      "Delete End PageDown",
      "{arrowup} {arrowdown} {arrowleft} {arrowright}",
    ],
  },
  display: {
    "{alt}": ".?123",
    "{abc}": "ABC",
    "{modifiers}": "Mod&Fn",
    "{control}": "Control",
    "{hide}": "×",
  },
  onKeyPress: button => onKeyDown(button),
  onKeyReleased: button => onKeyUp(button),
});

let keyCodes = {
  "Esc": 27,
  "F1": 112,
  "F2": 113,
  "F3": 114,
  "F4": 115,
  "F5": 116,
  "F6": 117,
  "F7": 118,
  "F8": 119,
  "F9": 120,
  "F10": 121,
  "F11": 122,
  "F12": 123,
  "`": 192,
  "-": 173,
  "Backspace": 8,
  "Tab": 9,
  "[": 219,
  "]": 221,
  "\\": 220,
  "Caps": 20,
  "'": 222,
  ",": 188,
  ".": 190,
  "/": 191,
  "Enter": 13,
  "ShiftL": 16,
  "ShiftR": 16,
  "CtrlL": 17,
  "CtrlR": 17,
  "AltL": 18,
  "AltR": 18,
  "MetaL": 91,
  "MetaR": 91,
  "{space}": 32,
  "{arrowleft}": 37,
  "{arrowup}": 38,
  "{arrowright}": 39,
  "{arrowdown}": 40,
  "Insert": 45,
  "Delete": 46,
  "Home": 36,
  "End": 35,
  "PageUp": 33,
  "PageDown": 34,
};

let keys = {
  "`": "Backquote",
  "-": "Minus",
  "[": "BracketLeft",
  "]": "BracketRight",
  "\\": "Backslash",
  "'": "Quote",
  ",": "Comma",
  ".": "Period",
  "/": "Slash",
  "ShiftL": "ShiftLeft",
  "ShiftR": "ShiftRight",
  "CtrlL": "ContolLeft",
  "CtrlR": "ContolRight",
  "AltL": "AltLeft",
  "AltR": "AltRight",
  "MetaL": "OSLeft",
  "MetaR": "OSRight",
  "{space}": "Space",
  "{arrowleft}": "ArrowLeft",
  "{arrowup}": "ArrowUp",
  "{arrowright}": "ArrowRight",
  "{arrowdown}": "ArrowDown",
};

function makeEventConfig(button) {
  return {
    keyCode: keyCodes[button] ? keyCodes[button] : button.charCodeAt(0),
    bubbles: true,
    cancelable: true,
    composed: true,
    view: window,
    which: keyCodes[button] ? keyCodes[button] : button.charCodeAt(0),
  };
}

function onKeyDown(button) {
  var keyDownEvent = new KeyboardEvent("keydown", makeEventConfig(button));
  document.body.dispatchEvent(keyDownEvent);
}

function onKeyUp(button) {
  var keyUpEvent = new KeyboardEvent("keyup", makeEventConfig(button));
  var layoutSwitchers = [
    "{abc}",
    "{alt}",
    "{modifiers}",
    "{control}",
  ];
  if (layoutSwitchers.indexOf(button) !== -1) {
    handleLayoutChange(button);
  }
  if (button === "{hide}") {
    // setTimeout needed for preventing clicking element under "Hide keyboard"
    // button after it was clicked.
    setTimeout(() => document.getElementsByClassName("show-keyboard-btn")[0].click(), 100);
  }
  document.body.dispatchEvent(keyUpEvent);
}

function handleLayoutChange(button) {
  let layoutName;

  switch (button) {
    case "{abc}":
      layoutName = "default";
      break;
    case "{alt}":
      layoutName = "alt";
      break;
    case "{modifiers}":
      layoutName = "modifiers";
      break;
    case "{control}":
      layoutName = "control";
      break;
    default:
      break;
  }

  if (layoutName) {
    let keyboardSpot = document.getElementsByClassName("simple-keyboard")[0];
    keyboard.setOptions({
      layoutName: layoutName
    });
    keyboardSpot.classList.toggle('hidden');
  }
}
;
