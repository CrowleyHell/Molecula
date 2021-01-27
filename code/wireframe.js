const drawWireframe = () => {
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

//Отрисовка одинарной связи
    if (currentBond.type === 1){
      //Первая половина соединения
      let geometry1 = new THREE.CylinderGeometry(radiusOfBoundCylinder/50, radiusOfBoundCylinder/50,
                          cylinderHeight / 2, 30);
      let material1 = new THREE.MeshPhongMaterial({color: startAtom.atom.color});
     	let cylinder1 = new THREE.Mesh(geometry1, material1);
     	cylinder1.position.set(startAtom.coords[1] + x / 4, startAtom.coords[2] + y / 4, startAtom.coords[0] + z / 4);
     	cylinder1.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
     	// scene.add(cylinder1);
		groupOfAtoms.add(cylinder1);

      //Вторая половина соединения
      let geometry2 = new THREE.CylinderGeometry(radiusOfBoundCylinder/50, radiusOfBoundCylinder/50,
    												   cylinderHeight / 2, 30);
    	let material2 = new THREE.MeshPhongMaterial({color: finishAtom.atom.color});
    	let cylinder2 = new THREE.Mesh(geometry2, material2);
  		cylinder2.position.set(startAtom.coords[1] + x * 0.75, startAtom.coords[2] + y * 0.75,
  							   startAtom.coords[0] + z * 0.75);
  		cylinder2.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
    	// scene.add(cylinder2);
		groupOfAtoms.add(cylinder2);

      //Отрисовка двойной связи
    } else if (currentBond.type === 2){
      //Первая половина соединения
      let geometry1 = new THREE.CylinderGeometry(radiusOfBoundCylinder/70, radiusOfBoundCylinder/70,
                         cylinderHeight / 2, 30);
      let material1 = new THREE.MeshPhongMaterial({color: startAtom.atom.color});
    	let cylinder1 = new THREE.Mesh(geometry1, material1);
      let cylinder11 = new THREE.Mesh(geometry1, material1);
    	cylinder1.position.set(startAtom.coords[1] + (x / 4), startAtom.coords[2] + (y / 4) + 0.01, startAtom.coords[0] + (z / 4));
  		cylinder1.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
      cylinder11.position.set(startAtom.coords[1] + (x / 4), startAtom.coords[2] + (y / 4) - 0.01, startAtom.coords[0] + (z / 4));
    	cylinder11.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
      // scene.add(cylinder1);
      // scene.add(cylinder11);
		groupOfAtoms.add(cylinder1);
		groupOfAtoms.add(cylinder11);

      //Вторая половина соединения
      let geometry2 = new THREE.CylinderGeometry(radiusOfBoundCylinder/70, radiusOfBoundCylinder/70,
    											   cylinderHeight / 2, 30);
    	let material2 = new THREE.MeshPhongMaterial({color: finishAtom.atom.color});
    	let cylinder2 = new THREE.Mesh(geometry2, material2);
      let cylinder22 = new THREE.Mesh(geometry2, material2);
    	cylinder2.position.set(startAtom.coords[1] + x * 0.75, startAtom.coords[2] + (y * 0.75) + 0.01,
    						   startAtom.coords[0] + z * 0.75);
  		cylinder2.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
      cylinder22.position.set(startAtom.coords[1] + x * 0.75, startAtom.coords[2] + (y * 0.75) - 0.01,
    						   startAtom.coords[0] + z * 0.75);
    	cylinder22.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
    	// scene.add(cylinder2);
        // scene.add(cylinder22);
		groupOfAtoms.add(cylinder2);
		groupOfAtoms.add(cylinder22);

		//Отрисовка тройной связи
	} else if (currentBond.type === 3) {
			//Первая половина соединения
			let geometry1 = new THREE.CylinderGeometry(radiusOfBoundCylinder/70, radiusOfBoundCylinder/70,
											 cylinderHeight / 2, 30);
			let material1 = new THREE.MeshPhongMaterial({color: startAtom.atom.color});
			let cylinder1 = new THREE.Mesh(geometry1, material1);
			let cylinder11 = new THREE.Mesh(geometry1, material1);
			let cylinder111 = new THREE.Mesh(geometry1, material1);
			cylinder1.position.set(startAtom.coords[1] + (x / 4) + 0.0087, startAtom.coords[2] + (y / 4) + 0.0087, startAtom.coords[0] + (z / 4));
			cylinder1.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
			cylinder11.position.set(startAtom.coords[1] + (x / 4) - 0.0087, startAtom.coords[2] + (y / 4) + 0.0087, startAtom.coords[0] + (z / 4));
			cylinder11.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
			cylinder111.position.set(startAtom.coords[1] + (x / 4), startAtom.coords[2] + (y / 4) - 0.0087, startAtom.coords[0] + (z / 4));
			cylinder111.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
			// scene.add(cylinder1);
			// scene.add(cylinder11);
		groupOfAtoms.add(cylinder1);
		groupOfAtoms.add(cylinder11);
		groupOfAtoms.add(cylinder111);

				//Вторая половина соединения
			let geometry2 = new THREE.CylinderGeometry(radiusOfBoundCylinder/70, radiusOfBoundCylinder/70,
													 cylinderHeight / 2, 30);
			let material2 = new THREE.MeshPhongMaterial({color: finishAtom.atom.color});
			let cylinder2 = new THREE.Mesh(geometry2, material2);
			let cylinder22 = new THREE.Mesh(geometry2, material2);
			let cylinder222 = new THREE.Mesh(geometry2, material2);
			cylinder2.position.set(startAtom.coords[1] + (x * 0.75) + 0.0087, startAtom.coords[2] + (y * 0.75) + 0.0087,
								 startAtom.coords[0] + z * 0.75);
			cylinder2.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
			cylinder22.position.set(startAtom.coords[1] + (x * 0.75) - 0.0087, startAtom.coords[2] + (y * 0.75) + 0.0087,
								 startAtom.coords[0] + (z * 0.75));
			cylinder22.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
			cylinder222.position.set(startAtom.coords[1] + (x * 0.75), startAtom.coords[2] + (y * 0.75) - 0.0087,
								 startAtom.coords[0] + (z * 0.75));
			cylinder222.quaternion.setFromUnitVectors(axis, direction.clone().normalize());
			// scene.add(cylinder2);
			// scene.add(cylinder22);
		groupOfAtoms.add(cylinder2);
		groupOfAtoms.add(cylinder22);
		groupOfAtoms.add(cylinder222);
		}

	}

  //Отрисовка атомов
    for (let i = 0; i < molecula.atoms.length; i++){
	    let sphereGeom = new THREE.SphereGeometry(molecula.atoms[i].atom.radius/7000, 30, 30);
	    let sphereMat = new THREE.MeshPhongMaterial({color: molecula.atoms[i].atom.color});
	    let sphere = new THREE.Mesh(sphereGeom, sphereMat);
	    sphere.position.set(molecula.atoms[i].coords[1], molecula.atoms[i].coords[2], molecula.atoms[i].coords[0]);
	    // scene.add(sphere);
		groupOfAtoms.add(sphere);
    }
	scene.add(groupOfAtoms);
	// стартовая позиция камеры
	camera.position.z = maxZ + 2;
	// исправление бага с размытосью первоначальной отрисовки молекулы
	window.innerHeight += 1;

	// освещение (позади наблюдателя точечный источник света)
	light = new THREE.PointLight(0xffffff, 3, 0, 2);
	light.position.set(0, 0.5, 10);
	scene.add(light);
}
