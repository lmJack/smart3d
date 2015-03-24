$(document).ready(function() {
    $('#order').click(function(e) {
        e.preventDefault();
        $('#myModal').modal('show');
    });
    
    $.ajax({
        url: '/api/materials',
        type: 'GET',
        success: function(res) {
            var costs = $.grep(JSON.parse(res), function(e) {
                var elem = {};
                elem[e.name] = e.price;
                return elem;
            });
            
            $('.printmaterial').closest('.row').find('.printprice').html(Math.ceil(costs[$(this).val()]*$(this).data('vol')) + " руб.");
            
            $('.printmaterial').change(function(e) {
                $(this).closest('.row').find('.printprice').html(Math.ceil(costs[$(this).val()]*$(this).data('vol')) + " руб.");
            });
        }
    });
});