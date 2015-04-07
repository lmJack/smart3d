window.Cart = {
    init: function() {
        if (typeof(Storage) !== "undefined") {
            var cart = JSON.parse(sessionStorage.getItem('cart'));
            this.positions = cart;
        } else {
            alert('Браузер не поддерживает сессии.');
        }        
    },
    
    files: [],
    
    positions: [],
    
    plus1: function(ind) {
        /*this.positions.forEach(function(el, ind) {
           if (el.material === material) {
               el.count++;
           }
        });*/
        this.positions[ind].count++;
        this.onUpdate();
    },
    
    minus1: function(ind) {
        /*this.positions.forEach(function(el, ind) {
           if (el.material === material) {
               el.count--;
           }
        });*/
        this.positions[ind].count--;
        this.onUpdate();
    },
    
    delete: function(ind) {
        /*this.positions.forEach(function(el, ind) {
           if (el.material === material) {
               this.positions.splice(ind, 1);
           }  
        });*/
        this.positions.splice(ind,1);
        this.onUpdate();
    }, 
    
    add: function(file, material, count, price) {
        var foundfile = false, foundmaterial = false;
        if (this.files[file]) {
            foundfile = true;
        for (var _material in this.files[file]) {
            if (_material === material) {
                foundmaterial = true;
                _material.count = +count;
                _material.price = +price;
                _material.subtotal = +count*price;
            }
        };
        }
		/*this.files.forEach(function(el, ind) {
			if (el === file) {
				found = true;
				el.materials[material].count += +count;
				el.materials[material].subtotal += count*price;
				el.subtotal += count*price;
			}
		});*/
		if (!foundfile) {
		    this.files[file] = {};
		    this.files[file][material] = {count: count, price: price, subtotal: +count*price};
		} else {
		    if (!foundmaterial) {
		        this.files[file][material] = {count: count, price: price, subtotal: +count*price};
		    } else {
		        this.files[file][material].count += +count;
			    this.files[file][material].subtotal += +count*price;
		    }
		}
		this.total += count*price;
        this.onUpdate();
    },
    
    onUpdate: function() {
        sessionStorage.setItem('cart', JSON.stringify(this.positions));
        var html = '';
        //this.files.forEach(function(el, ind) {
        for (var _file in this.files) {
            html += '<div class="row"><h2>' + _file +'</h2>';
            for (var el in _file) {
                html += '<div class="row"><div class="col-md-3">' + el + '<button type="button" class="close" onClick="Cart.delete(' + ind + ')"><span>&times;</span></button></div><div class="col-md-3"><button class="btn btn-primary btn-xs" onClick="Cart.minus1(' + ind + ')">-</button>' + el.count + ' <button class="btn btn-primary btn-xs" onClick="Cart.plus1(' + ind + ')">+</button> шт.</div><div class="col-md-3">' + el.price + '</div><div class="col-md-3">' + el.subtotal + '</div></div>'
            }
        };
        $("#cart").html('<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-shopping-cart"></span>' + Cart.count() + '</a>');
        $("#submenu").html(html + ' <button class="btn btn-primary">Отправить</button></ul>');
    },
    
    count: function() {
        var count = 0;
        this.positions.forEach(function(el, ind) {
           count += +el.count; 
        });
        return count;
    }
};

Cart.init();