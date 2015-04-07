var mongoose = require('mongoose');

var materialSchema = mongoose.Schema({
    name: String,
    frontpic: String,
    pics: [String],
    thumbs: [String],
    price: Number,
    desc: String,
    views: Number,
    props: [{
        name: String,
        value: Number,
        units: String
    }]
});
    
var Material = mongoose.model('Material', materialSchema);

module.exports = Material;