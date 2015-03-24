$(document).ready(function() {
    var dz = new Dropzone('.dropzone',{ 
        url: "/api/materials",
        uploadMultiple: true,
        autoProcessQueue: false
    });
    
    $('.close').click(function(e) {
        $.ajax({
            url: '/api/materials/' + $(e.currentTarget).data("id"),
            type: 'DELETE',
            success: function(resp) {
                $(e.currentTarget).parent().remove();
            }
        });
    });
    
    $('#save').click(function() {
        $.ajax({
            url: '/api/materials',
            type: 'POST',
            data: {
                name: $("#name").val(),
                price: $("#price").val(),
                desc: $("#desc").val()
            },
            success: function(resp) {
                dz.options.url = "/api/materials/addPic/" + resp;
                dz.processQueue();
                dz.on("queuecomplete", function() {
                    dz.removeAllFiles();
                    $("#name").val('');
                    $("#price").val('');
                    $("#desc").val('');
                    $.ajax({
                        url: '/api/materials',
                        type: 'GET',
                        success: function(resp) {
                            $("#materials").html("");
                            var materials = JSON.parse(resp);
                            materials.forEach(function(val, ind) {
                                $("#materials").append([
                                    '<div class="col-md-3">',
                                        '<div class="thumbnail">',
                                            '<button type="button" class="close" data-id="' + val._id + '"><span aria-hidden="true">&times;</span></button>',
                                            '<img src="' + val.thumbs[0] + '">',
                                            '<div class="caption">',
                                                '<h2>' + val.name + '</h2>',
                                            '</div>',
                                        '</div>',
                                    '</div>'].join(''));
                            });
                        }
                    }); 
                });
            }
        });
    });
});