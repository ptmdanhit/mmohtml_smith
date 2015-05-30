$('.playlist_item_menu').each(function() {
    $(this).load('templates/playlist_item_menu.html', function() {

        if(moment.isComputer()) {

            // When cursor is over the .media class
            // playlist_menu_onMouseOver
            $('.media').on("mouseover", function(){
                // Change styles
                $(this).closest('.column_inner')
                   .css({
                    'z-index':'11'
                });
                $(this).closest('.column_inner')
                   .find('.media_menu_touch_circle')
                   .show().css({
                    'border':'2px solid #fff'
                });
            });

            // playlist_menu_onMouseClick
            // When cursor is over the .media_menu_touch_circle class
            $('.media_menu_touch_circle').on("click tap", function(){

                // Show the popup
                $(this).closest('.column_inner')
                    .find('.media_menu_popup').show();
            });

            // playlist_popup_onMouseLeave
            // When cursor leaves the .column_inner class
            $('.column_inner').on("mouseleave", function() {

                // Change styles
                $(this).css({
                    'z-index':'10'
                });
                $(this).find('.media_menu_touch_circle')
                    .hide().css({
                        'border':'none'
                });

                // Hide the popup
                $(this).closest('.column_inner')
                    .find('.media_menu_popup').hide();
            });

        }


        if(moment.isMobile()) {
            // Make button always visible.
            $('.content .column .media_menu_touch_circle').css({'display' : 'block'});
            // Make Clickable / Touchable area bigger.
            $('.media_menu_touch_clickregion').css({'display' : 'block'});

            // playlist_menu_onTap
            // Bound the action to it. Use "on". As the click() reffers only to clicks
            // and is also outdated jQuery feature.
            $('.media_menu_touch_clickregion').on("click tap", function() {
                $(this).closest('.column_inner').find('.media_menu_popup').show();
                return false;
            });
        }

        // For both PC Browser and Mobile
        $('.button_close').on("click", function() {
            $(this).parent().hide();
        });
    });
});