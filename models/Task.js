var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
        date: {type: Date, default: Date.now()},
        pics: [String],
        name: String,
        contact: String,
        desc: String
    });
    
var Order = mongoose.model('Order', orderSchema);

module.exports = Order;