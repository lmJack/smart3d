$(document).ready(function() {

$('.close').click(function(e) {
        $.ajax({
            url: '/api/order/' + $(e.currentTarget).data("id"),
            type: 'DELETE',
            success: function(resp) {
                $(e.currentTarget).parent().remove();
            }
        });
    });
});