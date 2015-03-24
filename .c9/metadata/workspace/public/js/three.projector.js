{"filter":false,"title":"three.projector.js","tooltip":"/public/js/three.projector.js","undoManager":{"mark":0,"position":0,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":925,"column":2},"action":"insert","lines":["/**"," * @author mrdoob / http://mrdoob.com/"," * @author supereggbert / http://www.paulbrunt.co.uk/"," * @author julianwa / https://github.com/julianwa"," */","","THREE.RenderableObject = function () {","","\tthis.id = 0;","","\tthis.object = null;","\tthis.z = 0;","","};","","//","","THREE.RenderableFace = function () {","","\tthis.id = 0;","","\tthis.v1 = new THREE.RenderableVertex();","\tthis.v2 = new THREE.RenderableVertex();","\tthis.v3 = new THREE.RenderableVertex();","","\tthis.normalModel = new THREE.Vector3();","","\tthis.vertexNormalsModel = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];","\tthis.vertexNormalsLength = 0;","","\tthis.color = new THREE.Color();","\tthis.material = null;","\tthis.uvs = [ new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2() ];","","\tthis.z = 0;","","};","","//","","THREE.RenderableVertex = function () {","","\tthis.position = new THREE.Vector3();","\tthis.positionWorld = new THREE.Vector3();","\tthis.positionScreen = new THREE.Vector4();","","\tthis.visible = true;","","};","","THREE.RenderableVertex.prototype.copy = function ( vertex ) {","","\tthis.positionWorld.copy( vertex.positionWorld );","\tthis.positionScreen.copy( vertex.positionScreen );","","};","","//","","THREE.RenderableLine = function () {","","\tthis.id = 0;","","\tthis.v1 = new THREE.RenderableVertex();","\tthis.v2 = new THREE.RenderableVertex();","","\tthis.vertexColors = [ new THREE.Color(), new THREE.Color() ];","\tthis.material = null;","","\tthis.z = 0;","","};","","//","","THREE.RenderableSprite = function () {","","\tthis.id = 0;","","\tthis.object = null;","","\tthis.x = 0;","\tthis.y = 0;","\tthis.z = 0;","","\tthis.rotation = 0;","\tthis.scale = new THREE.Vector2();","","\tthis.material = null;","","};","","//","","THREE.Projector = function () {","","\tvar _object, _objectCount, _objectPool = [], _objectPoolLength = 0,","\t_vertex, _vertexCount, _vertexPool = [], _vertexPoolLength = 0,","\t_face, _faceCount, _facePool = [], _facePoolLength = 0,","\t_line, _lineCount, _linePool = [], _linePoolLength = 0,","\t_sprite, _spriteCount, _spritePool = [], _spritePoolLength = 0,","","\t_renderData = { objects: [], lights: [], elements: [] },","","\t_vA = new THREE.Vector3(),","\t_vB = new THREE.Vector3(),","\t_vC = new THREE.Vector3(),","","\t_vector3 = new THREE.Vector3(),","\t_vector4 = new THREE.Vector4(),","","\t_clipBox = new THREE.Box3( new THREE.Vector3( - 1, - 1, - 1 ), new THREE.Vector3( 1, 1, 1 ) ),","\t_boundingBox = new THREE.Box3(),","\t_points3 = new Array( 3 ),","\t_points4 = new Array( 4 ),","","\t_viewMatrix = new THREE.Matrix4(),","\t_viewProjectionMatrix = new THREE.Matrix4(),","","\t_modelMatrix,","\t_modelViewProjectionMatrix = new THREE.Matrix4(),","","\t_normalMatrix = new THREE.Matrix3(),","","\t_frustum = new THREE.Frustum(),","","\t_clippedVertex1PositionScreen = new THREE.Vector4(),","\t_clippedVertex2PositionScreen = new THREE.Vector4();","","\t//","","\tthis.projectVector = function ( vector, camera ) {","","\t\tconsole.warn( 'THREE.Projector: .projectVector() is now vector.project().' );","\t\tvector.project( camera );","","\t};","","\tthis.unprojectVector = function ( vector, camera ) {","","\t\tconsole.warn( 'THREE.Projector: .unprojectVector() is now vector.unproject().' );","\t\tvector.unproject( camera );","","\t};","","\tthis.pickingRay = function ( vector, camera ) {","","\t\tconsole.error( 'THREE.Projector: .pickingRay() is now raycaster.setFromCamera().' );","","\t};","","\t//","","\tvar RenderList = function () {","","\t\tvar normals = [];","\t\tvar uvs = [];","","\t\tvar object = null;","\t\tvar material = null;","","\t\tvar normalMatrix = new THREE.Matrix3();","","\t\tvar setObject = function ( value ) {","","\t\t\tobject = value;","\t\t\tmaterial = object.material;","","\t\t\tnormalMatrix.getNormalMatrix( object.matrixWorld );","","\t\t\tnormals.length = 0;","\t\t\tuvs.length = 0;","","\t\t};","","\t\tvar projectVertex = function ( vertex ) {","","\t\t\tvar position = vertex.position;","\t\t\tvar positionWorld = vertex.positionWorld;","\t\t\tvar positionScreen = vertex.positionScreen;","","\t\t\tpositionWorld.copy( position ).applyMatrix4( _modelMatrix );","\t\t\tpositionScreen.copy( positionWorld ).applyMatrix4( _viewProjectionMatrix );","","\t\t\tvar invW = 1 / positionScreen.w;","","\t\t\tpositionScreen.x *= invW;","\t\t\tpositionScreen.y *= invW;","\t\t\tpositionScreen.z *= invW;","","\t\t\tvertex.visible = positionScreen.x >= - 1 && positionScreen.x <= 1 &&","\t\t\t\t\t positionScreen.y >= - 1 && positionScreen.y <= 1 &&","\t\t\t\t\t positionScreen.z >= - 1 && positionScreen.z <= 1;","","\t\t};","","\t\tvar pushVertex = function ( x, y, z ) {","","\t\t\t_vertex = getNextVertexInPool();","\t\t\t_vertex.position.set( x, y, z );","","\t\t\tprojectVertex( _vertex );","","\t\t};","","\t\tvar pushNormal = function ( x, y, z ) {","","\t\t\tnormals.push( x, y, z );","","\t\t};","","\t\tvar pushUv = function ( x, y ) {","","\t\t\tuvs.push( x, y );","","\t\t};","","\t\tvar checkTriangleVisibility = function ( v1, v2, v3 ) {","","\t\t\tif ( v1.visible === true || v2.visible === true || v3.visible === true ) return true;","","\t\t\t_points3[ 0 ] = v1.positionScreen;","\t\t\t_points3[ 1 ] = v2.positionScreen;","\t\t\t_points3[ 2 ] = v3.positionScreen;","","\t\t\treturn _clipBox.isIntersectionBox( _boundingBox.setFromPoints( _points3 ) );","","\t\t};","","\t\tvar checkBackfaceCulling = function ( v1, v2, v3 ) {","","\t\t\treturn ( ( v3.positionScreen.x - v1.positionScreen.x ) *","\t\t\t\t    ( v2.positionScreen.y - v1.positionScreen.y ) -","\t\t\t\t    ( v3.positionScreen.y - v1.positionScreen.y ) *","\t\t\t\t    ( v2.positionScreen.x - v1.positionScreen.x ) ) < 0;","","\t\t};","","\t\tvar pushLine = function ( a, b ) {","","\t\t\tvar v1 = _vertexPool[ a ];","\t\t\tvar v2 = _vertexPool[ b ];","","\t\t\t_line = getNextLineInPool();","","\t\t\t_line.id = object.id;","\t\t\t_line.v1.copy( v1 );","\t\t\t_line.v2.copy( v2 );","\t\t\t_line.z = ( v1.positionScreen.z + v2.positionScreen.z ) / 2;","","\t\t\t_line.material = object.material;","","\t\t\t_renderData.elements.push( _line );","","\t\t};","","\t\tvar pushTriangle = function ( a, b, c ) {","","\t\t\tvar v1 = _vertexPool[ a ];","\t\t\tvar v2 = _vertexPool[ b ];","\t\t\tvar v3 = _vertexPool[ c ];","","\t\t\tif ( checkTriangleVisibility( v1, v2, v3 ) === false ) return;","","\t\t\tif ( material.side === THREE.DoubleSide || checkBackfaceCulling( v1, v2, v3 ) === true ) {","","\t\t\t\t_face = getNextFaceInPool();","","\t\t\t\t_face.id = object.id;","\t\t\t\t_face.v1.copy( v1 );","\t\t\t\t_face.v2.copy( v2 );","\t\t\t\t_face.v3.copy( v3 );","\t\t\t\t_face.z = ( v1.positionScreen.z + v2.positionScreen.z + v3.positionScreen.z ) / 3;","","\t\t\t\tfor ( var i = 0; i < 3; i ++ ) {","","\t\t\t\t\tvar offset = arguments[ i ] * 3;","\t\t\t\t\tvar normal = _face.vertexNormalsModel[ i ];","","\t\t\t\t\tnormal.set( normals[ offset ], normals[ offset + 1 ], normals[ offset + 2 ] );","\t\t\t\t\tnormal.applyMatrix3( normalMatrix ).normalize();","","\t\t\t\t\tvar offset2 = arguments[ i ] * 2;","","\t\t\t\t\tvar uv = _face.uvs[ i ];","\t\t\t\t\tuv.set( uvs[ offset2 ], uvs[ offset2 + 1 ] );","","\t\t\t\t}","","\t\t\t\t_face.vertexNormalsLength = 3;","","\t\t\t\t_face.material = object.material;","","\t\t\t\t_renderData.elements.push( _face );","","\t\t\t}","","\t\t};","","\t\treturn {","\t\t\tsetObject: setObject,","\t\t\tprojectVertex: projectVertex,","\t\t\tcheckTriangleVisibility: checkTriangleVisibility,","\t\t\tcheckBackfaceCulling: checkBackfaceCulling,","\t\t\tpushVertex: pushVertex,","\t\t\tpushNormal: pushNormal,","\t\t\tpushUv: pushUv,","\t\t\tpushLine: pushLine,","\t\t\tpushTriangle: pushTriangle","\t\t}","","\t};","","\tvar renderList = new RenderList();","","\tthis.projectScene = function ( scene, camera, sortObjects, sortElements ) {","","\t\t_faceCount = 0;","\t\t_lineCount = 0;","\t\t_spriteCount = 0;","","\t\t_renderData.elements.length = 0;","","\t\tif ( scene.autoUpdate === true ) scene.updateMatrixWorld();","\t\tif ( camera.parent === undefined ) camera.updateMatrixWorld();","","\t\t_viewMatrix.copy( camera.matrixWorldInverse.getInverse( camera.matrixWorld ) );","\t\t_viewProjectionMatrix.multiplyMatrices( camera.projectionMatrix, _viewMatrix );","","\t\t_frustum.setFromMatrix( _viewProjectionMatrix );","","\t\t//","","\t\t_objectCount = 0;","","\t\t_renderData.objects.length = 0;","\t\t_renderData.lights.length = 0;","","\t\tscene.traverseVisible( function ( object ) {","","\t\t\tif ( object instanceof THREE.Light ) {","","\t\t\t\t_renderData.lights.push( object );","","\t\t\t} else if ( object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Sprite ) {","","\t\t\t\tif ( object.material.visible === false ) return;","","\t\t\t\tif ( object.frustumCulled === false || _frustum.intersectsObject( object ) === true ) {","","\t\t\t\t\t_object = getNextObjectInPool();","\t\t\t\t\t_object.id = object.id;","\t\t\t\t\t_object.object = object;","","\t\t\t\t\t_vector3.setFromMatrixPosition( object.matrixWorld );","\t\t\t\t\t_vector3.applyProjection( _viewProjectionMatrix );","\t\t\t\t\t_object.z = _vector3.z;","","\t\t\t\t\t_renderData.objects.push( _object );","","\t\t\t\t}","","\t\t\t}","","\t\t} );","","\t\tif ( sortObjects === true ) {","","\t\t\t_renderData.objects.sort( painterSort );","","\t\t}","","\t\t//","","\t\tfor ( var o = 0, ol = _renderData.objects.length; o < ol; o ++ ) {","","\t\t\tvar object = _renderData.objects[ o ].object;","\t\t\tvar geometry = object.geometry;","","\t\t\trenderList.setObject( object );","","\t\t\t_modelMatrix = object.matrixWorld;","","\t\t\t_vertexCount = 0;","","\t\t\tif ( object instanceof THREE.Mesh ) {","","\t\t\t\tif ( geometry instanceof THREE.BufferGeometry ) {","","\t\t\t\t\tvar attributes = geometry.attributes;","\t\t\t\t\tvar offsets = geometry.offsets;","","\t\t\t\t\tif ( attributes.position === undefined ) continue;","","\t\t\t\t\tvar positions = attributes.position.array;","","\t\t\t\t\tfor ( var i = 0, l = positions.length; i < l; i += 3 ) {","","\t\t\t\t\t\trenderList.pushVertex( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );","","\t\t\t\t\t}","","\t\t\t\t\tif ( attributes.normal !== undefined ) {","","\t\t\t\t\t\tvar normals = attributes.normal.array;","","\t\t\t\t\t\tfor ( var i = 0, l = normals.length; i < l; i += 3 ) {","","\t\t\t\t\t\t\trenderList.pushNormal( normals[ i ], normals[ i + 1 ], normals[ i + 2 ] );","","\t\t\t\t\t\t}","","\t\t\t\t\t}","","\t\t\t\t\tif ( attributes.uv !== undefined ) {","","\t\t\t\t\t\tvar uvs = attributes.uv.array;","","\t\t\t\t\t\tfor ( var i = 0, l = uvs.length; i < l; i += 2 ) {","","\t\t\t\t\t\t\trenderList.pushUv( uvs[ i ], uvs[ i + 1 ] );","","\t\t\t\t\t\t}","","\t\t\t\t\t}","","\t\t\t\t\tif ( attributes.index !== undefined ) {","","\t\t\t\t\t\tvar indices = attributes.index.array;","","\t\t\t\t\t\tif ( offsets.length > 0 ) {","","\t\t\t\t\t\t\tfor ( var o = 0; o < offsets.length; o ++ ) {","","\t\t\t\t\t\t\t\tvar offset = offsets[ o ];","\t\t\t\t\t\t\t\tvar index = offset.index;","","\t\t\t\t\t\t\t\tfor ( var i = offset.start, l = offset.start + offset.count; i < l; i += 3 ) {","","\t\t\t\t\t\t\t\t\trenderList.pushTriangle( indices[ i ] + index, indices[ i + 1 ] + index, indices[ i + 2 ] + index );","","\t\t\t\t\t\t\t\t}","","\t\t\t\t\t\t\t}","","\t\t\t\t\t\t} else {","","\t\t\t\t\t\t\tfor ( var i = 0, l = indices.length; i < l; i += 3 ) {","","\t\t\t\t\t\t\t\trenderList.pushTriangle( indices[ i ], indices[ i + 1 ], indices[ i + 2 ] );","","\t\t\t\t\t\t\t}","","\t\t\t\t\t\t}","","\t\t\t\t\t} else {","","\t\t\t\t\t\tfor ( var i = 0, l = positions.length / 3; i < l; i += 3 ) {","","\t\t\t\t\t\t\trenderList.pushTriangle( i, i + 1, i + 2 );","","\t\t\t\t\t\t}","","\t\t\t\t\t}","","\t\t\t\t} else if ( geometry instanceof THREE.Geometry ) {","","\t\t\t\t\tvar vertices = geometry.vertices;","\t\t\t\t\tvar faces = geometry.faces;","\t\t\t\t\tvar faceVertexUvs = geometry.faceVertexUvs[ 0 ];","","\t\t\t\t\t_normalMatrix.getNormalMatrix( _modelMatrix );","","\t\t\t\t\tvar isFaceMaterial = object.material instanceof THREE.MeshFaceMaterial;","\t\t\t\t\tvar objectMaterials = isFaceMaterial === true ? object.material : null;","","\t\t\t\t\tfor ( var v = 0, vl = vertices.length; v < vl; v ++ ) {","","\t\t\t\t\t\tvar vertex = vertices[ v ];","\t\t\t\t\t\trenderList.pushVertex( vertex.x, vertex.y, vertex.z );","","\t\t\t\t\t}","","\t\t\t\t\tfor ( var f = 0, fl = faces.length; f < fl; f ++ ) {","","\t\t\t\t\t\tvar face = faces[ f ];","","\t\t\t\t\t\tvar material = isFaceMaterial === true","\t\t\t\t\t\t\t ? objectMaterials.materials[ face.materialIndex ]","\t\t\t\t\t\t\t : object.material;","","\t\t\t\t\t\tif ( material === undefined ) continue;","","\t\t\t\t\t\tvar side = material.side;","","\t\t\t\t\t\tvar v1 = _vertexPool[ face.a ];","\t\t\t\t\t\tvar v2 = _vertexPool[ face.b ];","\t\t\t\t\t\tvar v3 = _vertexPool[ face.c ];","","\t\t\t\t\t\tif ( material.morphTargets === true ) {","","\t\t\t\t\t\t\tvar morphTargets = geometry.morphTargets;","\t\t\t\t\t\t\tvar morphInfluences = object.morphTargetInfluences;","","\t\t\t\t\t\t\tvar v1p = v1.position;","\t\t\t\t\t\t\tvar v2p = v2.position;","\t\t\t\t\t\t\tvar v3p = v3.position;","","\t\t\t\t\t\t\t_vA.set( 0, 0, 0 );","\t\t\t\t\t\t\t_vB.set( 0, 0, 0 );","\t\t\t\t\t\t\t_vC.set( 0, 0, 0 );","","\t\t\t\t\t\t\tfor ( var t = 0, tl = morphTargets.length; t < tl; t ++ ) {","","\t\t\t\t\t\t\t\tvar influence = morphInfluences[ t ];","","\t\t\t\t\t\t\t\tif ( influence === 0 ) continue;","","\t\t\t\t\t\t\t\tvar targets = morphTargets[ t ].vertices;","","\t\t\t\t\t\t\t\t_vA.x += ( targets[ face.a ].x - v1p.x ) * influence;","\t\t\t\t\t\t\t\t_vA.y += ( targets[ face.a ].y - v1p.y ) * influence;","\t\t\t\t\t\t\t\t_vA.z += ( targets[ face.a ].z - v1p.z ) * influence;","","\t\t\t\t\t\t\t\t_vB.x += ( targets[ face.b ].x - v2p.x ) * influence;","\t\t\t\t\t\t\t\t_vB.y += ( targets[ face.b ].y - v2p.y ) * influence;","\t\t\t\t\t\t\t\t_vB.z += ( targets[ face.b ].z - v2p.z ) * influence;","","\t\t\t\t\t\t\t\t_vC.x += ( targets[ face.c ].x - v3p.x ) * influence;","\t\t\t\t\t\t\t\t_vC.y += ( targets[ face.c ].y - v3p.y ) * influence;","\t\t\t\t\t\t\t\t_vC.z += ( targets[ face.c ].z - v3p.z ) * influence;","","\t\t\t\t\t\t\t}","","\t\t\t\t\t\t\tv1.position.add( _vA );","\t\t\t\t\t\t\tv2.position.add( _vB );","\t\t\t\t\t\t\tv3.position.add( _vC );","","\t\t\t\t\t\t\trenderList.projectVertex( v1 );","\t\t\t\t\t\t\trenderList.projectVertex( v2 );","\t\t\t\t\t\t\trenderList.projectVertex( v3 );","","\t\t\t\t\t\t}","","\t\t\t\t\t\tif ( renderList.checkTriangleVisibility( v1, v2, v3 ) === false ) continue;","","\t\t\t\t\t\tvar visible = renderList.checkBackfaceCulling( v1, v2, v3 );","","\t\t\t\t\t\tif ( side !== THREE.DoubleSide ) {","\t\t\t\t\t\t\tif ( side === THREE.FrontSide && visible === false ) continue;","\t\t\t\t\t\t\tif ( side === THREE.BackSide && visible === true ) continue;","\t\t\t\t\t\t}","","\t\t\t\t\t\t_face = getNextFaceInPool();","","\t\t\t\t\t\t_face.id = object.id;","\t\t\t\t\t\t_face.v1.copy( v1 );","\t\t\t\t\t\t_face.v2.copy( v2 );","\t\t\t\t\t\t_face.v3.copy( v3 );","","\t\t\t\t\t\t_face.normalModel.copy( face.normal );","","\t\t\t\t\t\tif ( visible === false && ( side === THREE.BackSide || side === THREE.DoubleSide ) ) {","","\t\t\t\t\t\t\t_face.normalModel.negate();","","\t\t\t\t\t\t}","","\t\t\t\t\t\t_face.normalModel.applyMatrix3( _normalMatrix ).normalize();","","\t\t\t\t\t\tvar faceVertexNormals = face.vertexNormals;","","\t\t\t\t\t\tfor ( var n = 0, nl = Math.min( faceVertexNormals.length, 3 ); n < nl; n ++ ) {","","\t\t\t\t\t\t\tvar normalModel = _face.vertexNormalsModel[ n ];","\t\t\t\t\t\t\tnormalModel.copy( faceVertexNormals[ n ] );","","\t\t\t\t\t\t\tif ( visible === false && ( side === THREE.BackSide || side === THREE.DoubleSide ) ) {","","\t\t\t\t\t\t\t\tnormalModel.negate();","","\t\t\t\t\t\t\t}","","\t\t\t\t\t\t\tnormalModel.applyMatrix3( _normalMatrix ).normalize();","","\t\t\t\t\t\t}","","\t\t\t\t\t\t_face.vertexNormalsLength = faceVertexNormals.length;","","\t\t\t\t\t\tvar vertexUvs = faceVertexUvs[ f ];","","\t\t\t\t\t\tif ( vertexUvs !== undefined ) {","","\t\t\t\t\t\t\tfor ( var u = 0; u < 3; u ++ ) {","","\t\t\t\t\t\t\t\t_face.uvs[ u ].copy( vertexUvs[ u ] );","","\t\t\t\t\t\t\t}","","\t\t\t\t\t\t}","","\t\t\t\t\t\t_face.color = face.color;","\t\t\t\t\t\t_face.material = material;","","\t\t\t\t\t\t_face.z = ( v1.positionScreen.z + v2.positionScreen.z + v3.positionScreen.z ) / 3;","","\t\t\t\t\t\t_renderData.elements.push( _face );","","\t\t\t\t\t}","","\t\t\t\t}","","\t\t\t} else if ( object instanceof THREE.Line ) {","","\t\t\t\tif ( geometry instanceof THREE.BufferGeometry ) {","","\t\t\t\t\tvar attributes = geometry.attributes;","","\t\t\t\t\tif ( attributes.position !== undefined ) {","","\t\t\t\t\t\tvar positions = attributes.position.array;","","\t\t\t\t\t\tfor ( var i = 0, l = positions.length; i < l; i += 3 ) {","","\t\t\t\t\t\t\trenderList.pushVertex( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );","","\t\t\t\t\t\t}","","\t\t\t\t\t\tif ( attributes.index !== undefined ) {","","\t\t\t\t\t\t\tvar indices = attributes.index.array;","","\t\t\t\t\t\t\tfor ( var i = 0, l = indices.length; i < l; i += 2 ) {","","\t\t\t\t\t\t\t\trenderList.pushLine( indices[ i ], indices[ i + 1 ] );","","\t\t\t\t\t\t\t}","","\t\t\t\t\t\t} else {","","\t\t\t\t\t\t\tvar step = object.mode === THREE.LinePieces ? 2 : 1;","","\t\t\t\t\t\t\tfor ( var i = 0, l = ( positions.length / 3 ) - 1; i < l; i += step ) {","","\t\t\t\t\t\t\t\trenderList.pushLine( i, i + 1 );","","\t\t\t\t\t\t\t}","","\t\t\t\t\t\t}","","\t\t\t\t\t}","","\t\t\t\t} else if ( geometry instanceof THREE.Geometry ) {","","\t\t\t\t\t_modelViewProjectionMatrix.multiplyMatrices( _viewProjectionMatrix, _modelMatrix );","","\t\t\t\t\tvar vertices = object.geometry.vertices;","","\t\t\t\t\tif ( vertices.length === 0 ) continue;","","\t\t\t\t\tv1 = getNextVertexInPool();","\t\t\t\t\tv1.positionScreen.copy( vertices[ 0 ] ).applyMatrix4( _modelViewProjectionMatrix );","","\t\t\t\t\t// Handle LineStrip and LinePieces","\t\t\t\t\tvar step = object.mode === THREE.LinePieces ? 2 : 1;","","\t\t\t\t\tfor ( var v = 1, vl = vertices.length; v < vl; v ++ ) {","","\t\t\t\t\t\tv1 = getNextVertexInPool();","\t\t\t\t\t\tv1.positionScreen.copy( vertices[ v ] ).applyMatrix4( _modelViewProjectionMatrix );","","\t\t\t\t\t\tif ( ( v + 1 ) % step > 0 ) continue;","","\t\t\t\t\t\tv2 = _vertexPool[ _vertexCount - 2 ];","","\t\t\t\t\t\t_clippedVertex1PositionScreen.copy( v1.positionScreen );","\t\t\t\t\t\t_clippedVertex2PositionScreen.copy( v2.positionScreen );","","\t\t\t\t\t\tif ( clipLine( _clippedVertex1PositionScreen, _clippedVertex2PositionScreen ) === true ) {","","\t\t\t\t\t\t\t// Perform the perspective divide","\t\t\t\t\t\t\t_clippedVertex1PositionScreen.multiplyScalar( 1 / _clippedVertex1PositionScreen.w );","\t\t\t\t\t\t\t_clippedVertex2PositionScreen.multiplyScalar( 1 / _clippedVertex2PositionScreen.w );","","\t\t\t\t\t\t\t_line = getNextLineInPool();","","\t\t\t\t\t\t\t_line.id = object.id;","\t\t\t\t\t\t\t_line.v1.positionScreen.copy( _clippedVertex1PositionScreen );","\t\t\t\t\t\t\t_line.v2.positionScreen.copy( _clippedVertex2PositionScreen );","","\t\t\t\t\t\t\t_line.z = Math.max( _clippedVertex1PositionScreen.z, _clippedVertex2PositionScreen.z );","","\t\t\t\t\t\t\t_line.material = object.material;","","\t\t\t\t\t\t\tif ( object.material.vertexColors === THREE.VertexColors ) {","","\t\t\t\t\t\t\t\t_line.vertexColors[ 0 ].copy( object.geometry.colors[ v ] );","\t\t\t\t\t\t\t\t_line.vertexColors[ 1 ].copy( object.geometry.colors[ v - 1 ] );","","\t\t\t\t\t\t\t}","","\t\t\t\t\t\t\t_renderData.elements.push( _line );","","\t\t\t\t\t\t}","","\t\t\t\t\t}","","\t\t\t\t}","","\t\t\t} else if ( object instanceof THREE.Sprite ) {","","\t\t\t\t_vector4.set( _modelMatrix.elements[ 12 ], _modelMatrix.elements[ 13 ], _modelMatrix.elements[ 14 ], 1 );","\t\t\t\t_vector4.applyMatrix4( _viewProjectionMatrix );","","\t\t\t\tvar invW = 1 / _vector4.w;","","\t\t\t\t_vector4.z *= invW;","","\t\t\t\tif ( _vector4.z >= - 1 && _vector4.z <= 1 ) {","","\t\t\t\t\t_sprite = getNextSpriteInPool();","\t\t\t\t\t_sprite.id = object.id;","\t\t\t\t\t_sprite.x = _vector4.x * invW;","\t\t\t\t\t_sprite.y = _vector4.y * invW;","\t\t\t\t\t_sprite.z = _vector4.z;","\t\t\t\t\t_sprite.object = object;","","\t\t\t\t\t_sprite.rotation = object.rotation;","","\t\t\t\t\t_sprite.scale.x = object.scale.x * Math.abs( _sprite.x - ( _vector4.x + camera.projectionMatrix.elements[ 0 ] ) / ( _vector4.w + camera.projectionMatrix.elements[ 12 ] ) );","\t\t\t\t\t_sprite.scale.y = object.scale.y * Math.abs( _sprite.y - ( _vector4.y + camera.projectionMatrix.elements[ 5 ] ) / ( _vector4.w + camera.projectionMatrix.elements[ 13 ] ) );","","\t\t\t\t\t_sprite.material = object.material;","","\t\t\t\t\t_renderData.elements.push( _sprite );","","\t\t\t\t}","","\t\t\t}","","\t\t}","","\t\tif ( sortElements === true ) {","","\t\t\t_renderData.elements.sort( painterSort );","","\t\t}","","\t\treturn _renderData;","","\t};","","\t// Pools","","\tfunction getNextObjectInPool() {","","\t\tif ( _objectCount === _objectPoolLength ) {","","\t\t\tvar object = new THREE.RenderableObject();","\t\t\t_objectPool.push( object );","\t\t\t_objectPoolLength ++;","\t\t\t_objectCount ++;","\t\t\treturn object;","","\t\t}","","\t\treturn _objectPool[ _objectCount ++ ];","","\t}","","\tfunction getNextVertexInPool() {","","\t\tif ( _vertexCount === _vertexPoolLength ) {","","\t\t\tvar vertex = new THREE.RenderableVertex();","\t\t\t_vertexPool.push( vertex );","\t\t\t_vertexPoolLength ++;","\t\t\t_vertexCount ++;","\t\t\treturn vertex;","","\t\t}","","\t\treturn _vertexPool[ _vertexCount ++ ];","","\t}","","\tfunction getNextFaceInPool() {","","\t\tif ( _faceCount === _facePoolLength ) {","","\t\t\tvar face = new THREE.RenderableFace();","\t\t\t_facePool.push( face );","\t\t\t_facePoolLength ++;","\t\t\t_faceCount ++;","\t\t\treturn face;","","\t\t}","","\t\treturn _facePool[ _faceCount ++ ];","","","\t}","","\tfunction getNextLineInPool() {","","\t\tif ( _lineCount === _linePoolLength ) {","","\t\t\tvar line = new THREE.RenderableLine();","\t\t\t_linePool.push( line );","\t\t\t_linePoolLength ++;","\t\t\t_lineCount ++","\t\t\treturn line;","","\t\t}","","\t\treturn _linePool[ _lineCount ++ ];","","\t}","","\tfunction getNextSpriteInPool() {","","\t\tif ( _spriteCount === _spritePoolLength ) {","","\t\t\tvar sprite = new THREE.RenderableSprite();","\t\t\t_spritePool.push( sprite );","\t\t\t_spritePoolLength ++;","\t\t\t_spriteCount ++","\t\t\treturn sprite;","","\t\t}","","\t\treturn _spritePool[ _spriteCount ++ ];","","\t}","","\t//","","\tfunction painterSort( a, b ) {","","\t\tif ( a.z !== b.z ) {","","\t\t\treturn b.z - a.z;","","\t\t} else if ( a.id !== b.id ) {","","\t\t\treturn a.id - b.id;","","\t\t} else {","","\t\t\treturn 0;","","\t\t}","","\t}","","\tfunction clipLine( s1, s2 ) {","","\t\tvar alpha1 = 0, alpha2 = 1,","","\t\t// Calculate the boundary coordinate of each vertex for the near and far clip planes,","\t\t// Z = -1 and Z = +1, respectively.","\t\tbc1near =  s1.z + s1.w,","\t\tbc2near =  s2.z + s2.w,","\t\tbc1far =  - s1.z + s1.w,","\t\tbc2far =  - s2.z + s2.w;","","\t\tif ( bc1near >= 0 && bc2near >= 0 && bc1far >= 0 && bc2far >= 0 ) {","","\t\t\t// Both vertices lie entirely within all clip planes.","\t\t\treturn true;","","\t\t} else if ( ( bc1near < 0 && bc2near < 0 ) || ( bc1far < 0 && bc2far < 0 ) ) {","","\t\t\t// Both vertices lie entirely outside one of the clip planes.","\t\t\treturn false;","","\t\t} else {","","\t\t\t// The line segment spans at least one clip plane.","","\t\t\tif ( bc1near < 0 ) {","","\t\t\t\t// v1 lies outside the near plane, v2 inside","\t\t\t\talpha1 = Math.max( alpha1, bc1near / ( bc1near - bc2near ) );","","\t\t\t} else if ( bc2near < 0 ) {","","\t\t\t\t// v2 lies outside the near plane, v1 inside","\t\t\t\talpha2 = Math.min( alpha2, bc1near / ( bc1near - bc2near ) );","","\t\t\t}","","\t\t\tif ( bc1far < 0 ) {","","\t\t\t\t// v1 lies outside the far plane, v2 inside","\t\t\t\talpha1 = Math.max( alpha1, bc1far / ( bc1far - bc2far ) );","","\t\t\t} else if ( bc2far < 0 ) {","","\t\t\t\t// v2 lies outside the far plane, v2 inside","\t\t\t\talpha2 = Math.min( alpha2, bc1far / ( bc1far - bc2far ) );","","\t\t\t}","","\t\t\tif ( alpha2 < alpha1 ) {","","\t\t\t\t// The line segment spans two boundaries, but is outside both of them.","\t\t\t\t// (This can't happen when we're only clipping against just near/far but good","\t\t\t\t//  to leave the check here for future usage if other clip planes are added.)","\t\t\t\treturn false;","","\t\t\t} else {","","\t\t\t\t// Update the s1 and s2 vertices to match the clipped line segment.","\t\t\t\ts1.lerp( s2, alpha1 );","\t\t\t\ts2.lerp( s1, 1 - alpha2 );","","\t\t\t\treturn true;","","\t\t\t}","","\t\t}","","\t}","","};"]}]}]]},"ace":{"folds":[],"scrolltop":13208,"scrollleft":0,"selection":{"start":{"row":925,"column":2},"end":{"row":925,"column":2},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":43,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1426079772432,"hash":"e3c2a424de4b9f5a92885882f053bd70086c0422"}