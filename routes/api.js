var express = require('express');
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var Material = require('../models/Material.js');
var Printer = require('../models/Printer.js');
var Model3d = require('../models/3dmodel.js');
var Order = require('../models/Order.js');
var Busboy = require('busboy');
var fs = require("fs");
var lwip = require('lwip');
var path = require('path');
var Imagemin = require('imagemin');
var rimraf = require('rimraf');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

function thingiParse(id) {
  Model3d.findOne({id: id}, function(err, thing) {
    if (!err && !thing) {
      request('http://www.thingiverse.com/thing:' + id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          $ = cheerio.load(body);
          var thing = new Model3d({id: id});
          console.log('async parallel');
          async.parallel([
            function(cb) {
            var lgth = $('.thing-gallery-thumb').length;
            $('.thing-gallery-thumb').each(function(ind, el) {
              thing.pics.push($(el).data('large-url'));
              thing.thumbs.push($(el).data('thumb-url'));
              if (!--lgth) cb();
            });
            },
            function(cb1) {
            var lgth = $('.thing-file-download-link').length;
            $('.thing-file-download-link').each(function(ind, el) {
              var fileId = $(el).data('file-id'), stl = {}, name = $(el).find('.filename').text(), pic = $(el).find('img').attr('src');
              console.log('async series');
              async.series([
                function(cb2) {
                  request({url: 'http://www.thingiverse.com/download:' + fileId, encoding: null}, function(error, response, body) {
                      var buf = new Buffer(body, 'binary');
                      var isAscii = true;
	                    for (var i=0, len=buf.length; i<len; i++) {
		                    if (buf[i] > 127) { isAscii=false; break; }
	                    }
	                    if (isAscii) {
	                      stl = _parseSTLString(buf.toString());
		                    console.log('volume: ' + stl.volume);
		                    cb2();
	                    } else {
	                      stl = _parseSTLBinary(buf);
		                    console.log('volume: ' + stl.volume);
		                    cb2();
	                    }
                  });
                },
                function(cb3) {
                  console.log('pushing file');
                  thing.files.push({id: fileId, vol: stl.volume, name: name, pic: pic});
                  cb3();
                  if (!--lgth) cb1();
                }
              ], function() {
                console.log('series done');
              });
            });
            }], function() {
              thing.save();
              console.log('saved: ' + thing);
              return thing;
            });
        }
      });
    }
  });     
}

function _parseSTLString (stl) {
	var totalVol = 0;
	// yes, this is the regular expression, matching the vertexes
	// it was kind of tricky but it is fast and does the job
	var vertexes = stl.match(/facet\s+normal\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+outer\s+loop\s+vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+endloop\s+endfacet/g);
  
  if (vertexes) {
  
	vertexes.forEach(function (vert) {
		var preVertexHolder = new VertexHolder();
		vert.match(/vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s/g).forEach(function (vertex, i) {
			var tempVertex = vertex.replace('vertex', '').match(/[-+]?[0-9]*\.?[0-9]+/g);
			var preVertex = new Vertex(tempVertex[0],tempVertex[1],tempVertex[2]);
			preVertexHolder['vert'+(i+1)] = preVertex;
		});
		var partVolume = _triangleVolume(preVertexHolder);
		totalVol += Number(partVolume);
	});
	
  }

	var volumeTotal = Math.abs(totalVol)/1000;
	return {
		volume: volumeTotal, 		// cubic cm
		weight: volumeTotal * 1.04	// gm
	}
}

function Vertex (v1,v2,v3) {
	this.v1 = Number(v1);
	this.v2 = Number(v2);
	this.v3 = Number(v3);
}

// Vertex Holder
function VertexHolder (vertex1,vertex2,vertex3) {
	this.vert1 = vertex1;
	this.vert2 = vertex2;
	this.vert3 = vertex3;
}

// transforming a Node.js Buffer into a V8 array buffer
function _toArrayBuffer (buffer) {
	var 
	ab = new ArrayBuffer(buffer.length),
	view = new Uint8Array(ab);
	
	for (var i = 0; i < buffer.length; ++i) {
		view[i] = buffer[i];
	}
	return ab;
}

// calculation of the triangle volume
// source: http://stackoverflow.com/questions/6518404/how-do-i-calculate-the-volume-of-an-object-stored-in-stl-files
function _triangleVolume (vertexHolder) {
	var 
	v321 = Number(vertexHolder.vert3.v1 * vertexHolder.vert2.v2 * vertexHolder.vert1.v3),
	v231 = Number(vertexHolder.vert2.v1 * vertexHolder.vert3.v2 * vertexHolder.vert1.v3),
	v312 = Number(vertexHolder.vert3.v1 * vertexHolder.vert1.v2 * vertexHolder.vert2.v3),
	v132 = Number(vertexHolder.vert1.v1 * vertexHolder.vert3.v2 * vertexHolder.vert2.v3),
	v213 = Number(vertexHolder.vert2.v1 * vertexHolder.vert1.v2 * vertexHolder.vert3.v3),
	v123 = Number(vertexHolder.vert1.v1 * vertexHolder.vert2.v2 * vertexHolder.vert3.v3);
	return Number(1.0/6.0)*(-v321 + v231 + v312 - v132 - v213 + v123);
}


// parsing an STL Binary File
// (borrowed some code from here: https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/STLLoader.js)
function _parseSTLBinary (buf) {
	buf = _toArrayBuffer(buf);

	var headerLength = 80;
	var dataOffset = 84;
	var faceLength = 12*4 + 2;

	var le = true; // is little-endian

	var dvTriangleCount = new DataView(buf, headerLength, 4);
	var numTriangles = dvTriangleCount.getUint32(0, le);
	var totalVol = 0;

	for (var i = 0; i < numTriangles; i++) {
		var dv = new DataView(buf, dataOffset + i*faceLength, faceLength);
		var normal = new Vertex(dv.getFloat32(0, le), dv.getFloat32(4, le), dv.getFloat32(8, le));
		var vertHolder = new VertexHolder();
		for(var v = 3; v < 12; v+=3) {
			var vert = new Vertex(dv.getFloat32(v*4, le), dv.getFloat32((v+1)*4, le), dv.getFloat32( (v+2)*4, le ) );
			vertHolder['vert'+(v/3)] = vert;
		}
		totalVol += _triangleVolume(vertHolder);
	}

	var volumeTotal = Math.abs(totalVol)/1000;
	return {
		volume: volumeTotal,		// cubic cm
		weight: volumeTotal * 1.04	// gm
	};
}

passport.use('local', new LocalStrategy(
  function(username, password, done) {
      if (username === "admin" && password === "000000") {
          return done(null, 'admin');
      } else {
          return done(null, false, { message: 'Incorrect credentials' });
      }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// --------Materials-----------

router.get('/materials', function(req, res, next) {
    Material.find({}, function(err, materials) {
      if (!err) {
        res.send( JSON.stringify(materials));
      } else {
        console.log('error:');
        console.log(err);
      }
    });
});

router.get('/materials/:name', function(req, res, next) {
    Material.findOne({name: req.params.name}, function(err, material) {
      if (!err) {
        res.send( JSON.stringify(material));
      } else {
        console.log('error:');
        console.log(err);
      }
    });
});

router.get('/materials/printer/:name', function(req, res, next) {
    Printer.findOne({name: req.params.name}, function(err, printer) {
      if (!err && printer) {
        var mtrls = [],
        send = function(mtrls) {
          res.send(JSON.stringify(mtrls));
        };
        printer.materials.forEach(function(el, ind) {
          Material.findOne({name: el}, function(err, mtrl) {
            if (!err && mtrl) {
              mtrls.push(mtrl);
              if (ind === (printer.materials.length - 1)) {
                send(mtrls);
              }
            }
          });
        });
      } else {
        console.log('error:');
        console.log(err);
      }
    });
});

router.delete('/materials/:id', function(req, res) {
  Material.findById(req.params.id, function(err, material) {
      if (!err&&material) {
        if (fs.existsSync("./public/img/" + material.name)&&(material.name!='')) {
          rimraf("./public/img/" + material.name, function(err) {
            if (err) console.log(err);
          });        
        }
        material.remove();
        res.sendStatus(200);
      }
  });
});

router.post('/materials', function(req, res) {
  if (req.isAuthenticated()) {
    var body = req.body,
    mtrl = new Material({
      name: body.name,
      price: body.price,
      desc: body.desc,
      props: JSON.parse(body.props)
    });
    mtrl.save(function(err, mt) {
      err ? console.log(err) : (function() {console.log("saved: " + mt._id); res.send(mt._id.toString())})();
    });
  } else {
    res.redirect('/admin/login');
  };
});

router.post('/materials/addPic/:id', function(req, res) {
  Material.findById(req.params.id, function(err, material) {
    if (!err&&material) {
      var busboy = new Busboy({ headers: req.headers }), files = material.pics, thumbs = material.thumbs;
      req.pipe(busboy);
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        if (!fs.existsSync("./public/img/" + material.name)) {
          fs.mkdirSync("./public/img/" + material.name);
        }
        if (!fs.existsSync("./public/img/" + material.name + "/thumbs")) {
          fs.mkdirSync("./public/img/" + material.name + "/thumbs");
        }
        var saveTo = "./public/img/" + material.name + "/" + filename;
        file.pipe(fs.createWriteStream(saveTo));
        file.on('end', function() {
          console.log("file end");
          lwip.open(saveTo, function(err, image){
            if (!err ) {
              var h = 300, w = image.width()/(image.height()/h);
                image.resize(w, h, function(err, image) {
                  if (!err) {
                    if (!fs.existsSync("./public/img/" + material.name + "/tmp")) {
                      fs.mkdirSync("./public/img/" + material.name + "/tmp");
                    }
                    console.log('material: ' + material.name);
                    console.log('file: ' + filename);
                    image.writeFile(path.join("./public/img/", material.name.toString(), '/tmp/', filename), function(err) {
                      if (err) {
                        console.log(err);
                      } else {
                        material.pics.push("/img/" + material.name + "/" + filename);
                        material.save(function(err) {
                              if (!err) {
                                console.log('saved pic');
                              } else {
                                console.log(err);
                              }
                            });
                        var imagemin = new Imagemin()
                          .src(path.join("./public/img/", material.name, '/tmp/', filename))
                          .dest(path.join("./public/img/", material.name, "/thumbs/"));
                        switch (filename.split('.')[filename.split('.').length - 1]) { 
                          case 'jpg': 
                            imagemin.use(Imagemin.jpegtran({ progressive: true }));
                            break;
                          case 'png':
                            imagemin.use(Imagemin.optipng({ optimizationLevel: 3 }));
                            break;
                        }
                        imagemin.run(function(err, file) {
                          if (!err) {
                            material.thumbs.push("/img/" + material.name + "/thumbs/" + filename);
                            material.save(function(err) {
                              if (!err) {
                                console.log('saved thumb');
                              } else {
                                console.log(err);
                              }
                            });
                            console.log('image minified');
                            fs.unlink(path.join("./public/img/", material.name, '/tmp/', filename), function(err) {
                              if (!err) {
                                console.log('old image deleted');
                                fs.rmdir(path.join("./public/img/", material.name, '/tmp/'));
                              } else {
                                console.log('fs unlink error: ' + err);
                              }
                            });
                          } else {
                            console.log("imagemin error: " + err);
                          }
                        });
                      }
                    });
                  } else {
                    console.log('resize error: ' + err);
                  }
                });
            } else {
              console.log('lwip open error: ' + err);
            }
          });
        });
      });
      busboy.on('finish', function() {
        console.log("busboy finish");
        res.writeHead(200, { 'Connection': 'close' });
        res.end("That's all folks!");
      });
    }
  });
});


// -------- Printers -----------



router.get('/printers', function(req, res, next) {
    Printer.find({}, function(err, printers) {
      if (!err) {
        req.isAuthenticated() ? res.send( JSON.stringify(printers)) : res.redirect('/admin/login');
      } else {
        console.log('error:');
        console.log(err);
      }
    });
});

router.delete('/printers/:id', function(req, res) {
  Printer.findById(req.params.id, function(err, printer) {
      if (!err&&printer) {
        if (fs.existsSync("./public/img/" + printer.name)&&(printer.name!='')) {
          rimraf("./public/img/" + printer.name, function(err) {
            if (err) console.log(err);
          });        
        }
        printer.remove();
        res.sendStatus(200);
      }
  });
});

router.post('/printers', function(req, res) {
  if (req.isAuthenticated()) {
    var body = req.body,
    prntr = new Printer({
      name: body.name,
      materials: JSON.parse(body.materials),
      desc: body.desc,
      layer: body.layer,
      dot: body.dot,
      vol: JSON.parse(body.vol)
    });
    console.log('materials: ' + body.materials);
    prntr.save(function(err, mt) {
      err ? console.log(err) : (function() {console.log("saved: " + mt._id); res.send(mt._id.toString())})();
    });
  } else {
    res.redirect('/admin/login');
  };
});

router.post('/printers/addPic/:id', function(req, res) {
  Printer.findById(req.params.id, function(err, printer) {
    if (!err&&printer) {
      var busboy = new Busboy({ headers: req.headers });
      req.pipe(busboy);
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        if (!fs.existsSync("./public/img/" + printer.name)) {
          fs.mkdirSync("./public/img/" + printer.name);
        }
        if (!fs.existsSync("./public/img/" + printer.name + "/thumbs")) {
          fs.mkdirSync("./public/img/" + printer.name + "/thumbs");
        }
        var saveTo = "./public/img/" + printer.name + "/" + filename;
        file.pipe(fs.createWriteStream(saveTo));
        file.on('end', function() {
          console.log("file end");
          lwip.open(saveTo, function(err, image){
            if (!err ) {
              var h = 300, w = image.width()/(image.height()/h);
                image.resize(w, h, function(err, image) {
                  if (!err) {
                    if (!fs.existsSync("./public/img/" + printer.name + "/tmp")) {
                      fs.mkdirSync("./public/img/" + printer.name + "/tmp");
                    }
                    console.log('printer: ' + printer.name);
                    console.log('file: ' + filename);
                    image.writeFile(path.join("./public/img/", printer.name.toString(), '/tmp/', filename), function(err) {
                      if (err) {
                        console.log(err);
                      } else {
                        printer.pics.push("/img/" + printer.name + "/" + filename);
                        printer.save(function(err) {
                              if (!err) {
                                console.log('saved pic');
                              } else {
                                console.log(err);
                              }
                            });
                        var imagemin = new Imagemin()
                          .src(path.join("./public/img/", printer.name, '/tmp/', filename))
                          .dest(path.join("./public/img/", printer.name, "/thumbs/"));
                        switch (filename.split('.')[filename.split('.').length - 1]) { 
                          case 'jpg': 
                            imagemin.use(Imagemin.jpegtran({ progressive: true }));
                            break;
                          case 'png':
                            imagemin.use(Imagemin.optipng({ optimizationLevel: 3 }));
                            break;
                        }
                        imagemin.run(function(err, file) {
                          if (!err) {
                            printer.thumbs.push("/img/" + printer.name + "/thumbs/" + filename);
                            printer.save(function(err) {
                              if (!err) {
                                console.log('saved thumb');
                              } else {
                                console.log(err);
                              }
                            });
                            console.log('image minified');
                            fs.unlink(path.join("./public/img/", printer.name, '/tmp/', filename), function(err) {
                              if (!err) {
                                console.log('old image deleted');
                                fs.rmdir(path.join("./public/img/", printer.name, '/tmp/'));
                              } else {
                                console.log('fs unlink error: ' + err);
                              }
                            });
                          } else {
                            console.log("imagemin error: " + err);
                          }
                        });
                      }
                    });
                  } else {
                    console.log('resize error: ' + err);
                  }
                });
            } else {
              console.log('lwip open error: ' + err);
            }
          });
        });
      });
      busboy.on('finish', function() {
        console.log("busboy finish");
        res.writeHead(200, { 'Connection': 'close' });
        res.end("That's all folks!");
      });
    }
  });
});

router.post('/printers/addPrint/:id', function(req, res) {
  Printer.findById(req.params.id, function(err, printer) {
    if (!err&&printer) {
      var busboy = new Busboy({ headers: req.headers });
      req.pipe(busboy);
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        if (!fs.existsSync("./public/img/" + printer.name)) {
          fs.mkdirSync("./public/img/" + printer.name);
        }
        if (!fs.existsSync("./public/img/" + printer.name + "/prints")) {
          fs.mkdirSync("./public/img/" + printer.name + "/prints");
        }
        if (!fs.existsSync("./public/img/" + printer.name  + "/prints" + "/thumbs")) {
          fs.mkdirSync("./public/img/" + printer.name + "/prints" + "/thumbs");
        }
        var saveTo = "./public/img/" + printer.name  + "/prints/" + filename;
        file.pipe(fs.createWriteStream(saveTo));
        file.on('end', function() {
          console.log("file end");
          lwip.open(saveTo, function(err, image){
            if (!err ) {
              var h = 400, w = image.width()/(image.height()/h);
                image.resize(w, h, function(err, image) {
                  if (!err) {
                    if (!fs.existsSync("./public/img/" + printer.name  + "/prints" + "/tmp")) {
                      fs.mkdirSync("./public/img/" + printer.name  + "/prints" + "/tmp");
                    }
                    console.log('printer: ' + printer.name);
                    console.log('file: ' + filename);
                    image.writeFile(path.join("./public/img/", printer.name.toString(),  '/prints/tmp/', filename), function(err) {
                      if (err) {
                        console.log(err);
                      } else {
                        printer.printpics.push("/img/" + printer.name + "/prints/" + filename);
                        printer.save(function(err) {
                              if (!err) {
                                console.log('saved pic');
                              } else {
                                console.log(err);
                              }
                            });
                        var imagemin = new Imagemin()
                          .src(path.join("./public/img/", printer.name, '/prints/tmp/', filename))
                          .dest(path.join("./public/img/", printer.name, "/prints/thumbs/"));
                        switch (filename.split('.')[filename.split('.').length - 1]) { 
                          case 'jpg': 
                            imagemin.use(Imagemin.jpegtran({ progressive: true }));
                            break;
                          case 'png':
                            imagemin.use(Imagemin.optipng({ optimizationLevel: 3 }));
                            break;
                        }
                        imagemin.run(function(err, file) {
                          if (!err) {
                            printer.printthumbs.push("/img/" + printer.name + "/prints/thumbs/" + filename);
                            printer.save(function(err) {
                              if (!err) {
                                console.log('saved thumb');
                              } else {
                                console.log(err);
                              }
                            });
                            console.log('image minified');
                            fs.unlink(path.join("./public/img/", printer.name, '/prints/tmp/', filename), function(err) {
                              if (!err) {
                                console.log('old image deleted');
                                fs.rmdir(path.join("./public/img/", printer.name, '/prints/tmp/'));
                              } else {
                                console.log('fs unlink error: ' + err);
                              }
                            });
                          } else {
                            console.log("imagemin error: " + err);
                          }
                        });
                      }
                    });
                  } else {
                    console.log('resize error: ' + err);
                  }
                });
            } else {
              console.log('lwip open error: ' + err);
            }
          });
        });
      });
      busboy.on('finish', function() {
        console.log("busboy finish");
        res.writeHead(200, { 'Connection': 'close' });
        res.end("That's all folks!");
      });
    }
  });
});


// --------3dmodels-----------


router.get('/3dmodels', function(req, res, next) {
    Model3d.find({}, function(err, models) {
      if (!err) {
        req.isAuthenticated() ? res.send( JSON.stringify(models)) : res.redirect('/admin/login');
      } else {
        console.log('error:');
        console.log(err);
      }
    });
});

router.delete('/3dmodels/:id', function(req, res) {
  Model3d.findById(req.params.id, function(err, model) {
      if (!err&&model) {
        if (fs.existsSync("./public/img/" + model.name)&&(model.name!='')) {
          rimraf("./public/img/" + model.name, function(err) {
            if (err) console.log(err);
          });        
        }
        model.remove();
        res.sendStatus(200);
      }
  });
});

router.get('/models/:id', function(req, res) {
  Model3d.findOne({id: req.params.id}, function(err, thng) {
      if (!err && thng) {
        console.log('thing found');
      } else {
        console.log('thing not found');
        thng ? console.log('error: ' + err) : thingiParse(req.params.id);
        res.end();
      }
  });
});

router.post('/order', function(req, res) {
  var order = new Order({
    material: req.body.material,
    name: req.body.name,
    contact: req.body.contact,
    comment: req.body.comment,
    qty: req.body.qty
  });
  order.save(function(err, rdr) {
    err ? console.log(err) : (function() {console.log("saved: " + rdr._id); res.send(rdr._id.toString())})();
  });
});

router.post('/order/:id/savefile', function(req, res) {
  Order.findById(req.params.id, function(err, order) {
    if (!err && order) {
      var busboy = new Busboy({ headers: req.headers });
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        if (!fs.existsSync("./orders/")) {
          fs.mkdirSync("./orders/");
        }
        if (!fs.existsSync("./orders/" + order._id)) {
          fs.mkdirSync("./orders/" + order._id);
        }
        var saveTo = "./orders/" + order._id  + "/" + filename;
        file.pipe(fs.createWriteStream(saveTo));
        file.on('end', function() {
          console.log("saved: " + filename);
          order.file = filename;
          order.save();
        });
      });
      busboy.on('finish', function() {
        console.log("busboy finish");
        res.writeHead(200, { 'Connection': 'close' });
        res.end("That's all folks!");
      });
      req.pipe(busboy);  
    }
  });
});

router.delete('/order/:id', function(req, res) {
  Order.findById(req.params.id, function(err, order) {
      if (!err&&order) {
        if (fs.existsSync("./orders/" + order._id)) {
          rimraf("./orders/" + order._id, function(err) {
            if (err) console.log(err);
          });        
        }
        order.remove();
        res.sendStatus(200);
      }
  });
});

module.exports = router;