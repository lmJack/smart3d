var Order = {
	positions: [],
	onUpdate: function() {
		var html = '<h2 class="text-center">Состав заказа</h2>',
		fields = ['<div class="row text-left form-inline">',
							'<div class="col-md-6">',
								'<div class="form-group">',
    								'<label for="name"> Как Вас зовут? </label>',
									'<input id="name" type="text" class="form-control" style="margin-left:20px">',
								'</div>',
							'</div>',
							'<div class="col-md-6">',
								'<div class="form-group">',
									'<label for="contact">Email/Телефон </label>',
									'<input id="contact" type="text" class="form-control" style="margin-left:20px">',
								'</div>',
							'</div>',
					'</div>',
					'<hr>',
					'<div class="row">',
						'<div class="col-md-12">',
							'<div class="form-group">',
								'<label for="comment">Комментарии к заказу</label>',
								'<textarea class="form-control" id="comment" rows="5"></textarea>',
							'</div>',
						'</div>',
					'</div>',
					'<div class="row">',
							'<div class="col-md-2 col-md-offset-5">',
								'<div class="form-group">',
									'<button type="submit" class="btn btn-primary" id="send">Отправить заказ</button>',
								'</div>',
							'</div>',
						'</div>'].join('');
		this.positions.forEach(function(el, ind) {
			html += '<hr><div class="row"><div class="col-md-4"><p>' + el.material + '</p></div><div class="col-md-4"><p>' + el.count + ' шт.</p></div><div class="col-md-4"><p>' + el.subtotal + ' руб.</p></div></div>';
		});
		html += '<hr><div class="row"><div class="col-md-12"><p class="text-center">Итоговая стоимость заказа: ' + this.total + ' руб.</p></div></div><hr>';
		html += fields;
		$('#order').html(html);
		$('#send').click(function(e) {
			var send1 = false, send2 = false;
            if ($('#name').val() === null || $('#name').val() === '') {
            	$('#name').closest('.form-group').addClass('has-error');
            } else {
                $('#name').closest('.form-group').removeClass('has-error');
                send1 = true;
            }
            if ($('#contact').val() === null || $('#contact').val() === '') {
                $('#contact').closest('.form-group').addClass('has-error');
            } else {
                $('#contact').closest('.form-group').removeClass('has-error');
                send2 = true;
            }
            if (send1 && send2) {
            	Order.send();
            }
        });
	},
	
	total: 0,
	
	add: function(material, count, price) {
		var found = false;
		this.positions.forEach(function(el, ind) {
			if (el.material === material) {
				found = true;
				el.count += +count;
				el.subtotal += count*price;
			}
		});
		if (!found) {
			this.positions.push({material: material, count: +count, price: price, subtotal: count*price});
		}
		this.total += count*price;
		this.onUpdate();
	},
	
	send: function() {
		this.positions.forEach(function(el,ind) {
			$.ajax({
				url: "/api/order",
				type: "POST",
				data: {
					material: el.material,
					qty: el.count,
					price: el.price,
					name: $('#name').val(),
					contact: $('#contact').val(),
					comment: $('#comment').val()
				},
				success: function(resp) {
					console.log(resp);
					Order.dz.options.url = "/api/order/" + resp + "/savefile";
					Order.dz.processQueue();
				},
				error: function(resp) {
					console.log(resp);
				}
			});
		});
	}
};

var Calc = {
    onLoad: function(obj) {
    	var vol = Number(obj.volume).toPrecision(3);
        $.ajax({
        	url: "/api/materials/printer/" + $("#name").text(),
        	type: "get",
        	success: function(resp) {
        		var mtrls = JSON.parse(resp);
        		console.log(mtrls);
        		mtrls.forEach(function(val,ind) {
        		$("#total").append([
        		        "<hr><div class='row'>",
        			        "<div class='col-md-2'>",
        				        "<img class='img-responsive' src='" + val.thumbs[0] + "'>",
        			        "</div>",
        			        "<div class='col-md-5'>",
        				        "<h3 class='text-left'>" + val.name + "</h3>",
        			        "</div>",
        			        "<div class='col-md-3'>",
        			        	"<input type='number' class='form-control' value='1' style='width:50%; display: inline'> шт. <hr>",
        			            "<button data-material='" + val.name + "' data-price='" + Math.ceil( val.price * vol ) + "' class='btn btn-xs btn-primary order'>Добавить к заказу</button>",
        			        "</div>",
        			        "<div class='col-md-2'>",
        				        "<p>" + Math.ceil( val.price * vol ) + " руб.</p>",
        			        "</div>",
        		        "</div>"].join(''));
        		});
        		$('.order').click(function(e) {
            		var price = $(e.currentTarget).data('price'), material = $(e.currentTarget).data('material'), count = $(e.currentTarget).parent().find('input').val();
                	Order.add(material, count, price);
        		});
        	}
        });
        $('#cost').modal('show');
        $("#props").append("Объем: " + vol + " куб. см. <hr>");
        $("#total").append("<h2>Стоимость печати: </h2>");
    },
    
    readFile: function(file) {
        var reader = new FileReader();
        var isAscii = true;
        reader.onloadend = function(file) {
            var buf = reader.result,
    	        view = new Uint8Array( buf ),
    	        str = '';
    	    for (var i=0, len = view.length; i<len; i++) {
    		    str += String.fromCharCode(view[i]);
		        if (view[i] > 127) { 
		            isAscii=false; 
		            break; 
		        }
		    }
		    if (isAscii) {
			    var stl = Calc.parseSTLString(str);
			    console.log('ascii');
	    	    Calc.onLoad(stl);
		    } else {
			    stl = Calc.parseSTLBinary(buf);
	    	    Calc.onLoad(stl);
		    }	
        };
        reader.readAsArrayBuffer(file);
    },
    
    parseSTLString: function(str) {
        var totalVol = 0;
	    // yes, this is the regular expression, matching the vertexes
	    // it was kind of tricky but it is fast and does the job
	    var vertexes = str.match(/facet\s+normal\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+outer\s+loop\s+vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+endloop\s+endfacet/g);
  
        if (vertexes) {
	        vertexes.forEach(function (vert) {
		        var preVertexHolder = new Calc.VertexHolder();
		        vert.match(/vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s/g).forEach(function (vertex, i) {
			        var tempVertex = vertex.replace('vertex', '').match(/[-+]?[0-9]*\.?[0-9]+/g);
			        var preVertex = new Calc.Vertex(tempVertex[0],tempVertex[1],tempVertex[2]);
			        preVertexHolder['vert'+(i+1)] = preVertex;
		        });
		        var partVolume = Calc.triangleVolume(preVertexHolder);
		        totalVol += Number(partVolume);
	        });
        }

	    var volumeTotal = Math.abs(totalVol)/1000;
	    return { volume: volumeTotal }
    },
    
    parseSTLBinary: function(buf) {
        var headerLength = 80;
	    var dataOffset = 84;
	    var faceLength = 12*4 + 2;

	    var le = true; // is little-endian

	    var dvTriangleCount = new DataView(buf, headerLength, 4);
	    var numTriangles = dvTriangleCount.getUint32(0, le);
	    var totalVol = 0;

	    for (var i = 0; i < numTriangles; i++) {
		    var dv = new DataView(buf, dataOffset + i*faceLength, faceLength);
		    var normal = new Calc.Vertex(dv.getFloat32(0, le), dv.getFloat32(4, le), dv.getFloat32(8, le));
		    var vertHolder = new Calc.VertexHolder();
		    for(var v = 3; v < 12; v+=3) {
			    var vert = new Calc.Vertex(dv.getFloat32(v*4, le), dv.getFloat32((v+1)*4, le), dv.getFloat32( (v+2)*4, le ) );
			    vertHolder['vert'+(v/3)] = vert;
		    }
		    totalVol += Calc.triangleVolume(vertHolder);
	    }

	    var volumeTotal = Math.abs(totalVol)/1000;
	    return {volume: volumeTotal};
    },
    triangleVolume: function(vertexHolder) {
	    var 
	        v321 = Number(vertexHolder.vert3.v1 * vertexHolder.vert2.v2 * vertexHolder.vert1.v3),
	        v231 = Number(vertexHolder.vert2.v1 * vertexHolder.vert3.v2 * vertexHolder.vert1.v3),
	        v312 = Number(vertexHolder.vert3.v1 * vertexHolder.vert1.v2 * vertexHolder.vert2.v3),
	        v132 = Number(vertexHolder.vert1.v1 * vertexHolder.vert3.v2 * vertexHolder.vert2.v3),
	        v213 = Number(vertexHolder.vert2.v1 * vertexHolder.vert1.v2 * vertexHolder.vert3.v3),
	        v123 = Number(vertexHolder.vert1.v1 * vertexHolder.vert2.v2 * vertexHolder.vert3.v3);
	    return Number(1.0/6.0)*(-v321 + v231 + v312 - v132 - v213 + v123);
    },
    
    Vertex: function(v1,v2,v3) {
	    this.v1 = Number(v1);
	    this.v2 = Number(v2);
	    this.v3 = Number(v3);
    },
    VertexHolder: function(vertex1,vertex2,vertex3) {
	    this.vert1 = vertex1;
	    this.vert2 = vertex2;
	    this.vert3 = vertex3;
    }
};

$(document).ready(function() {
    var dz = new Dropzone('#dropzone',{ 
        url: "/",
        uploadMultiple: false,
        autoProcessQueue: false,
        clickable: '#addfiles',
        maxFilesize: 50,
        maxFiles: 1,
        acceptedFiles: '.stl'
    });
    
    dz.on("addedfile", function(file) {
        $('#dropzone').html('');
        $('#props').html('<h2 class="text-center">Свойства модели</h2>');
        Calc.readFile(file);
        Order.dz = dz;
    });
});