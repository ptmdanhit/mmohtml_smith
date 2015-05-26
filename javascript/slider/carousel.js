// Register carouse namespace.
(function( carousel, $, undefined ) {

    var instructions;

    carousel.enableKeyDowns = function(owlCarousel) {
        document.onkeydown = checkKey;
        function checkKey(e) {
            e = e || window.event;
            // up arrow
            if (e.keyCode == '38') {  }
            // down arrow
            else if (e.keyCode == '40') {  }
            // left arrow
            else if (e.keyCode == '37') { 
                owlCarousel.data('owlCarousel').prev();
            }
            // right arrow
            else if (e.keyCode == '39') { 
                owlCarousel.data('owlCarousel').next();
            }
        }
    }
    carousel.enableEvents = function(owlCarousel, bookMarkItem) {
        // Add to Carousel Action.
        $(bookMarkItem).on("click tap", function(event) {

            // If playlist instructions are present, move them away.
            if($('#playlist_carousel .instruction').length > 0) {
                instructions = $('#playlist_carousel .instruction');
                $('#playlist_carousel .instruction').parent().remove();
                owlCarousel.data('owlCarousel').reinit();
            }

            // Clone the Item, we want to keep the original and make it hidden
            var orginalItem = $(this);
            var clonedItem = orginalItem.clone();

            // Hide the Original, and append the clonedItem
            orginalItem.addClass('hidden');
            owlCarousel.data('owlCarousel').addItem(clonedItem);
            $('.owl-item .owl-wrapper-outer').parent().remove();

            // Bind the deletion action on the clonedItem
            carousel.bindDeleteAction(clonedItem, owlCarousel, bookMarkItem);
        })
        
    };
    carousel.bindCustomNavigation = function(owlCarousel, buttonLeft, buttonRight) {
        $(buttonLeft).on("click tap", function() {
            owlCarousel.data('owlCarousel').prev();
        });
        $(buttonRight).on("click tap", function() {
            owlCarousel.data('owlCarousel').next();
        });
    };
    carousel.bindDeleteAction = function(el, owlCarousel, bookMarkItem) {
        var clonedItem = el;
        var orginalItem = $(bookMarkItem + '[data-id=' + el.data('id') + ']');

        // Enable the button close which will be bound to action.
        clonedItem.find('.button_remove_from_playlist').removeClass('hidden');

        clonedItem.find('.button_remove_from_playlist').on("click tap", function(event) {

            // Unhidden the item which will be removed from the Carousel.
            orginalItem.removeClass('hidden');

            // Remove from Carousel. We need to remove cloned item parent
            // because the OwlCarousel seems to be adding a wrapper.
            clonedItem.parent().remove();

            // If nothing is left inside the carousel, move in the instructions.
            if($('#playlist_carousel .media').length <= 0) {
                $('#playlist_carousel').append(instructions);
            }

            // Reinit the Carousel
            owlCarousel.data('owlCarousel').reinit();
        });
    }
  
}( window.carousel = window.carousel || {}, $ ));
