//const fs = require('fs');
//const t_file = "Conformer3D_CID_6325.json";
//let file = JSON.parse(fs.readFileSync(t_file, "utf8"));
let molecula;

// Class Atom contains information about one atom in molecula
//
// num: number in periodic table
// symbol: symbol in periodic table
// radius: its radius
// color: its color
class Atom {
	constructor(num, symbol, radius, color) {
		this.num = num;
		this.symbol = symbol;
		this.radius = radius;
		this.color = color;
	}
}


// This function is like a database. It gets a number of atom in periodic table
// and returns Atom object with its number, symbol and radius.
// Unknown atoms marks as "Dummy", has periodic number = 0, radius = 100 and black color.
const getAtom = (num) => {
	if (num === 1) {return new Atom(1, "H", 120, 0xffffff);} // white
	else if (num === 3) {return new Atom(3, "Li", 182, 0xff4500);} // orangered
	else if (num === 6) {return new Atom(6, "C", 170, 0x808080);} // webgray
	else if (num === 7) {return new Atom(7, "N", 155, 0x0000ff);} // blue
	else if (num === 8) {return new Atom(8, "O", 152, 0xff0000);} // red
	else if (num === 9) {return new Atom(9, "F", 147, 0xff00ff);} // magenta
	else if (num === 11) {return new Atom(11, "Na", 227, 0x1e90ff);} // dodgerblue
	else if (num === 12) {return new Atom(12, "Mg", 173, 0x008000);} // webgreen
	else if (num === 14) {return new Atom(14, "Si", 210, 0xdaa520);} // goldenrod
	else if (num === 15) {return new Atom(15, "P", 180, 0xffa500);} // orange
	else if (num === 16) {return new Atom(16, "S", 180, 0x9acd32);} // yellowgreen
	else if (num === 17) {return new Atom(17, "Cl", 175, 0x00ff00);} // green
	else if (num === 19) {return new Atom(19, "K", 275, 0xff1493);} // deeppink
	else if (num === 35) {return new Atom(35, "Br", 185, 0xcd853f);} // peru
	else if (num === 53) {return new Atom(53, "I", 198, 0xee82ee);} // violet
	else {return new Atom(0, "Dummy", 100, 0x00ffff);} // cyan
}

// Class AtomCoord contains an Atom object and coordinates of its
// center in given molecula.
//
// atom: Atom object
// coords: list of 3 float numbers (x, y, z) as coords of the center of atom
class AtomCoord {
	constructor(atom, coords) {
		this.atom = atom;
		this.coords = coords;
	}
}

// Class Bond represents bonds between atoms in given molecula.
//
// atom1, atom2: two integer numbers of atoms in "atoms" list of Molecula object
// that connected by bond
// type: an integer number represented a type of the bond (1: single bond, 2: double bond, etc.)
class Bond {
	constructor(atom1, atom2, type) {
		this.atom1 = atom1;
		this.atom2 = atom2;
		this.type = type;
	}
}

// Class Molecula contains a list of atoms (with coordinates) and a list of bonds.
// Represents full information about structure of given molecula.
//
// atoms: list of AtomCoord objects
// bonds: list of Bond objects
class Molecula {
	constructor(atoms, bonds) {
		this.atoms = atoms;
		this.bonds = bonds;
	}
}

// This function parses JSON file, gets all necessary information about
// atoms and returns it as list of Atom objects.
//
// file: JSON object
// atomList: list of Atom objects
const parseAtoms = (file) => {
	let atomList = [];
	let elements = file.PC_Compounds[0].atoms.element;
	let n = elements.length;
	for (let i = 0; i < n; i++) {
		elements[i] = getAtom(elements[i]);
	}

	let coords = file.PC_Compounds[0].coords[0].conformers[0];
	for (let i = 0; i < n; i++) {
		point = [coords.x[i], coords.y[i], coords.z[i]];
		atomList.push(new AtomCoord(elements[i], point));

	}

	return atomList;
}

// This function parses JSON file, gets all necessary information about
// bonds and returns it as list of Bond objects.
//
// file: JSON object
// atomList: list of Bond objects
const parseBonds = (file) => {
	let bondList = [];
	let bonds = file.PC_Compounds[0].bonds;
	let n = bonds.aid1.length;
	for (let i = 0; i < n; i++) {
		bondList.push(new Bond(bonds.aid1[i], bonds.aid2[i], bonds.order[i]));
	}
	return bondList
}

const parseMolecula = (jsonData) => {
	//let json_molecula = jsonData.PC_Compounds[0];

	let atomList = parseAtoms(jsonData);  // list of Atom objects
	let bondList = parseBonds(jsonData);  // list of Bond objects

	molecula = new Molecula(atomList, bondList); // Molecula object
	// This object will be used to create all necessary information for
	// graphic representation of the molecula.
	// console.log(molecula);
}

//alert(molecula);
//console.log(molecula);
