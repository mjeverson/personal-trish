$(document).ready(function(){

  // Hover for himynameistrish
  $('.title-container .himynameis').hover(function(){
    $('.title-container .trish').addClass('hover');
  }, function(){
    $('.title-container .trish').removeClass('hover');
  });

  // click events for the parallax sections
  $('.parallax > div').bind('click', function(event, element){
    var link = $(event.target).attr('data-href');
    window.open(link, '_blank', '');
  });

  // Hover block rotate transforms
  $('.flipper').hover(function(){
    $(this).css({
      '-moz-transform': 'rotateX(90deg)',
      '-webkit-transform': 'rotateX(90deg)',
      'transform': 'rotateX(90deg)'
    });
  },function(){
    $(this).css({
      '-moz-transform': 'rotateX(0deg)',
      '-webkit-transform': 'rotateX(0deg)',
      'transform': 'rotateX(0deg)'
    });
  });

  //save selectors as variables to increase performance
  var $window = $(window);
  var $innerWrapperBG = $('.inner-wrapper');
  var $firstBG = $('#dodge');
  var $secondBG = $('#ride-planner');
  var $thirdBG = $('#rushmore');

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
      $firstBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 900, 0.3)});
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

  $window.resize(function(){ //if the user resizes the window...
    Move();
  });

  $window.bind('scroll', function(){ //when the user is scrolling...
    Move();
  });
});