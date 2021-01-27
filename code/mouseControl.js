let moleculaX = 0, moleculaY = 0, isFocus = false;


let onDocumentMouseDOWN = (event) => {
    isFocus = true;
}


let onDocumentMouseMOVE = (event) => {
    if (isFocus && groupOfAtoms) {
        deltaX = event.movementX;
        deltaY = event.movementY;
        if (deltaX || deltaY) {
            moleculaY += deltaX * 0.01;
            moleculaX += deltaY * 0.01;
        }
    }
}


let onDocumentMouseUP = (event) => {
    isFocus = false;
}
