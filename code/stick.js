const drawStick = () => {
	// очистка сцены перед отрисовкой
	clearObject(scene);
	groupOfAtoms = new THREE.Group();
	
	let count = molecula.bonds.length;
	// определяем наибольшую z координату молекул для определения оптимального положения камеры
	let maxZ = -100;
	// цикл для отрисовки кадой связи молекулы
	for (let i = 0; i < count; i++) {
		// получение информации о молекулах, соединяемых текущей связью
		let currentBond = molecula.bonds[i];
		let startAtom = molecula.atoms[currentBond.atom1 - 1];
		let finishAtom = molecula.atoms[currentBond.atom2 - 1];
		
		if (startAtom.coords[0] > maxZ) {
			maxZ = startAtom.coords[0];
		}
		if (finishAtom.coords[0] > maxZ) {
			maxZ = finishAtom.coords[0];
		}
						
		// вычисление параметров цилиндра, изображающего связь между молекулами
		let x = finishAtom.coords[1] - startAtom.coords[1], 
		y = finishAtom.coords[2] - startAtom.coords[2], 
		z = finishAtom.coords[0] - startAtom.coords[0];
		let cylinderHeight = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
		let axis = new THREE.Vector3(0, 1, 0);
		let direction = new THREE.Vector3(x, y, z);
		
		// также к каждому цилиндру с обоих концов будет добавлена сфера, для закругления плоских граней и корректного отображения состывок цилндров, изображающих связи
		// создание первой половины цилиндра (так как разные половинки разных цветов (по цвету атома, к которому они примыкают))
		let geometry1 = new THREE.CylinderGeometry(radiusOfBoundCylinder, radiusOfBoundCylinder, 
												   cylinderHeight / 2, 30);
		let material1 = new THREE.MeshPhongMaterial({color: startAtom.atom.color});
		let cylinder1 = new THREE.Mesh(geometry1, material1);
		cylinder1.position.set(startAtom.coords[1] + x / 4, startAtom.coords[2] + y / 4, startAtom.coords[0] + z / 4);
		cylinder1.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
		// scene.add(cylinder1);
		groupOfAtoms.add(cylinder1);
		
		// сфера к первому цилиндру
		let geometry11 = new THREE.SphereGeometry(radiusOfBoundCylinder, 30, 30);
		let sphere11 = new THREE.Mesh(geometry11, material1);
		sphere11.position.set(startAtom.coords[1], startAtom.coords[2], startAtom.coords[0]);
		// scene.add(sphere11);
		groupOfAtoms.add(sphere11);
		
		// вторая половинка
		let geometry2 = new THREE.CylinderGeometry(radiusOfBoundCylinder, radiusOfBoundCylinder, 
												   cylinderHeight / 2, 30);
		let material2 = new THREE.MeshPhongMaterial({color: finishAtom.atom.color});
		let cylinder2 = new THREE.Mesh(geometry2, material2);
		cylinder2.position.set(startAtom.coords[1] + x * 0.75, startAtom.coords[2] + y * 0.75, 
							   startAtom.coords[0] + z * 0.75);
		cylinder2.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
		// scene.add(cylinder2);
		groupOfAtoms.add(cylinder2);
		
		// сфера ко второму цилиндру
		let geometry21 = new THREE.SphereGeometry(radiusOfBoundCylinder, 30, 30);
		let sphere21 = new THREE.Mesh(geometry21, material2);
		sphere21.position.set(finishAtom.coords[1], finishAtom.coords[2], finishAtom.coords[0]);
		// scene.add(sphere21);
		groupOfAtoms.add(sphere21);
	}
	scene.add(groupOfAtoms);
	// стартовая позиция камеры
	camera.position.z = maxZ + 2;
	// исправление бага с размытосью первоначальной отрисовки молекулы
	window.innerHeight += 1;

	// освещение (позади наблюдателя точечный источник света)
	light = new THREE.PointLight(0xffffff, 1, 0, 2);
	light.position.set(0, 0.5, 10);
	scene.add(light);
}
