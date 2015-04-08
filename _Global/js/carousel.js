/**
 * Created by Mike on 2014-12-31.
 */
// the carousel
var $carousel = null;

//	the draggable wrapper
var $wrapper = null;

//	the width of one item
var itemWidth = 800;

//	the duration of the scrolling
var scrollDuration = 300;

//	dragging-engine
var startDragPosition = false;
function startDrag( event ) {
    event.preventDefault();

    if ( $carousel.triggerHandler( 'isScrolling' ) ) {
        startDragPosition = false;
        return;
    }
    startDragPosition = event.pageX;
    $wrapper.bind(
        'mousemove',
        function( e ) {
            $wrapper.css({
                'marginLeft': -(itemWidth + startDragPosition - e.pageX)
            });
        }
    );
}
function stopDrag( event ) {
    event.preventDefault();
    $wrapper.unbind('mousemove');

    if ( startDragPosition ) {
        var currentDragPosition = event.pageX;
        var direction = false;
        if ( startDragPosition < currentDragPosition ) {
            direction = 'prev';
        } else if ( startDragPosition > currentDragPosition ) {
            direction = 'next';
        }
        if ( direction ) {
            $carousel.trigger( direction );
            $wrapper.animate({
                'marginLeft': -itemWidth
            }, scrollDuration);
        }
    }
    startDragPosition = false;
}

$(function() {

    //	the carousel
    $carousel = $('#carousel');
    $carousel.carouFredSel({
        width: 800 * 3,
        height: 400,
        align: false,
        items: {
            visible: 3,
            start: -1
        },
        scroll: {
            items: 1,
            duration: scrollDuration
        },
        auto: false
    });

    //	make the wrapper draggable
    $wrapper = $carousel.parent();
    $wrapper.css({
        'cursor': 'move',
        'marginLeft': -itemWidth
    });
    $wrapper.bind('mousedown', startDrag)
    $wrapper.bind('mouseup', stopDrag)
    $wrapper.bind('mouseleave', stopDrag);
});