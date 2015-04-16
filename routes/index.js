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

router.get('/materials', function(req, res, next) {
    Material.find({}, function(err, mtrls) {
        if (err) {
            console.log(err);
            res.end();
        } else {
            if (mtrls) {
                res.render('materials', {mtrls: mtrls}); 
            }
        }
    });
});

router.get('/materials/:name', function(req, res, next) {
    Material.findOne({name: req.params.name}, function(err, mtrl) {
        if (err) {
            console.log(err);
            res.end();
        } else {
            if (mtrl) {
                Printer.find({materials: mtrl.name}, function(err, prntrs) {
                    if (err) {
                        console.log(err);
                        res.end();
                    } else {
                        res.render('material', {mtrl: mtrl, prntrs: prntrs});    
                    }
                });
            }
        }
    });
});

router.get('/3dprinters', function(req, res, next) {
    Printer.find({}, function(err, prntrs) {
        if (err) {
            console.log(err);
            res.end();
        } else {
            if (prntrs) {
                res.render('3dprinters', {prntrs: prntrs}); 
            }
        }
    });
});

router.get('/3dprinters/:name', function(req, res, next) {
    Printer.findOne({name: req.params.name}, function(err, prntr) {
        if (err) {
            console.log(err);
            res.end();
        } else {
            if (prntr) {
                Material.find({name: {$in: prntr.materials}}, function(err, mtrls) {
                    if (err) {
                        console.log(err);
                        res.end();
                    } else {
                            res.render('3dprinter', {mtrls: mtrls, prntr: prntr});
                    }
                });
            }
        }
    });
});

router.get('/3dmodels/:id', function(req, res, next) {
    Model3d.findOne({id: req.params.id}, function(err, thng) {
        if (!err && thng) {
            Material.find({}, function(err, mtrls) {
                if (!err) res.render('3dmodel', {thng: thng, mtrls: mtrls});
            });
        }
    });
});

router.get('/3dmodels', function(req, res, next) {
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
