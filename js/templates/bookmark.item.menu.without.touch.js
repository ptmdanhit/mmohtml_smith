$('.bookmark_item_menu_without_touch').load('templates/bookmark_item_menu_without_touch.html', function() {
    // Pass the Title as a part of data-title.
    $($(this)).find('h5').html($(this).data('title'));
    $($(this)).find('img').attr('src', 'images/' + $(this).data('image'));
});