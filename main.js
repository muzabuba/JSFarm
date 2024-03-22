import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xbfd1e5 );

const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 5, 5, 5 );
camera.lookAt( 0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
document.addEventListener( 'click', onMouseClick );

function onMouseClick() {
    console.log('12');
}

const geometry = new THREE.BoxGeometry( 1, 0, 1 );
const edges = new THREE.EdgesGeometry( geometry );
const material = new THREE.MeshBasicMaterial( { color: '#808080' } );

function generateMaps(width, height) {
    let arrX = [];

    for (let i = 0; i < width; i++) { 
        let arrZ = [];
        for (let j = 0; j < height; j++) { 
            arrZ[j] = {x: i, y: 0, z: j};
        }

        arrX[i] = arrZ;
    }

    return arrX;
}

let map = generateMaps(3, 3);

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
   
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 
       
        line.position.x = map[i][j].x; 
        line.position.y = map[i][j].y; 
        line.position.z = map[i][j].z; 

        const cube = new THREE.Mesh( geometry, material );

        cube.position.x = map[i][j].x; 
        cube.position.y = map[i][j].y; 
        cube.position.z = map[i][j].z; 

        scene.add(line);
        scene.add(cube);
    }
}

function animate() {
    requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();