$(function(){

  if (Modernizr.touch) {

    // Slider Init
     var b_slider = $('.bxslider').bxSlider({
            pager: false,
            minSlides: 5,
            maxSlides: 6,
            slideWidth: 210,
            slideMargin: 30
     });

    // First Load
    slider_init();

    // Resize Load
    $(window).resize(function(){
      slider_init();
    });
  }

    



  function slider_init() {

    var touch_device = $(window).width();

    if (touch_device < 479) {
      min_no_of_slides = 2;
    } else if ( ( touch_device > 480 ) && ( touch_device < 767 ) ) {
      min_no_of_slides = 3;
    } else if ( ( touch_device > 768 ) && ( touch_device < 991 ) ) {
      min_no_of_slides = 4;
    } else if ( touch_device > 992 ) {
      min_no_of_slides = 5;
    }

    b_slider.reloadSlider({
        minSlides: min_no_of_slides,
        pager: false,        
        maxSlides: 6,
        slideWidth: 210,
        slideMargin: 30
     });
  }

});