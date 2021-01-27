const initCamera = () => {
    // шаг для перемещения
    let delta = 0.2;
    // шан для поворота
    let theta = Math.PI / 36;

    // задание омей координат
    let xAxis = new THREE.Vector3(1, 0, 0);
    let yAxis = new THREE.Vector3(0, 1, 0);
    let zAxis = new THREE.Vector3(0, 0, 1);

    // управление камерой
    // w - вперед, s - назад
    // a - влево, d - вправо
    // q - вниз, e - вверх
    // вращение камерой по осям (в одну/другую сторону)- z/x, c/v, b/n
    window.addEventListener('keydown', function(event) {
        event.preventDefault();
        switch (event.keyCode) {
            // w
            case 87:
                camera.translateOnAxis(zAxis, -delta);
                light.translateOnAxis(zAxis, -delta);
                break;
            // s
            case 83:
                camera.translateOnAxis(zAxis, delta);
                light.translateOnAxis(zAxis, delta);
                break;
            // a
            case 65:
                camera.translateOnAxis(xAxis, -delta);
                light.translateOnAxis(xAxis, -delta);
                break;
            // d
            case 68:
                camera.translateOnAxis(xAxis, delta);
                light.translateOnAxis(xAxis, delta);
                break;
            // q
            case 81:
                camera.translateOnAxis(yAxis, -delta);
                light.translateOnAxis(yAxis, -delta);
                break;
            // e
            case 69:
                camera.translateOnAxis(yAxis, delta);
                light.translateOnAxis(yAxis, delta);
                break;

            // z
            case 90:
                camera.rotateOnAxis(xAxis, theta);
                break;
            // x
            case 88:
                camera.rotateOnAxis(xAxis, -theta);
                break;
            // c
            case 67:
                camera.rotateOnAxis(yAxis, theta);
                break;
            // v
            case 86:
                camera.rotateOnAxis(yAxis, -theta);
                break;
            // b
            case 66:
                camera.rotateOnAxis(zAxis, theta);
                break;
            // n
            case 78:
                camera.rotateOnAxis(zAxis, -theta);
                break;
        }
    });
}