$(document).ready(function() {
    $('#order').click(function(e) {
        e.preventDefault();
        $('#myModal').modal('show');
    });
    
    $('.add').click(function(e) {
        e.preventDefault();
        Cart.add($(e.currentTarget).closest('.row').find('.printmaterial').val(), $(e.currentTarget).closest('.row').find('.qty').val(), $(e.currentTarget).closest('.row').find('.printprice').data('price'));
    });
    
    $.ajax({
        url: '/api/materials',
        type: 'GET',
        success: function(res) {
            
            var resp = JSON.parse(res), costs = {};
            
            resp.forEach(function(el,ind) {
                costs[el.name] = el.price;
            });
            
            $('.printmaterial').each(function(i, el) {
                $(el).closest('.row').find('.printprice').html(Math.ceil(costs[$(el).val()]*$(el).data('vol')) + " руб.");
                $(el).closest('.row').find('.printprice').data("price", costs[$(el).val()]*$(el).data('vol'));
            });
            
            $('.printmaterial').change(function(e) {
                $(e.currentTarget).closest('.row').find('.printprice').html(Math.ceil(costs[$(e.currentTarget).val()]*$(e.currentTarget).data('vol')) + " руб.");
            });
        }
    });
});