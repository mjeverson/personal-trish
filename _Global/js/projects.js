$(document).ready(function(){

  var _container = null;
  var _disableScroll = false;

  // Kicks off the event and styling initialization
  var initialize = function() {
    // hook up the scrolling condition for mouse and gestures
    $('.scroll-container').hover(function(){
      $('.scroll-container .mask').fadeOut();
      _container = $(this);
      $(_container).mousedown(function(event) {
        var lastPos = event.clientX;

        $(window).mousemove(function(e)
        {
          $(window).unbind('mousemove');

          if(e.clientX < lastPos){
            scrollRight();
          } else if (e.clientX > lastPos){
            scrollLeft();
          }
        });
      })
      .mouseup(function() {
        $(window).unbind('mousemove');
      });
    }, function(){
      $('.scroll-container .mask').fadeIn();
      _container = null;
      $(_container).unbind('mousedown');
    });

    // Bind the key press event
    document.onkeydown = checkKey;
  };

  var checkKey = function(e) {
    e = e || window.event;

    switch (e.keyCode){
      case 37:
        // Left key pressed, scroll backward
        scrollLeft();
        break;
      case 39:
        // Right key pressed, scroll forwards
        scrollRight();
        break;
      default: break;
    }
  };

  var scrollLeft = function(){
    if (_container != null && !_disableScroll) {
      var elem = $(_container).find('.scroll-images');
      var width = $(_container).find('.scroll-images > div').first().width();
      var offset = parseFloat($(elem).css('margin-left'));
      var currentPage = $(_container).attr('page') == null ? 1 : parseFloat($(_container).attr('page'));

      if (currentPage > 1) {
        _disableScroll = true;
        $(elem).animate({'margin-left': offset + width}, 500, function(){
          $(_container).attr('page', currentPage - 1);
          _disableScroll = false;
        });
      }
    }
  };

  var scrollRight = function(){
    if(_container != null && !_disableScroll){
      var elem = $(_container).find('.scroll-images');
      var width = $(_container).find('.scroll-images > div').first().width();
      var offset = parseFloat($(elem).css('margin-left'));
      var currentPage = $(_container).attr('page') == null ? 1 : parseFloat($(_container).attr('page'));
      var numPages = $(_container).find('.scroll-images > div').size();

      if(currentPage < numPages) {
        _disableScroll = true;
        $(elem).animate({'margin-left': offset - width}, 500, function(){
          $(_container).attr('page', currentPage + 1);
          _disableScroll = false;
        });
      }
    }
  };

  //if the user resizes the window...
  $(window).resize(function() {
    $('.scroll-container').animate('margin-left', 0);
  });

  // Get this party started
  initialize();
});