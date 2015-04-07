var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
        date: {type: Date, default: Date.now()},
        file: String,
        material: String,
        name: String,
        contact: String,
        comment: String,
        qty: Number,
        price: Number
    });
    
var Order = mongoose.model('Order', orderSchema);

module.exports = Order;