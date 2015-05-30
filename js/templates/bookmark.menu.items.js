$('.bookmark_item_menu').each(function() {
    $(this).load('templates/bookmark_item_menu.html', function() {

        $('.page_menu').on("click", function() {
            $(this).next().show();
            return false;
        })

        $('.media_menu_touch_clickregion').on("click", function() {
            $(this).closest('.column_inner').find('.media_menu_popup').show();
            return false;
        })

        $('.button_close').on("click", function() {
            $(this).parent().hide();
        })

        $('.button_back').on("hover", function(){
            $(this).closest('.column_inner').find('.button_back_highlight').show();
        }, function() {
            $(this).closest('.column_inner').find('.button_back_highlight').hide();
        });
    });
});