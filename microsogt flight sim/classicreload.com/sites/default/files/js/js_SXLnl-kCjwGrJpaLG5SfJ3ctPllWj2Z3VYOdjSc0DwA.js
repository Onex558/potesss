/* jSticky Plugin
 * =============
 * Author: Andrew Henderson (@AndrewHenderson)
 * Contributor: Mike Street (@mikestreety)
 * Date: 9/7/2012
 * Update: 09/20/2016
 * Website: http://github.com/andrewhenderson/jsticky/
 * Description: A jQuery plugin that keeps select DOM
 * element(s) in view while scrolling the page.
 */

;(function($) {

  $.fn.sticky = function(options) {
    var defaults = {
      topSpacing: 0, // No spacing by default
      zIndex: '', // No default z-index
      stopper: '.sticky-stopper', // Default stopper class, also accepts number value
      stickyClass: false // Class applied to element when it's stuck
    };
    var settings = $.extend({}, defaults, options); // Accepts custom stopper id or class

    // Checks if custom z-index was defined
    function checkIndex() {
      if (typeof settings.zIndex == 'number') {
        return true;
      } else {
        return false;
      }
    }

    var hasIndex = checkIndex(); // True or false

    // Checks if a stopper exists in the DOM or number defined
    function checkStopper() {
      if (0 < $(settings.stopper).length || typeof settings.stopper === 'number') {
        return true;
      } else {
        return false;
      }
    }
    var hasStopper = checkStopper(); // True or false

    return this.each(function() {

      var $this = $(this);
      var thisHeight = $this.outerHeight();
      var thisWidth = $this.outerWidth();
      var topSpacing = settings.topSpacing;
      var zIndex = settings.zIndex;
      var pushPoint = $this.offset().top - topSpacing; // Point at which the sticky element starts pushing
      var placeholder = $('<div></div>').width(thisWidth).height(thisHeight).addClass('sticky-placeholder'); // Cache a clone sticky element
      var stopper = settings.stopper;
      var $window = $(window);

      function stickyScroll() {

        var windowTop  = $window.scrollTop(); // Check window's scroll position
        var stopPoint = stopper;
        var parentWidth = $this.parent().width();

        placeholder.width(parentWidth)

        if ( hasStopper && typeof stopper === 'string' ) {
          var stopperTop = $(stopper).offset().top;
          stopPoint  = (stopperTop - thisHeight) - topSpacing;
        }
        console.log($this.offset().top+':'+topSpacing+':'+pushPoint+':'+windowTop);
        if (pushPoint < windowTop) {
          // Create a placeholder for sticky element to occupy vertical real estate
          if(settings.stickyClass)
            $this.addClass(settings.stickyClass);

          $this.after(placeholder).css({
            position: 'fixed',
            top: topSpacing,
            width: parentWidth
          });

          if (hasIndex) {
            $this.css({
              zIndex: zIndex
            });
          }

          if (hasStopper) {
            if (stopPoint < windowTop) {
              var diff = (stopPoint - windowTop) + topSpacing;
              $this.css({
                top: diff
              });
            }
          }
        } else {
          if(settings.stickyClass)
            $this.removeClass(settings.stickyClass);

          $this.css({
            position: 'static',
            top: null,
            left: null,
            width: 'auto'
          });

          placeholder.remove();
        }
      }

      if($window.innerHeight() > thisHeight) {

        $window.bind('scroll', stickyScroll);
        $window.bind('load', stickyScroll);
        $window.bind('resize', stickyScroll);
      }
    });
  };
})(jQuery);
;
/**
 * common theme behaviours
 *
 */

jQuery(document).ready(function($){
  $("*").removeClass("marinelli-hide-no-js"); // remove the hide class (see common.css)

  $("canvas").click(function () {
    $(".games-button").css("display", "none");

    var screenHeight = $(window).height();
    var adHeight = $("#div-gpt-ad").height();
    var adHeight = adHeight > 250 ? adHeight * 0.6 : adHeight;
    var keyboardHeight = $(".simple-keyboard").height();
  });
  $(".header-button").click(function() {
    if ($("#header").is(":hidden")) {
      $("#totalContainer").height("auto");
      $("#header").slideDown("fast");
    }
    else {
      $("#header").slideUp("fast", function() {
          $("#totalContainer").css("height", "");
          $("#header").css("display", "");
        });
    }
  });
  Drupal.behaviors.recaptchaRerender = {
    attach: function (context, settings) {
      if ('grecaptcha' in window && context !== document) {
        $('.g-recaptcha:empty', context).each(function () {
          grecaptcha.render(this, $(this).data());
        });
      }
    }
  };
  //setTimeout(function () {
    //var cookies = document.cookie.split("; ");
    //if (!window.aawChunk) {
      //$('#main-dialog-window').once('processed').show();
      //if (window.gtag) {
        //gtag("event", "adblockEnabledPopupShown");
      //}
      //if (!cookies.includes("adblock=enabled")) {
        //document.cookie = "adblock=enabled; path=/;";
      //}
    //}
    //else {
      //if (cookies.includes("adblock=enabled")) {
        //$('#thanks-message').once('processed').show();
        //if (!cookies.includes("adblockDisabled=true")) {
          //gtag("event", "adblockDisabledPopupShown");
          //document.cookie = "adblockDisabled=true; path=/;";
        //}
        //document.cookie = "adblock=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        //setTimeout(function () {
          //$('#thanks-message').hide();
        //}, 5 * 1000);
      //}
    //}
  //}, 5 * 1000);
  $.getJSON("/files/help/info-list.json", function (items) {
    items = items.reverse();
    var isActive = true;
    for (var i = 0; i < items.length; i++) {
      var active = (i === items.length - 1) ? "active" : "";
      var $itemList = $(`<li class="adblocker-tab ${active}" data-page="${items[i].id}"><span><img loading="lazy" src="${items[i].logo}"><p>${items[i].title}</p></span></li>`).prependTo(".main-dialog-instructions ul");
      var $contentPane = $(`<div class="content ${active}" data-page="${items[i].id}"><div class="steps">${items[i].steps}</div><div class="figure"><img loading="lazy" src="${items[i].figure}"></div></div>`).prependTo(".main-dialog-instructions .content-wrapper");
    }

    $(".adblocker-tab").click(function (event) {
      $(".adblocker-tab.active").toggleClass("active");
      $(this).toggleClass("active");
      var pageId = $(this).attr("data-page");
      $(".content.active").toggleClass("active");
      $(".content[data-page|='" + pageId + "']").toggleClass("active");
    });

    $(".page-left").click(function (event) {
      $(".page-right").attr("disabled", false);
      // Tab width with border.
      var shownTabsWidth = ($(".adblocker-tab").width() + 2) * 5;
      var tabsWidth = $(".tabs-scroll-wrapper .tabs.primary").width();
      var leftOffset = parseInt($(".tabs-scroll-wrapper .tabs.primary").css("left"));
      var newLeftOffset = leftOffset + shownTabsWidth;
      var lastOffset = 0;
      if (lastOffset <= newLeftOffset) {
        newLeftOffset = lastOffset;
        $(".page-left").attr("disabled", true);
      }
      $(".tabs-scroll-wrapper .tabs.primary").css("left", newLeftOffset);
    });

    $(".page-right").click(function (event) {
      $(".page-left").attr("disabled", false);
      // Tab width with border.
      var shownTabsWidth = ($(".adblocker-tab").width() + 2) * 5;
      var tabsScrollerWidth = $(".tabs-scroll-wrapper").width();
      var tabsWidth = $(".tabs-scroll-wrapper .tabs.primary").width();
      var leftOffset = parseInt($(".tabs-scroll-wrapper .tabs.primary").css("left"));
      var newLeftOffset = leftOffset - shownTabsWidth;
      var lastOffset = 0 - tabsWidth + tabsScrollerWidth;
      if (lastOffset >= newLeftOffset) {
        newLeftOffset = lastOffset;
        $(".page-right").attr("disabled", true);
      }
      $(".tabs-scroll-wrapper .tabs.primary").css("left", newLeftOffset);
    });
    $(".notSureButton").click(function (event) {
      $(".adblocker-tab.active").toggleClass("active");
      $(".adblocker-tab[data-page|='other']").toggleClass("active");
      $(".content.active").toggleClass("active");
      $(".content[data-page|='other']").toggleClass("active");
      $(".tabs-scroll-wrapper .tabs.primary").css("left", 0 - $(".tabs-scroll-wrapper .tabs.primary").width() + $(".tabs-scroll-wrapper").width());
      $(".page-right").attr("disabled", true);
    });
    $(".show-guide").click(function (event) {
      $(".main-dialog-warning").hide();
      $(".main-dialog-instructions").show();
    });
    $("#thanks-message .main-dialog-close").click(function () {
        $("#thanks-message").hide();
    });
    if ("ontouchstart" in document.documentElement) {
      $(".game-btn.gstart").click(function () {
          $(".warning-message-backdrop").removeClass("hidden");
      });
      $("#warning-message .main-dialog-close").click(function () {
          $(".warning-message-backdrop").toggleClass("hidden");
      });
    }
    $("#social .share-button").click(function () {
        $(".panel-wrapper").toggleClass("hidden");
    });
  });

  // повторить с интервалом 2 секунды
  let appendButton = setInterval(function() {
    if($(".wgButtons").length && $(".field-name-field-walkthrough").length) {
      $(`<a href="#walkthrough" class="walkthrough-button" onclick="gtag('event', 'walkthrough')" title="Game Walkthrough">Walkthrough</a>`).appendTo(".wgButtons");
      clearInterval(appendButton);
    }}, 750);
});
;
