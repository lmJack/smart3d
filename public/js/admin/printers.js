$(document).ready(function() {
    
    $.ajax({
        url: '/api/materials',
        type: 'GET',
        success: function(resp) {
            var materials = JSON.parse(resp);
            var names = $.map(materials, function(o) { return o.name; });
            console.log(names);
            $('#materials').select2({
                data: names
            });
            $('#materials').on("change", function(e) { 
                console.log($('#materials').val());
            });
        }
    });
    
    
    var printerdz = new Dropzone('#printerpics',{ 
        url: "/admin/printers",
        uploadMultiple: true,
        autoProcessQueue: false
    });
    
    var printdz = new Dropzone('#printpics',{ 
        url: "/admin/printers",
        uploadMultiple: true,
        autoProcessQueue: false
    });
    
    $('.close').click(function(e) {
        $.ajax({
            url: '/api/printers/' + $(e.currentTarget).data("id"),
            type: 'DELETE',
            success: function(resp) {
                $(e.currentTarget).parent().remove();
            }
        });
    });
    
    $('#save').click(function() {
        $.ajax({
            url: '/api/printers',
            type: 'POST',
            data: {
                name: $("#name").val(),
                materials: JSON.stringify($("#materials").val()),
                desc: $("#desc").val(),
                
            },
            success: function(resp) {
                printerdz.options.url = "/api/printers/addPic/" + resp;
                printdz.options.url = "/api/printers/addPrint/" + resp;
                printerdz.processQueue();
                printdz.processQueue();
                printdz.on("queuecomplete", function() {
                    printdz.removeAllFiles();
                });
                printerdz.on("queuecomplete", function() {
                    printerdz.removeAllFiles();
                    $("#name").val('');
                    $("#materials").val('');
                    $("#desc").val('');
                    $.ajax({
                        url: '/api/printers',
                        type: 'GET',
                        success: function(resp) {
                            $("#materials").html("");
                            var printers = JSON.parse(resp);
                            printers.forEach(function(val, ind) {
                                $("#printers").append([
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