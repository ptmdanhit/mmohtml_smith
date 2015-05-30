$('.introduction').each(function() {
    $(this).load('templates/introduction.html', function() {
        $("#close_title").on("click tap", function(event) {
            event.preventDefault();
            $('.introduction').hide();
        });
    });
});