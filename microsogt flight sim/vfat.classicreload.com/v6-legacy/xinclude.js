
(function( $ ) {
  var TILE_WIDTH       = 180;
  var TILE_WIDTH_SMALL = 150;

  var ua=navigator.userAgent;

  window.AJS = {
    ios:(ua.indexOf('iPhone')>0  ||
         ua.indexOf('iPad')>0  ||
         ua.indexOf('iPod')>0)
  };



  AJS.emulate_setup = function(game){
    game.toString = function(){ return game.path; };
    AJS.emulator = new IALoader($('#canvas').get(0), game, null,
                                (game.scale ? parseFloat(game.scale) : 1),
                                (game.module.indexOf('dosbox') == 0 ? '/images/dosbox.png' : '/images/mame.png'));






  };

  AJS.emulate = function(){
    // move the virtual keyboard thing and give it a "go away!" button
    $('.ui-keyboard').prepend('<button style="position:relative;top:-5px;right:-8px;" type="button" class="close" onclick="$(\'.ui-keyboard\').removeClass(\'showing\').hide();" aria-hidden="true"><span class="iconochive-remove-circle"></span></button>').appendTo($('#emulate .posrel')).addClass('showing');

    $('#jsmessSS').fadeOut('slow');
    $('#canvasholder').css('visibility','visible');
    AJS.emulator.start();

    // setup the theatre-ia fullscreen button
    var EM = (JSMESS ? JSMESS : (DOSBOX ? DOSBOX : false));
    if (EM  &&  (canvas.webkitRequestFullScreen || canvas.mozRequestFullScreen || canvas.requestFullScreen)){
      $('#gofullscreen').on('click', function(){ Module.requestFullScreen(1,0); });
      /**/ if ('onfullscreenchange'       in document){ document.addEventListener('fullscreenchange',       EM.fullScreenChangeHandler); }
      else if ('onmozfullscreenchange'    in document){ document.addEventListener('mozfullscreenchange',    EM.fullScreenChangeHandler); }
      else if ('onwebkitfullscreenchange' in document){ document.addEventListener('webkitfullscreenchange', EM.fullScreenChangeHandler); }
    }

    // resize embeds to "vertically center"
    if ($('body').hasClass('embedded')){
      var embed_vert_center = function(){
        var blackness = $('body').height() -  $('body.embedded #emulate').height();
        if (blackness > 1){
          //console.log('blackness');
          //console.log(blackness);
          $('body.embedded #emulate').css('margin-top', blackness/2);
        }
      };
      setTimeout(embed_vert_center, 5000);
      setTimeout(embed_vert_center,10000);
      setTimeout(embed_vert_center,20000);
    }

    setTimeout(AJS.theatre_controls_position,  100);
    setTimeout(AJS.theatre_controls_position,  500);
    setTimeout(AJS.theatre_controls_position, 3000);
    setTimeout(AJS.theatre_controls_position,10000);

    return false;
  };
}( jQuery ));




