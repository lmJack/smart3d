var mongoose = require('mongoose');

var printerSchema = mongoose.Schema({
        date: {type: Date, default: Date.now()},
        views: Number,
        name: String,
        desc: String,
        meta: {
                title: String,
                desc: String,
                keywords: String
        },
        pics: [String],
        thumbs: [String],
        printpics: [String],
        printthumbs: [String],
        dot: Number,
        layer: Number,
        materials: [String],
        vendor: String,
        country: String,
        usages:[String],
        video: String,
        vol: {
                h: Number,
                w: Number,
                d: Number
        }
    });
    
var Printer = mongoose.model('Printer', printerSchema);

module.exports = Printer;