var mongoose = require('mongoose');

var thingSchema = mongoose.Schema({
        date: {type: Date, default: Date.now()},
        views: Number,
        name: String,
        price: Number,
        url: String,
        category: [String],
        meta: {
                title: String,
                desc: String,
                keywords: String
        },
        frontpic: String,
        pics: [String],
        files: [{
                name: String,
                id: String, 
                vol: Number,
                pic: String
        }],
        thumbs: [String],
        material: String,
        id: String
    });
    
var model3d = mongoose.model('3dmodel', thingSchema);

module.exports = model3d;