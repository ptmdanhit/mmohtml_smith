// Register carouse namespace.
(function( carousel, $, undefined ) {

    var instructions = undefined;
    var appendix = undefined;
    var areEventsDisabled = false;

    carousel.init = function(callback) {
        $.get('templates/playlist_stub_appendix.html', function(data) {
            appendix = data;
            callback();
        });
    },

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
    };

    carousel.enableEvents = function(owlCarousel, bookMarkItem) {

        // Add to Carousel Action.
        $(bookMarkItem).on("click tap", function(event) {
            if(areEventsDisabled === true) {
                return false;
            }
            // If playlist instructions are present, move them away.
            // this removes also the recently added appendix
            if($('#playlist_carousel .instruction').length > 0) {
                // We want to check if instructions are present, if they are
                // we dont want to load them again because they become appendix.
                if(instructions === undefined) {
                    instructions = $('#playlist_carousel .instruction');
                }
                $('#playlist_carousel .instruction').parent().remove();
                owlCarousel.data('owlCarousel').reinit();
            }

            // Clone the Item, we want to keep the original and make it hidden
            var orginalItem = $(this);
            var clonedItem = orginalItem.clone();
            // Hide the Original, and append the clonedItem
            orginalItem.addClass('hidden');
            owlCarousel.data('owlCarousel').addItem(clonedItem);
            // Always add Appendix
            owlCarousel.data('owlCarousel').addItem(appendix);
            $('.owl-item .owl-wrapper-outer').parent().remove();

            // Bind the deletion action on the clonedItem
            carousel.bindDeleteAction(clonedItem, owlCarousel, bookMarkItem);

            carousel.goToTheEnd(owlCarousel);
        })
        
    };

    carousel.disableEvents = function(action, bookMarkItem) {
        if(action == 'off') {
            $('.grid '+bookMarkItem+' .thumbnail').css({"cursor" : "default"});
            areEventsDisabled = true;            
        } else {
            areEventsDisabled = false;            
        }
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
            var breakAt = 0;
            // If appendix is present, we break at 1
            if(appendix !== undefined) {
                breakAt = 1;
            }
            if($('#playlist_carousel .media').length <= breakAt) {
            console.log(instructions);
                // Remove Appendix if its present.
                $('#playlist_carousel .instruction').parent().remove();
                $('#playlist_carousel').append(instructions);
            }

            // Reinit the Carousel
            owlCarousel.data('owlCarousel').reinit();
            
            carousel.goToTheEnd(owlCarousel);
        });
    },

    // Goes to the End of Carousel
    carousel.goToTheEnd = function(owlCarousel)
    {
        // Call it twice so the human eye won't see short delay.
        owlCarousel.trigger('owl.jumpTo', -1);
        owlCarousel.trigger('owl.jumpTo', -1);
    },

    carousel.applyAppendix = function(owlCarousel)
    {
        if($('#playlist_carousel .instruction').length > 0) {
            $('#playlist_carousel .instruction').parent().remove();
            owlCarousel.data('owlCarousel').reinit();
        }
        owlCarousel.data('owlCarousel').addItem(appendix);
    }
  
}( window.carousel = window.carousel || {}, $ ));
