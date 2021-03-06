$(document).ready(function(){
  var _windowHeight;

  // Kicks off the event and styling initialization
  var initialize = function() {
    navInit();
    hoverInit();
    parallaxInit();
  };

  var isMobileSize = function(){
      return $(window).width() <= 480;
  };

  var isPortraitTablet = function(){
      return $(window).width() <= 768 && $(window).height() >= 1024;
  };

  // Set up the nav
  var navInit = function(){
    // Click to scroll
    $('.nav-container .nav, .subheader .nav').bind('click', function(){
      $('.nav').removeClass('hover');
      $(this).addClass('hover');

      $('.subheader').fadeOut();
      $('.trish').removeClass('menu-open');

      var pos;
      var navClicked = $(this).attr('data-href');

      if (navClicked == 'about') {
          pos = 0;
      } else if (navClicked == 'contact') {
          pos = $('#' + $(this).attr('data-href')).offset().top + 100;
      } else if (navClicked == 'work' && isMobileSize()){
        pos = $('#' + $(this).attr('data-href')).offset().top - 70;
      } else {
          pos = $('#' + $(this).attr('data-href')).offset().top;
      }

      $('html, body').animate({ scrollTop: pos + 'px' });
    });

    $('.title-container').bind('click', function(){
        $('html, body').animate({ scrollTop: '0px' });
    });

    /* Update headers while scrolling */
    $('#about, #work, #contact').waypoint(function(d){
      $('.nav').removeClass('hover');
      var id = $(this).attr('id');
      var order = parseInt($(this).attr('data-order')) > 1 ? parseInt($(this).attr('data-order')) - 1 : parseInt($(this).attr('data-order'));

      if(d == 'down') {
        $('.nav[data-href="' + id + '"]').addClass('hover');
      }
      else if (d == 'up'){
        $('.nav[data-order="' + order + '"]').addClass('hover');
      }
    }, { offset: 70 });

    $('.mobile-menu').bind('click', function(){
       $('.subheader').slideToggle(function(){

       });
       $('.trish').toggleClass('menu-open');
    });

    $('.outer-wrapper').bind('click', function(){
       $('.subheader:visible').slideToggle();
       $('.trish').removeClass('menu-open');
    });

    // Contacts should open in a new tab except for email
    $('.link').bind('click', function(){
        var dest = $(this).attr('data-href');

       if($(this).hasClass('email')){
           location.href = dest;
       } else{
           window.open(dest);
       }
    });
  };

  // Initialize hover events
  var hoverInit = function(){
    var gifShown = false;

    $('#card').hover(function(){
      $(this).toggleClass('flipped');
    }, function(){
      $(this).toggleClass('flipped');
    });

    /* Hover for himynameistrish title */
    $('.title-container .himynameis').hover(function(){
      $('.title-container .trish').addClass('hover');
    }, function(){
      $('.title-container .trish').removeClass('hover');
    });

    /* Hover events for gifs */
    $('.gif-trigger').hover(function(){
      var gif = $(this).closest('.story').find('.gif');
      var copy = isMobileSize() ? $(this).closest('.story').find('.copy:not(.desktop-copy)') : $(this).closest('.story').find('.copy:not(.mobile-copy)');

      if(!isMobileSize()){
          var contact = $(this).closest('.story').find('.contact-wrapper');
          contact.hide();
      }

      copy.hide();
      gif.show();
    },
    function(){
      if(gifShown){
          return false;
      }

      var gif = $(this).closest('.story').find('.gif');
      var copy = isMobileSize() ? $(this).closest('.story').find('.copy:not(.desktop-copy)') : $(this).closest('.story').find('.copy:not(.mobile-copy)');

        if(!isMobileSize()){
            var contact = $(this).closest('.story').find('.contact-wrapper');
            contact.show();
        }

      gif.hide();
      copy.show();
    });

    // Gifs for mobile, clicking should show the gif
    $('span.gif-trigger').bind('click', function(e){
      e.stopPropagation();

      gifShown = true;
      var gif = $(this).closest('.story').find('.gif');
      var copy = isMobileSize() ? $(this).closest('.story').find('.copy:not(.desktop-copy)') : $(this).closest('.story').find('.copy:not(.mobile-copy)');

      if(!isMobileSize()){
        var contact = $(this).closest('.story').find('.contact-wrapper');
        contact.hide();
      }

      copy.hide();
      gif.show();
    });

    // Clicking anywhere on the body should hide the gifs
    $('body').bind('click', function(){
      gifShown = false;

      if (isMobileSize()){
        $('.copy:not(.desktop-copy)').show();
      } else if (isPortraitTablet()){
        $('.contact-wrapper').show();
        $('.copy:not(.desktop-copy)').show();

        $('h1.desktop-copy').show();
        $('h1.mobile-copy').hide();

        $('.story.primary .desktop-copy').show();
        $('.story.primary .mobile-copy').hide();
      } else{
        $('.contact-wrapper').show();
        $('.copy:not(.mobile-copy)').show();
      }

        $('.gif').hide();
    });
  };

  // Initialize the parallax styles and events
  var parallaxInit = function(){
    //save selectors as variables to increase performance
    var $firstBG = $('#rushmore');
    var $secondBG = $('#dodge');
    var $thirdBG = $('#ride-planner');
    var $fourthBG = $('#chrysler');
    var $contact = $('.contact');

    _windowHeight = $(window).height(); //get the height of the window

    //apply the class "inview" to a section that is in the viewport
    $('#dodge, #ride-planner, #rushmore, #chrysler, #contact').bind('inview', function (event, visible) {
      if (visible == true) {
        $(this).addClass("inview");
      } else {
        $(this).removeClass("inview");
      }
    });

    //function that is called for every pixel the user scrolls. Determines the position of the background
    var newPos = function (x, windowHeight, pos, adjuster, inertia){
      return x + "% " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
    };

    var newOpacity = function(y, windowHeight, pos){
      //only start when the div is y% away from the top of the page
      var distanceFromViewportTop = $contact.offset().top - pos;
      var visibilityZoneHeight = (windowHeight * y);

      if(distanceFromViewportTop <= visibilityZoneHeight){
        return 1 - (distanceFromViewportTop/ visibilityZoneHeight);
      }else{
        return 0;
      }
    };

    //function to be called whenever the window is scrolled or resized
    //move the background images in relation to the movement of the scrollbar
    var move = function(){
      var pos = $(window).scrollTop(); //position of the scrollbar

        if (!isMobileSize()) {
            // Adjust the contact us section's opacity
            $contact.css('opacity', newOpacity(0.5, _windowHeight, pos, 5));

            //if the first section is in view...
            if ($firstBG.hasClass("inview")) {
                //call the newPos function and change the background position
                $firstBG.css({'backgroundPosition': newPos(50, _windowHeight, pos, 0, 0.005)});
            }

            //if the second section is in view...
            if ($secondBG.hasClass("inview")) {
                //call the newPos function and change the background position
                $secondBG.css({'backgroundPosition': newPos(50, _windowHeight, pos, 0, 0.005)});
            }

            //if the third section is in view...
            if ($thirdBG.hasClass("inview")) {
                //call the newPos function and change the background position
                $thirdBG.css({'backgroundPosition': newPos(50, _windowHeight, pos, 0, 0.005)});
            }

            // if the fourth section is in view...
            if($fourthBG.hasClass("inview")){
                //call the newPos function and change the background position
                $fourthBG.css({'backgroundPosition': newPos(50, _windowHeight, pos, 0, 0.005)});
            }
        }
    };

    //if the user resizes the window...
    $(window).resize(function(){
      // Reset the gifs and toggle copy to display for mobile/desktop, show/hide contact section outright
      $('.gif').hide();

      if (isMobileSize()){
            $contact.css('opacity', 1);
            $('.mobile-copy').show();
            $('.desktop-copy').hide();

      } else{
            $('.desktop-copy').show();
            $('.mobile-copy').hide();
      }

      _windowHeight = $(window).height(); //get the height of the window
      move();
    });

    //when the user is scrolling...
    $(window).bind('scroll', function(){
      move();
    });

    // click events for the parallax sections
    $('.parallax > div').bind('click', function(event, element){
      //var link = $(event.target).attr('data-href');
      //window.open(link, '_blank', '');
    });
  };

  // Get this party started
  initialize();
});