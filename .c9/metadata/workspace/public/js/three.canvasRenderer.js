{"filter":false,"title":"three.canvasRenderer.js","tooltip":"/public/js/three.canvasRenderer.js","undoManager":{"mark":0,"position":0,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":1097,"column":2},"action":"insert","lines":["/**"," * @author mrdoob / http://mrdoob.com/"," */","","THREE.SpriteCanvasMaterial = function ( parameters ) {","","\tTHREE.Material.call( this );","","\tthis.type = 'SpriteCanvasMaterial';","","\tthis.color = new THREE.Color( 0xffffff );","\tthis.program = function ( context, color ) {};","","\tthis.setValues( parameters );","","};","","THREE.SpriteCanvasMaterial.prototype = Object.create( THREE.Material.prototype );","THREE.SpriteCanvasMaterial.prototype.constructor = THREE.SpriteCanvasMaterial;","","THREE.SpriteCanvasMaterial.prototype.clone = function () {","","\tvar material = new THREE.SpriteCanvasMaterial();","","\tTHREE.Material.prototype.clone.call( this, material );","","\tmaterial.color.copy( this.color );","\tmaterial.program = this.program;","","\treturn material;","","};","","//","","THREE.CanvasRenderer = function ( parameters ) {","","\tconsole.log( 'THREE.CanvasRenderer', THREE.REVISION );","","\tvar smoothstep = THREE.Math.smoothstep;","","\tparameters = parameters || {};","","\tvar _this = this,","\t_renderData, _elements, _lights,","\t_projector = new THREE.Projector(),","","\t_canvas = parameters.canvas !== undefined","\t\t\t ? parameters.canvas","\t\t\t : document.createElement( 'canvas' ),","","\t_canvasWidth = _canvas.width,","\t_canvasHeight = _canvas.height,","\t_canvasWidthHalf = Math.floor( _canvasWidth / 2 ),","\t_canvasHeightHalf = Math.floor( _canvasHeight / 2 ),","","\t_viewportX = 0,","\t_viewportY = 0,","\t_viewportWidth = _canvasWidth,","\t_viewportHeight = _canvasHeight,","","\tpixelRatio = 1,","","\t_context = _canvas.getContext( '2d', {","\t\talpha: parameters.alpha === true","\t} ),","","\t_clearColor = new THREE.Color( 0x000000 ),","\t_clearAlpha = parameters.alpha === true ? 0 : 1,","","\t_contextGlobalAlpha = 1,","\t_contextGlobalCompositeOperation = 0,","\t_contextStrokeStyle = null,","\t_contextFillStyle = null,","\t_contextLineWidth = null,","\t_contextLineCap = null,","\t_contextLineJoin = null,","\t_contextLineDash = [],","","\t_camera,","","\t_v1, _v2, _v3, _v4,","\t_v5 = new THREE.RenderableVertex(),","\t_v6 = new THREE.RenderableVertex(),","","\t_v1x, _v1y, _v2x, _v2y, _v3x, _v3y,","\t_v4x, _v4y, _v5x, _v5y, _v6x, _v6y,","","\t_color = new THREE.Color(),","\t_color1 = new THREE.Color(),","\t_color2 = new THREE.Color(),","\t_color3 = new THREE.Color(),","\t_color4 = new THREE.Color(),","","\t_diffuseColor = new THREE.Color(),","\t_emissiveColor = new THREE.Color(),","","\t_lightColor = new THREE.Color(),","","\t_patterns = {},","","\t_image, _uvs,","\t_uv1x, _uv1y, _uv2x, _uv2y, _uv3x, _uv3y,","","\t_clipBox = new THREE.Box2(),","\t_clearBox = new THREE.Box2(),","\t_elemBox = new THREE.Box2(),","","\t_ambientLight = new THREE.Color(),","\t_directionalLights = new THREE.Color(),","\t_pointLights = new THREE.Color(),","","\t_vector3 = new THREE.Vector3(), // Needed for PointLight","\t_centroid = new THREE.Vector3(),","\t_normal = new THREE.Vector3(),","\t_normalViewMatrix = new THREE.Matrix3();","","\t// dash+gap fallbacks for Firefox and everything else","","\tif ( _context.setLineDash === undefined ) {","","\t\t_context.setLineDash = function () {}","","\t}","","\tthis.domElement = _canvas;","","\tthis.autoClear = true;","\tthis.sortObjects = true;","\tthis.sortElements = true;","","\tthis.info = {","","\t\trender: {","","\t\t\tvertices: 0,","\t\t\tfaces: 0","","\t\t}","","\t}","","\t// WebGLRenderer compatibility","","\tthis.supportsVertexTextures = function () {};","\tthis.setFaceCulling = function () {};","","\t//","","\tthis.getPixelRatio = function () {","","\t\treturn pixelRatio;","","\t};","","\tthis.setPixelRatio = function ( value ) {","","\t\tpixelRatio = value;","","\t};","","\tthis.setSize = function ( width, height, updateStyle ) {","","\t\t_canvasWidth = width * pixelRatio;","\t\t_canvasHeight = height * pixelRatio;","","\t\t_canvas.width = _canvasWidth;","\t\t_canvas.height = _canvasHeight;","","\t\t_canvasWidthHalf = Math.floor( _canvasWidth / 2 );","\t\t_canvasHeightHalf = Math.floor( _canvasHeight / 2 );","","\t\tif ( updateStyle !== false ) {","","\t\t\t_canvas.style.width = width + 'px';","\t\t\t_canvas.style.height = height + 'px';","","\t\t}","","\t\t_clipBox.min.set( -_canvasWidthHalf, -_canvasHeightHalf ),","\t\t_clipBox.max.set(   _canvasWidthHalf,   _canvasHeightHalf );","","\t\t_clearBox.min.set( - _canvasWidthHalf, - _canvasHeightHalf );","\t\t_clearBox.max.set(   _canvasWidthHalf,   _canvasHeightHalf );","","\t\t_contextGlobalAlpha = 1;","\t\t_contextGlobalCompositeOperation = 0;","\t\t_contextStrokeStyle = null;","\t\t_contextFillStyle = null;","\t\t_contextLineWidth = null;","\t\t_contextLineCap = null;","\t\t_contextLineJoin = null;","","\t\tthis.setViewport( 0, 0, width, height );","","\t};","","\tthis.setViewport = function ( x, y, width, height ) {","","\t\t_viewportX = x * pixelRatio;","\t\t_viewportY = y * pixelRatio;","","\t\t_viewportWidth = width * pixelRatio;","\t\t_viewportHeight = height * pixelRatio;","","\t};","","\tthis.setScissor = function () {};","\tthis.enableScissorTest = function () {};","","\tthis.setClearColor = function ( color, alpha ) {","","\t\t_clearColor.set( color );","\t\t_clearAlpha = alpha !== undefined ? alpha : 1;","","\t\t_clearBox.min.set( - _canvasWidthHalf, - _canvasHeightHalf );","\t\t_clearBox.max.set(   _canvasWidthHalf,   _canvasHeightHalf );","","\t};","","\tthis.setClearColorHex = function ( hex, alpha ) {","","\t\tconsole.warn( 'THREE.CanvasRenderer: .setClearColorHex() is being removed. Use .setClearColor() instead.' );","\t\tthis.setClearColor( hex, alpha );","","\t};","","\tthis.getClearColor = function () {","","\t\treturn _clearColor;","","\t};","","\tthis.getClearAlpha = function () {","","\t\treturn _clearAlpha;","","\t};","","\tthis.getMaxAnisotropy = function () {","","\t\treturn 0;","","\t};","","\tthis.clear = function () {","","\t\tif ( _clearBox.empty() === false ) {","","\t\t\t_clearBox.intersect( _clipBox );","\t\t\t_clearBox.expandByScalar( 2 );","","\t\t\t_clearBox.min.x = _clearBox.min.x + _canvasWidthHalf;","\t\t\t_clearBox.min.y =  - _clearBox.min.y + _canvasHeightHalf;\t\t// higher y value !","\t\t\t_clearBox.max.x = _clearBox.max.x + _canvasWidthHalf;","\t\t\t_clearBox.max.y =  - _clearBox.max.y + _canvasHeightHalf;\t\t// lower y value !","","\t\t\tif ( _clearAlpha < 1 ) {","","\t\t\t\t_context.clearRect(","\t\t\t\t\t_clearBox.min.x | 0,","\t\t\t\t\t_clearBox.max.y | 0,","\t\t\t\t\t( _clearBox.max.x - _clearBox.min.x ) | 0,","\t\t\t\t\t( _clearBox.min.y - _clearBox.max.y ) | 0","\t\t\t\t);","","\t\t\t}","","\t\t\tif ( _clearAlpha > 0 ) {","","\t\t\t\tsetBlending( THREE.NormalBlending );","\t\t\t\tsetOpacity( 1 );","","\t\t\t\tsetFillStyle( 'rgba(' + Math.floor( _clearColor.r * 255 ) + ',' + Math.floor( _clearColor.g * 255 ) + ',' + Math.floor( _clearColor.b * 255 ) + ',' + _clearAlpha + ')' );","","\t\t\t\t_context.fillRect(","\t\t\t\t\t_clearBox.min.x | 0,","\t\t\t\t\t_clearBox.max.y | 0,","\t\t\t\t\t( _clearBox.max.x - _clearBox.min.x ) | 0,","\t\t\t\t\t( _clearBox.min.y - _clearBox.max.y ) | 0","\t\t\t\t);","","\t\t\t}","","\t\t\t_clearBox.makeEmpty();","","\t\t}","","\t};","","\t// compatibility","","\tthis.clearColor = function () {};","\tthis.clearDepth = function () {};","\tthis.clearStencil = function () {};","","\tthis.render = function ( scene, camera ) {","","\t\tif ( camera instanceof THREE.Camera === false ) {","","\t\t\tconsole.error( 'THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.' );","\t\t\treturn;","","\t\t}","","\t\tif ( this.autoClear === true ) this.clear();","","\t\t_this.info.render.vertices = 0;","\t\t_this.info.render.faces = 0;","","\t\t_context.setTransform( _viewportWidth / _canvasWidth, 0, 0, - _viewportHeight / _canvasHeight, _viewportX, _canvasHeight - _viewportY );","\t\t_context.translate( _canvasWidthHalf, _canvasHeightHalf );","","\t\t_renderData = _projector.projectScene( scene, camera, this.sortObjects, this.sortElements );","\t\t_elements = _renderData.elements;","\t\t_lights = _renderData.lights;","\t\t_camera = camera;","","\t\t_normalViewMatrix.getNormalMatrix( camera.matrixWorldInverse );","","\t\t/* DEBUG","\t\tsetFillStyle( 'rgba( 0, 255, 255, 0.5 )' );","\t\t_context.fillRect( _clipBox.min.x, _clipBox.min.y, _clipBox.max.x - _clipBox.min.x, _clipBox.max.y - _clipBox.min.y );","\t\t*/","","\t\tcalculateLights();","","\t\tfor ( var e = 0, el = _elements.length; e < el; e ++ ) {","","\t\t\tvar element = _elements[ e ];","","\t\t\tvar material = element.material;","","\t\t\tif ( material === undefined || material.opacity === 0 ) continue;","","\t\t\t_elemBox.makeEmpty();","","\t\t\tif ( element instanceof THREE.RenderableSprite ) {","","\t\t\t\t_v1 = element;","\t\t\t\t_v1.x *= _canvasWidthHalf; _v1.y *= _canvasHeightHalf;","","\t\t\t\trenderSprite( _v1, element, material );","","\t\t\t} else if ( element instanceof THREE.RenderableLine ) {","","\t\t\t\t_v1 = element.v1; _v2 = element.v2;","","\t\t\t\t_v1.positionScreen.x *= _canvasWidthHalf; _v1.positionScreen.y *= _canvasHeightHalf;","\t\t\t\t_v2.positionScreen.x *= _canvasWidthHalf; _v2.positionScreen.y *= _canvasHeightHalf;","","\t\t\t\t_elemBox.setFromPoints( [","\t\t\t\t\t_v1.positionScreen,","\t\t\t\t\t_v2.positionScreen","\t\t\t\t] );","","\t\t\t\tif ( _clipBox.isIntersectionBox( _elemBox ) === true ) {","","\t\t\t\t\trenderLine( _v1, _v2, element, material );","","\t\t\t\t}","","\t\t\t} else if ( element instanceof THREE.RenderableFace ) {","","\t\t\t\t_v1 = element.v1; _v2 = element.v2; _v3 = element.v3;","","\t\t\t\tif ( _v1.positionScreen.z < - 1 || _v1.positionScreen.z > 1 ) continue;","\t\t\t\tif ( _v2.positionScreen.z < - 1 || _v2.positionScreen.z > 1 ) continue;","\t\t\t\tif ( _v3.positionScreen.z < - 1 || _v3.positionScreen.z > 1 ) continue;","","\t\t\t\t_v1.positionScreen.x *= _canvasWidthHalf; _v1.positionScreen.y *= _canvasHeightHalf;","\t\t\t\t_v2.positionScreen.x *= _canvasWidthHalf; _v2.positionScreen.y *= _canvasHeightHalf;","\t\t\t\t_v3.positionScreen.x *= _canvasWidthHalf; _v3.positionScreen.y *= _canvasHeightHalf;","","\t\t\t\tif ( material.overdraw > 0 ) {","","\t\t\t\t\texpand( _v1.positionScreen, _v2.positionScreen, material.overdraw );","\t\t\t\t\texpand( _v2.positionScreen, _v3.positionScreen, material.overdraw );","\t\t\t\t\texpand( _v3.positionScreen, _v1.positionScreen, material.overdraw );","","\t\t\t\t}","","\t\t\t\t_elemBox.setFromPoints( [","\t\t\t\t\t_v1.positionScreen,","\t\t\t\t\t_v2.positionScreen,","\t\t\t\t\t_v3.positionScreen","\t\t\t\t] );","","\t\t\t\tif ( _clipBox.isIntersectionBox( _elemBox ) === true ) {","","\t\t\t\t\trenderFace3( _v1, _v2, _v3, 0, 1, 2, element, material );","","\t\t\t\t}","","\t\t\t}","","\t\t\t/* DEBUG","\t\t\tsetLineWidth( 1 );","\t\t\tsetStrokeStyle( 'rgba( 0, 255, 0, 0.5 )' );","\t\t\t_context.strokeRect( _elemBox.min.x, _elemBox.min.y, _elemBox.max.x - _elemBox.min.x, _elemBox.max.y - _elemBox.min.y );","\t\t\t*/","","\t\t\t_clearBox.union( _elemBox );","","\t\t}","","\t\t/* DEBUG","\t\tsetLineWidth( 1 );","\t\tsetStrokeStyle( 'rgba( 255, 0, 0, 0.5 )' );","\t\t_context.strokeRect( _clearBox.min.x, _clearBox.min.y, _clearBox.max.x - _clearBox.min.x, _clearBox.max.y - _clearBox.min.y );","\t\t*/","","\t\t_context.setTransform( 1, 0, 0, 1, 0, 0 );","","\t};","","\t//","","\tfunction calculateLights() {","","\t\t_ambientLight.setRGB( 0, 0, 0 );","\t\t_directionalLights.setRGB( 0, 0, 0 );","\t\t_pointLights.setRGB( 0, 0, 0 );","","\t\tfor ( var l = 0, ll = _lights.length; l < ll; l ++ ) {","","\t\t\tvar light = _lights[ l ];","\t\t\tvar lightColor = light.color;","","\t\t\tif ( light instanceof THREE.AmbientLight ) {","","\t\t\t\t_ambientLight.add( lightColor );","","\t\t\t} else if ( light instanceof THREE.DirectionalLight ) {","","\t\t\t\t// for sprites","","\t\t\t\t_directionalLights.add( lightColor );","","\t\t\t} else if ( light instanceof THREE.PointLight ) {","","\t\t\t\t// for sprites","","\t\t\t\t_pointLights.add( lightColor );","","\t\t\t}","","\t\t}","","\t}","","\tfunction calculateLight( position, normal, color ) {","","\t\tfor ( var l = 0, ll = _lights.length; l < ll; l ++ ) {","","\t\t\tvar light = _lights[ l ];","","\t\t\t_lightColor.copy( light.color );","","\t\t\tif ( light instanceof THREE.DirectionalLight ) {","","\t\t\t\tvar lightPosition = _vector3.setFromMatrixPosition( light.matrixWorld ).normalize();","","\t\t\t\tvar amount = normal.dot( lightPosition );","","\t\t\t\tif ( amount <= 0 ) continue;","","\t\t\t\tamount *= light.intensity;","","\t\t\t\tcolor.add( _lightColor.multiplyScalar( amount ) );","","\t\t\t} else if ( light instanceof THREE.PointLight ) {","","\t\t\t\tvar lightPosition = _vector3.setFromMatrixPosition( light.matrixWorld );","","\t\t\t\tvar amount = normal.dot( _vector3.subVectors( lightPosition, position ).normalize() );","","\t\t\t\tif ( amount <= 0 ) continue;","","\t\t\t\tamount *= light.distance == 0 ? 1 : 1 - Math.min( position.distanceTo( lightPosition ) / light.distance, 1 );","","\t\t\t\tif ( amount == 0 ) continue;","","\t\t\t\tamount *= light.intensity;","","\t\t\t\tcolor.add( _lightColor.multiplyScalar( amount ) );","","\t\t\t}","","\t\t}","","\t}","","\tfunction renderSprite( v1, element, material ) {","","\t\tsetOpacity( material.opacity );","\t\tsetBlending( material.blending );","","\t\tvar scaleX = element.scale.x * _canvasWidthHalf;","\t\tvar scaleY = element.scale.y * _canvasHeightHalf;","","\t\tvar dist = 0.5 * Math.sqrt( scaleX * scaleX + scaleY * scaleY ); // allow for rotated sprite","\t\t_elemBox.min.set( v1.x - dist, v1.y - dist );","\t\t_elemBox.max.set( v1.x + dist, v1.y + dist );","","\t\tif ( material instanceof THREE.SpriteMaterial ) {","","\t\t\tvar texture = material.map;","","\t\t\tif ( texture !== null && texture.image !== undefined ) {","","\t\t\t\tif ( texture.hasEventListener( 'update', onTextureUpdate ) === false ) {","","\t\t\t\t\tif ( texture.image.width > 0 ) {","","\t\t\t\t\t\ttextureToPattern( texture );","","\t\t\t\t\t}","","\t\t\t\t\ttexture.addEventListener( 'update', onTextureUpdate );","","\t\t\t\t}","","\t\t\t\tvar pattern = _patterns[ texture.id ];","","\t\t\t\tif ( pattern !== undefined ) {","","\t\t\t\t\tsetFillStyle( pattern );","","\t\t\t\t} else {","","\t\t\t\t\tsetFillStyle( 'rgba( 0, 0, 0, 1 )' );","","\t\t\t\t}","","\t\t\t\t//","","\t\t\t\tvar bitmap = texture.image;","","\t\t\t\tvar ox = bitmap.width * texture.offset.x;","\t\t\t\tvar oy = bitmap.height * texture.offset.y;","","\t\t\t\tvar sx = bitmap.width * texture.repeat.x;","\t\t\t\tvar sy = bitmap.height * texture.repeat.y;","","\t\t\t\tvar cx = scaleX / sx;","\t\t\t\tvar cy = scaleY / sy;","","\t\t\t\t_context.save();","\t\t\t\t_context.translate( v1.x, v1.y );","\t\t\t\tif ( material.rotation !== 0 ) _context.rotate( material.rotation );","\t\t\t\t_context.translate( - scaleX / 2, - scaleY / 2 );","\t\t\t\t_context.scale( cx, cy );","\t\t\t\t_context.translate( - ox, - oy );","\t\t\t\t_context.fillRect( ox, oy, sx, sy );","\t\t\t\t_context.restore();","","\t\t\t} else {","","\t\t\t\t// no texture","","\t\t\t\tsetFillStyle( material.color.getStyle() );","","\t\t\t\t_context.save();","\t\t\t\t_context.translate( v1.x, v1.y );","\t\t\t\tif ( material.rotation !== 0 ) _context.rotate( material.rotation );","\t\t\t\t_context.scale( scaleX, - scaleY );","\t\t\t\t_context.fillRect( - 0.5, - 0.5, 1, 1 );","\t\t\t\t_context.restore();","","\t\t\t}","","\t\t} else if ( material instanceof THREE.SpriteCanvasMaterial ) {","","\t\t\tsetStrokeStyle( material.color.getStyle() );","\t\t\tsetFillStyle( material.color.getStyle() );","","\t\t\t_context.save();","\t\t\t_context.translate( v1.x, v1.y );","\t\t\tif ( material.rotation !== 0 ) _context.rotate( material.rotation );","\t\t\t_context.scale( scaleX, scaleY );","","\t\t\tmaterial.program( _context );","","\t\t\t_context.restore();","","\t\t}","","\t\t/* DEBUG","\t\tsetStrokeStyle( 'rgb(255,255,0)' );","\t\t_context.beginPath();","\t\t_context.moveTo( v1.x - 10, v1.y );","\t\t_context.lineTo( v1.x + 10, v1.y );","\t\t_context.moveTo( v1.x, v1.y - 10 );","\t\t_context.lineTo( v1.x, v1.y + 10 );","\t\t_context.stroke();","\t\t*/","","\t}","","\tfunction renderLine( v1, v2, element, material ) {","","\t\tsetOpacity( material.opacity );","\t\tsetBlending( material.blending );","","\t\t_context.beginPath();","\t\t_context.moveTo( v1.positionScreen.x, v1.positionScreen.y );","\t\t_context.lineTo( v2.positionScreen.x, v2.positionScreen.y );","","\t\tif ( material instanceof THREE.LineBasicMaterial ) {","","\t\t\tsetLineWidth( material.linewidth );","\t\t\tsetLineCap( material.linecap );","\t\t\tsetLineJoin( material.linejoin );","","\t\t\tif ( material.vertexColors !== THREE.VertexColors ) {","","\t\t\t\tsetStrokeStyle( material.color.getStyle() );","","\t\t\t} else {","","\t\t\t\tvar colorStyle1 = element.vertexColors[ 0 ].getStyle();","\t\t\t\tvar colorStyle2 = element.vertexColors[ 1 ].getStyle();","","\t\t\t\tif ( colorStyle1 === colorStyle2 ) {","","\t\t\t\t\tsetStrokeStyle( colorStyle1 );","","\t\t\t\t} else {","","\t\t\t\t\ttry {","","\t\t\t\t\t\tvar grad = _context.createLinearGradient(","\t\t\t\t\t\t\tv1.positionScreen.x,","\t\t\t\t\t\t\tv1.positionScreen.y,","\t\t\t\t\t\t\tv2.positionScreen.x,","\t\t\t\t\t\t\tv2.positionScreen.y","\t\t\t\t\t\t);","\t\t\t\t\t\tgrad.addColorStop( 0, colorStyle1 );","\t\t\t\t\t\tgrad.addColorStop( 1, colorStyle2 );","","\t\t\t\t\t} catch ( exception ) {","","\t\t\t\t\t\tgrad = colorStyle1;","","\t\t\t\t\t}","","\t\t\t\t\tsetStrokeStyle( grad );","","\t\t\t\t}","","\t\t\t}","","\t\t\t_context.stroke();","\t\t\t_elemBox.expandByScalar( material.linewidth * 2 );","","\t\t} else if ( material instanceof THREE.LineDashedMaterial ) {","","\t\t\tsetLineWidth( material.linewidth );","\t\t\tsetLineCap( material.linecap );","\t\t\tsetLineJoin( material.linejoin );","\t\t\tsetStrokeStyle( material.color.getStyle() );","\t\t\tsetLineDash( [ material.dashSize, material.gapSize ] );","","\t\t\t_context.stroke();","","\t\t\t_elemBox.expandByScalar( material.linewidth * 2 );","","\t\t\tsetLineDash( [] );","","\t\t}","","\t}","","\tfunction renderFace3( v1, v2, v3, uv1, uv2, uv3, element, material ) {","","\t\t_this.info.render.vertices += 3;","\t\t_this.info.render.faces ++;","","\t\tsetOpacity( material.opacity );","\t\tsetBlending( material.blending );","","\t\t_v1x = v1.positionScreen.x; _v1y = v1.positionScreen.y;","\t\t_v2x = v2.positionScreen.x; _v2y = v2.positionScreen.y;","\t\t_v3x = v3.positionScreen.x; _v3y = v3.positionScreen.y;","","\t\tdrawTriangle( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y );","","\t\tif ( ( material instanceof THREE.MeshLambertMaterial || material instanceof THREE.MeshPhongMaterial ) && material.map === null ) {","","\t\t\t_diffuseColor.copy( material.color );","\t\t\t_emissiveColor.copy( material.emissive );","","\t\t\tif ( material.vertexColors === THREE.FaceColors ) {","","\t\t\t\t_diffuseColor.multiply( element.color );","","\t\t\t}","","\t\t\t_color.copy( _ambientLight );","","\t\t\t_centroid.copy( v1.positionWorld ).add( v2.positionWorld ).add( v3.positionWorld ).divideScalar( 3 );","","\t\t\tcalculateLight( _centroid, element.normalModel, _color );","","\t\t\t_color.multiply( _diffuseColor ).add( _emissiveColor );","","\t\t\tmaterial.wireframe === true","\t\t\t\t ? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )","\t\t\t\t : fillPath( _color );","","\t\t} else if ( material instanceof THREE.MeshBasicMaterial ||","\t\t\t\t    material instanceof THREE.MeshLambertMaterial ||","\t\t\t\t    material instanceof THREE.MeshPhongMaterial ) {","","\t\t\tif ( material.map !== null ) {","","\t\t\t\tvar mapping = material.map.mapping;","","\t\t\t\tif ( mapping === THREE.UVMapping ) {","","\t\t\t\t\t_uvs = element.uvs;","\t\t\t\t\tpatternPath( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _uvs[ uv1 ].x, _uvs[ uv1 ].y, _uvs[ uv2 ].x, _uvs[ uv2 ].y, _uvs[ uv3 ].x, _uvs[ uv3 ].y, material.map );","","\t\t\t\t}","","\t\t\t} else if ( material.envMap !== null ) {","","\t\t\t\tif ( material.envMap.mapping === THREE.SphericalReflectionMapping ) {","","\t\t\t\t\t_normal.copy( element.vertexNormalsModel[ uv1 ] ).applyMatrix3( _normalViewMatrix );","\t\t\t\t\t_uv1x = 0.5 * _normal.x + 0.5;","\t\t\t\t\t_uv1y = 0.5 * _normal.y + 0.5;","","\t\t\t\t\t_normal.copy( element.vertexNormalsModel[ uv2 ] ).applyMatrix3( _normalViewMatrix );","\t\t\t\t\t_uv2x = 0.5 * _normal.x + 0.5;","\t\t\t\t\t_uv2y = 0.5 * _normal.y + 0.5;","","\t\t\t\t\t_normal.copy( element.vertexNormalsModel[ uv3 ] ).applyMatrix3( _normalViewMatrix );","\t\t\t\t\t_uv3x = 0.5 * _normal.x + 0.5;","\t\t\t\t\t_uv3y = 0.5 * _normal.y + 0.5;","","\t\t\t\t\tpatternPath( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _uv1x, _uv1y, _uv2x, _uv2y, _uv3x, _uv3y, material.envMap );","","\t\t\t\t}","","\t\t\t} else {","","\t\t\t\t_color.copy( material.color );","","\t\t\t\tif ( material.vertexColors === THREE.FaceColors ) {","","\t\t\t\t\t_color.multiply( element.color );","","\t\t\t\t}","","\t\t\t\tmaterial.wireframe === true","\t\t\t\t\t ? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )","\t\t\t\t\t : fillPath( _color );","","\t\t\t}","","\t\t} else if ( material instanceof THREE.MeshDepthMaterial ) {","","\t\t\t_color.r = _color.g = _color.b = 1 - smoothstep( v1.positionScreen.z * v1.positionScreen.w, _camera.near, _camera.far );","","\t\t\tmaterial.wireframe === true","\t\t\t\t\t ? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )","\t\t\t\t\t : fillPath( _color );","","\t\t} else if ( material instanceof THREE.MeshNormalMaterial ) {","","\t\t\t_normal.copy( element.normalModel ).applyMatrix3( _normalViewMatrix );","","\t\t\t_color.setRGB( _normal.x, _normal.y, _normal.z ).multiplyScalar( 0.5 ).addScalar( 0.5 );","","\t\t\tmaterial.wireframe === true","\t\t\t\t ? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )","\t\t\t\t : fillPath( _color );","","\t\t} else {","","\t\t\t_color.setRGB( 1, 1, 1 );","","\t\t\tmaterial.wireframe === true","\t\t\t\t ? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin )","\t\t\t\t : fillPath( _color );","","\t\t}","","\t}","","\t//","","\tfunction drawTriangle( x0, y0, x1, y1, x2, y2 ) {","","\t\t_context.beginPath();","\t\t_context.moveTo( x0, y0 );","\t\t_context.lineTo( x1, y1 );","\t\t_context.lineTo( x2, y2 );","\t\t_context.closePath();","","\t}","","\tfunction strokePath( color, linewidth, linecap, linejoin ) {","","\t\tsetLineWidth( linewidth );","\t\tsetLineCap( linecap );","\t\tsetLineJoin( linejoin );","\t\tsetStrokeStyle( color.getStyle() );","","\t\t_context.stroke();","","\t\t_elemBox.expandByScalar( linewidth * 2 );","","\t}","","\tfunction fillPath( color ) {","","\t\tsetFillStyle( color.getStyle() );","\t\t_context.fill();","","\t}","","\tfunction onTextureUpdate ( event ) {","","\t\ttextureToPattern( event.target );","","\t}","","\tfunction textureToPattern( texture ) {","","\t\tif ( texture instanceof THREE.CompressedTexture ) return;","","\t\tvar repeatX = texture.wrapS === THREE.RepeatWrapping;","\t\tvar repeatY = texture.wrapT === THREE.RepeatWrapping;","","\t\tvar image = texture.image;","","\t\tvar canvas = document.createElement( 'canvas' );","\t\tcanvas.width = image.width;","\t\tcanvas.height = image.height;","","\t\tvar context = canvas.getContext( '2d' );","\t\tcontext.setTransform( 1, 0, 0, - 1, 0, image.height );","\t\tcontext.drawImage( image, 0, 0 );","","\t\t_patterns[ texture.id ] = _context.createPattern(","\t\t\tcanvas, repeatX === true && repeatY === true","\t\t\t\t ? 'repeat'","\t\t\t\t : repeatX === true && repeatY === false","\t\t\t\t\t ? 'repeat-x'","\t\t\t\t\t : repeatX === false && repeatY === true","\t\t\t\t\t\t ? 'repeat-y'","\t\t\t\t\t\t : 'no-repeat'","\t\t);","","\t}","","\tfunction patternPath( x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2, texture ) {","","\t\tif ( texture instanceof THREE.DataTexture ) return;","","\t\tif ( texture.hasEventListener( 'update', onTextureUpdate ) === false ) {","","\t\t\tif ( texture.image !== undefined && texture.image.width > 0 ) {","","\t\t\t\ttextureToPattern( texture );","","\t\t\t}","","\t\t\ttexture.addEventListener( 'update', onTextureUpdate );","","\t\t}","","\t\tvar pattern = _patterns[ texture.id ];","","\t\tif ( pattern !== undefined ) {","","\t\t\tsetFillStyle( pattern );","","\t\t} else {","","\t\t\tsetFillStyle( 'rgba(0,0,0,1)' );","\t\t\t_context.fill();","","\t\t\treturn;","","\t\t}","","\t\t// http://extremelysatisfactorytotalitarianism.com/blog/?p=2120","","\t\tvar a, b, c, d, e, f, det, idet,","\t\toffsetX = texture.offset.x / texture.repeat.x,","\t\toffsetY = texture.offset.y / texture.repeat.y,","\t\twidth = texture.image.width * texture.repeat.x,","\t\theight = texture.image.height * texture.repeat.y;","","\t\tu0 = ( u0 + offsetX ) * width;","\t\tv0 = ( v0 + offsetY ) * height;","","\t\tu1 = ( u1 + offsetX ) * width;","\t\tv1 = ( v1 + offsetY ) * height;","","\t\tu2 = ( u2 + offsetX ) * width;","\t\tv2 = ( v2 + offsetY ) * height;","","\t\tx1 -= x0; y1 -= y0;","\t\tx2 -= x0; y2 -= y0;","","\t\tu1 -= u0; v1 -= v0;","\t\tu2 -= u0; v2 -= v0;","","\t\tdet = u1 * v2 - u2 * v1;","","\t\tif ( det === 0 ) return;","","\t\tidet = 1 / det;","","\t\ta = ( v2 * x1 - v1 * x2 ) * idet;","\t\tb = ( v2 * y1 - v1 * y2 ) * idet;","\t\tc = ( u1 * x2 - u2 * x1 ) * idet;","\t\td = ( u1 * y2 - u2 * y1 ) * idet;","","\t\te = x0 - a * u0 - c * v0;","\t\tf = y0 - b * u0 - d * v0;","","\t\t_context.save();","\t\t_context.transform( a, b, c, d, e, f );","\t\t_context.fill();","\t\t_context.restore();","","\t}","","\tfunction clipImage( x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2, image ) {","","\t\t// http://extremelysatisfactorytotalitarianism.com/blog/?p=2120","","\t\tvar a, b, c, d, e, f, det, idet,","\t\twidth = image.width - 1,","\t\theight = image.height - 1;","","\t\tu0 *= width; v0 *= height;","\t\tu1 *= width; v1 *= height;","\t\tu2 *= width; v2 *= height;","","\t\tx1 -= x0; y1 -= y0;","\t\tx2 -= x0; y2 -= y0;","","\t\tu1 -= u0; v1 -= v0;","\t\tu2 -= u0; v2 -= v0;","","\t\tdet = u1 * v2 - u2 * v1;","","\t\tidet = 1 / det;","","\t\ta = ( v2 * x1 - v1 * x2 ) * idet;","\t\tb = ( v2 * y1 - v1 * y2 ) * idet;","\t\tc = ( u1 * x2 - u2 * x1 ) * idet;","\t\td = ( u1 * y2 - u2 * y1 ) * idet;","","\t\te = x0 - a * u0 - c * v0;","\t\tf = y0 - b * u0 - d * v0;","","\t\t_context.save();","\t\t_context.transform( a, b, c, d, e, f );","\t\t_context.clip();","\t\t_context.drawImage( image, 0, 0 );","\t\t_context.restore();","","\t}","","\t// Hide anti-alias gaps","","\tfunction expand( v1, v2, pixels ) {","","\t\tvar x = v2.x - v1.x, y = v2.y - v1.y,","\t\tdet = x * x + y * y, idet;","","\t\tif ( det === 0 ) return;","","\t\tidet = pixels / Math.sqrt( det );","","\t\tx *= idet; y *= idet;","","\t\tv2.x += x; v2.y += y;","\t\tv1.x -= x; v1.y -= y;","","\t}","","\t// Context cached methods.","","\tfunction setOpacity( value ) {","","\t\tif ( _contextGlobalAlpha !== value ) {","","\t\t\t_context.globalAlpha = value;","\t\t\t_contextGlobalAlpha = value;","","\t\t}","","\t}","","\tfunction setBlending( value ) {","","\t\tif ( _contextGlobalCompositeOperation !== value ) {","","\t\t\tif ( value === THREE.NormalBlending ) {","","\t\t\t\t_context.globalCompositeOperation = 'source-over';","","\t\t\t} else if ( value === THREE.AdditiveBlending ) {","","\t\t\t\t_context.globalCompositeOperation = 'lighter';","","\t\t\t} else if ( value === THREE.SubtractiveBlending ) {","","\t\t\t\t_context.globalCompositeOperation = 'darker';","","\t\t\t}","","\t\t\t_contextGlobalCompositeOperation = value;","","\t\t}","","\t}","","\tfunction setLineWidth( value ) {","","\t\tif ( _contextLineWidth !== value ) {","","\t\t\t_context.lineWidth = value;","\t\t\t_contextLineWidth = value;","","\t\t}","","\t}","","\tfunction setLineCap( value ) {","","\t\t// \"butt\", \"round\", \"square\"","","\t\tif ( _contextLineCap !== value ) {","","\t\t\t_context.lineCap = value;","\t\t\t_contextLineCap = value;","","\t\t}","","\t}","","\tfunction setLineJoin( value ) {","","\t\t// \"round\", \"bevel\", \"miter\"","","\t\tif ( _contextLineJoin !== value ) {","","\t\t\t_context.lineJoin = value;","\t\t\t_contextLineJoin = value;","","\t\t}","","\t}","","\tfunction setStrokeStyle( value ) {","","\t\tif ( _contextStrokeStyle !== value ) {","","\t\t\t_context.strokeStyle = value;","\t\t\t_contextStrokeStyle = value;","","\t\t}","","\t}","","\tfunction setFillStyle( value ) {","","\t\tif ( _contextFillStyle !== value ) {","","\t\t\t_context.fillStyle = value;","\t\t\t_contextFillStyle = value;","","\t\t}","","\t}","","\tfunction setLineDash( value ) {","","\t\tif ( _contextLineDash.length !== value.length ) {","","\t\t\t_context.setLineDash( value );","\t\t\t_contextLineDash = value;","","\t\t}","","\t}","","};"]}]}]]},"ace":{"folds":[],"scrolltop":15788,"scrollleft":0,"selection":{"start":{"row":1097,"column":2},"end":{"row":1097,"column":2},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":1051,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1426079173212,"hash":"994aa4184db474ca7e760b5b3686e4a90da3fbd5"}