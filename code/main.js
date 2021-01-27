let gl, canvas, current_molecula, jsonData, status = document.getElementById("status");


const start = () => {
	canvas = document.getElementById("glcanvas");

	gl = initWebGL(canvas);      // инициализация контекста GL

	// продолжать только если WebGL доступен и работает

	if (gl) {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // установить в качестве цвета очистки буфера цвета черный, полная непрозрачность
		gl.enable(gl.DEPTH_TEST);                               // включает использование буфера глубины
		gl.depthFunc(gl.LEQUAL);                                // определяет работу буфера глубины: более ближние объекты перекрывают дальние
		gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // очистить буфер цвета и буфер глубины.
	}
}


const initWebGL = (canvas) => {
	gl = null;

	try {
		// Попытаться получить стандартный контекст. Если не получится, попробовать получить экспериментальный.
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	}
    catch(e) {}

    // Если мы не получили контекст GL, завершить работу
    if (!gl) {
	    alert("Unable to initialize WebGL. Your browser may not support it.");
	    gl = null;
    }

    return gl;
}


const getJSON = (url, callback) => {
	let xhr = new XMLHttpRequest();

	xhr.timeout = 60000;
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	// функция, вызывающаяся при ответе сервера на запрос
	xhr.onload = function() {

		let status = xhr.status;

		if (status === 200) {
			callback(null, xhr.response);
		} else {
			callback(status);
		}
	};
	// запрос серверу
	xhr.send();
};

// функция вызывается в случае ввода текста в поле для идентификации молекулы
const getMolecula = () => {
	status.innerHTML = "STATUS: GETTING DATA FROM SERVER";
	let text = document.getElementById("searchbox").value;
	if (text) {
		current_molecula = text;
		//создание ссылки
		let link = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/" + current_molecula + "/JSON?record_type=3d";

		getJSON(link, function(error, data) {
			if (error != null) {
				alert(error);
			} else {
				jsonData = data;
				status.innerHTML = "STATUS: PREPARING FOR RENDERING";
				parseMolecula(jsonData);
				initThreeJS();
			}
		});
	}
}


// // "перезагрузка" страницы
// const resetWindow = () => {
// 	while (scene.children.length > 0) {
// 		scene.remove(scene.children[0]);
// 	}
// 	status.innerHTML = "STATUS: WAITING FOR INIT";
// }
