var mongoose = require('mongoose');

var materialSchema = mongoose.Schema({
    name: String,
    frontpic: String,
    pics: [String],
    thumbs: [String],
    price: Number,
    desc: String,
    views: Number
});
    
var Material = mongoose.model('Material', materialSchema);

module.exports = Material;