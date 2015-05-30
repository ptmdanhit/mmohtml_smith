$(document).ready(function() {
    if (moment.isMobile()) {

    } else {
        $('.button_back').hover(function(){
            $(this).closest('.column_inner').find('.button_back_highlight').show();
            }, function() {
                $(this).closest('.column_inner').find('.button_back_highlight').hide();
            });
    }
});