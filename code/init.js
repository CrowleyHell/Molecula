let scene, camera, renderer, width, height, radiusOfBoundCylinder = 0.1, groupOfAtoms, light;


// система координат three.js отличается от СК, в которой заданы исходные данные
// входные данные -> итоговые данные
// x -> z
// y -> x
// z -> y
const initThreeJS = () => {
	// создание сцены, ее настройка
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);
	width = window.innerWidth * 0.8;
	height = window.innerHeight * 0.7;
	camera = new THREE.PerspectiveCamera(90, width / height, 0.001, 25);
	renderer = new THREE.WebGLRenderer({canvas: glcanvas});
	
	function resize() {
		if (window.innerWidth * 0.8 !== width || window.innerHeight * 0.7 !== height) {
			width = window.innerWidth * 0.8;
			height = window.innerHeight * 0.7;
			renderer.setSize(width, height, false);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		}
	}
	
	function render() {
		if (groupOfAtoms) {
			groupOfAtoms.rotation.set(moleculaX, moleculaY, 0);
		}
		resize();  
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}
	
	render();	
	
	initCamera();

	status.innerHTML = "STATUS: READY FOR MODE SELECTION";
	document.addEventListener( 'mousedown', onDocumentMouseDOWN, false );
	document.addEventListener( 'mousemove', onDocumentMouseMOVE, false );
	document.addEventListener( 'mouseup', onDocumentMouseUP, false );

	// режим по умолчанию
	drawBallStick();
}

const clearObject = (object) => {
	while (object.children.length > 0) {
		clearObject(object.children[0]);
		object.remove(object.children[0]);
	}
	if (object.geometry) {
		object.geometry.dispose()
	}
	if (object.material) {
		//in case of map, bumpMap, normalMap, envMap ...
		Object.keys(object.material).forEach(prop => {
			if (!object.material[prop]) {
				return;
			}
			if (object.material[prop] !== null && typeof object.material[prop].dispose === 'function') {
				object.material[prop].dispose();
			}
		});
		object.material.dispose();
	}
}