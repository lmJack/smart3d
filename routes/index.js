var express = require('express');
var router = express.Router();
var Material = require('../models/Material.js');
var Printer = require('../models/Printer.js');
var Model3d = require('../models/3dmodel.js');
var Busboy = require('busboy');
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
    
    function getItems(cb) {
        Material.find({}, function(err, mat) {
            if (!err) {
                Printer.find({}, function(err, prn) {
                    if (!err) {
                        Model3d.find({}, function(err, thngs) {
                            if (!err) {
                                cb(mat, prn, thngs);
                            }
                        });
                    }
                });
            }
        });
    }
    
    getItems(function(mat, prn, thngs) {
       res.render('index', { printers: prn, materials: mat, things: thngs}); 
    });
});

router.get('/models/:id', function(req, res, next) {
    Model3d.findOne({id: req.params.id}, function(err, thng) {
        if (!err && thng) {
            Material.find({}, function(err, mtrls) {
                if (!err) res.render('3dmodel', {thng: thng, mtrls: mtrls});
            });
        }
    });
});

router.get('/models', function(req, res, next) {
    Model3d.find({}, function(err, thngs) {
        if (!err && thngs) {
            res.render('3dmodels', {thngs: thngs});
        }
    });
});

router.post('/order', function(req, res, next) {
    var busboy = new Busboy({ headers: req.headers });
    var transporter = nodemailer.createTransport(), data = {};
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('File: ' + filename);
        file.on('end', function() {
            transporter.sendMail({
                from: 'Smart3d',
                to: 'print@ideasolid.ru',
                subject: 'Заказ на печать',
                text: 'Имя: ' + data.name + ' Контакт: ' + data.contact + ' Материалы: ' + data.positions,
                attachments: {
                    filename: filename,
                    content: file
                }
            });
        });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
      console.log('Field [' + fieldname + ']: value: ' + val);
      data[fieldname] = val;
    });
    busboy.on('finish', function() {
        console.log('Done parsing form!');
    });
    req.pipe(busboy);
    res.end();
});

module.exports = router;
