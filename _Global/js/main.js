$(document).ready(function(){

  // Kicks off the event and styling initialization
  var initialize = function() {
    hoverInit();
    parallaxInit();
  };

  // Initialize hover events
  var hoverInit = function(){
    /* Hover for himynameistrish title */
    $('.title-container .himynameis').hover(function(){
      $('.title-container .trish').addClass('hover');
    }, function(){
      $('.title-container .trish').removeClass('hover');
    });

    /* Hover events for gifs */
    $('.gif-trigger').hover(function(){
      var gif = $(this).closest('.story').find('.gif');
      var copy = $(this).closest('.story').find('.copy');

      copy.hide();
      gif.show();
    },
    function(){
      var gif = $(this).closest('.story').find('.gif');
      var copy = $(this).closest('.story').find('.copy');

      gif.hide();
      copy.show();
    });

    // And clicking anywhere on the body should hide the gifs
    $('body').bind('click', function(){
      var gif = $('.gif');
      var copy = $('.copy');

      gif.hide();
      copy.show();
    });

    // Gifs for mobile, clicking should show the gif
    $('span.gif-trigger').bind('click', function(e){
      e.stopPropagation();
      var gif = $(this).closest('.story').find('.gif');
      var copy = $(this).closest('.story').find('.copy');

      copy.hide();
      gif.show();
    });

    /* Hover block rotate transforms */
   /* $('.flipper').hover(function(){
        $(this).find('back-face').animate({
          height: 'toggle'
        });
              *//*.css({
          '-moz-transform': 'rotateX(90deg)',
          '-webkit-transform': 'rotateX(90deg)',
          'transform': 'rotateX(90deg)'
        });*//*
      },
      function(){
        $(this).find('back-face').animate({
          height: 'toggle'
        });
        *//*$(this).css({
          '-moz-transform': 'rotateX(0deg)',
          '-webkit-transform': 'rotateX(0deg)',
          'transform': 'rotateX(deg)'
        });*//*
      });*/
  };

  // Initialize the parallax styles and events
  var parallaxInit = function(){
    //save selectors as variables to increase performance
    var $window = $(window);
    var $innerWrapperBG = $('.inner-wrapper');
    var $firstBG = $('#rushmore');
    var $secondBG = $('#dodge');
    var $thirdBG = $('#ride-planner');

    var windowHeight = $window.height(); //get the height of the window

    //apply the class "inview" to a section that is in the viewport
    $('#dodge, #ride-planner, #rushmore').bind('inview', function (event, visible) {
      if (visible == true) {
        $(this).addClass("inview");
      } else {
        $(this).removeClass("inview");
      }
    });

    //function that is called for every pixel the user scrolls. Determines the position of the background
    /*arguments:
     x = horizontal position of background
     windowHeight = height of the viewport
     pos = position of the scrollbar
     adjuster = adjust the position of the background
     inertia = how fast the background moves in relation to scrolling
     */
    function newPos(x, windowHeight, pos, adjuster, inertia){
      return x + "% " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
    }

    //function to be called whenever the window is scrolled or resized
    //move the background images in relation to the movement of the scrollbar
    function Move(){
      var pos = $window.scrollTop(); //position of the scrollbar

      // Adjust the inner wrapper position
      $innerWrapperBG.css('background-position', 'left ' + ((pos)) + 'px');

      //if the first section is in view...
      if($firstBG.hasClass("inview")){
        //call the newPos function and change the background position
        $firstBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 900, 0.1)});
      }

      //if the second section is in view...
      if($secondBG.hasClass("inview")){
        //call the newPos function and change the background position
        $secondBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 1900, 0.1)});
      }

      //if the third section is in view...
      if($thirdBG.hasClass("inview")){
        //call the newPos function and change the background position
        $thirdBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 2850, 0.1)});
      }
    }

    //if the user resizes the window...
    $window.resize(function(){
      Move();
    });

    //when the user is scrolling...
    $window.bind('scroll', function(){
      Move();
    });

    // click events for the parallax sections
    $('.parallax > div').bind('click', function(event, element){
      var link = $(event.target).attr('data-href');
      window.open(link, '_blank', '');
    });
  };

  // Get this party started
  initialize();
});