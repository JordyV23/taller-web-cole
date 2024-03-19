/**
 * Un arreglo de palabras para el juego del ahorcado.
 * @type {string[]}
 */
const palabras = [
  "AHORCADO",
  "UTN",
  "BANANO",
  "GATO",
  "PERRO",
  "LAPTOP",
  "PARANGUTIRIMICUARO",
];

/**
 * Selecciona una palabra aleatoria del arreglo `palabras`.
 * @type {string}
 */
var palabra = palabras[generarNum()];

/**
 * Número de intentos realizados por el jugador.
 * @type {number}
 */
var intentos = 0;

/**
 * Letras ingresadas por el jugador.
 * @type {string}
 */
var ingresadas = document
  .getElementById("ingresadas")
  .getAttribute("placeholder");

/**
 * Cadena que representa el progreso del juego.
 * @type {string}
 */
var avance = "";

// Funciones de utilidad para ocultar y mostrar elementos

/**
 * Oculta el elemento con el selector "#agregarPalabra" y el elemento con el selector "#juego".
 */
ocultar("#agregarPalabra");
ocultar("#juego");

/**
 * Cancela la ventana de agregar palabra y muestra los botones de inicio.
 */
function cancelar() {
  ocultarYmostrar("#agregarPalabra", "#botonesInicio");
}

/**
 * Muestra la ventana para agregar una nueva palabra.
 */
function ventanaAgregar() {
  ocultarYmostrar("#botonesInicio", "#agregarPalabra");
}

/**
 * Oculta el elemento con el selector `elemento1` y muestra el elemento con el selector `elemento2`.
 * @param {string} elemento1 - Selector del elemento a ocultar.
 * @param {string} elemento2 - Selector del elemento a mostrar.
 */
function ocultarYmostrar(elemento1, elemento2) {
  ocultar(elemento1);
  mostrar(elemento2);
}

/**
 * Oculta el elemento con el selector dado.
 * @param {string} elemento - Selector del elemento a ocultar.
 */
function ocultar(elemento) {
  document.querySelector(elemento).style.display = "none";
}

/**
 * Muestra el elemento con el selector dado.
 * @param {string} elemento - Selector del elemento a mostrar.
 */
function mostrar(elemento) {
  document.querySelector(elemento).style.display = "";
}

/**
 * Genera un número aleatorio entre 0 y la longitud del arreglo `palabras` - 1.
 * @returns {number} Un número aleatorio dentro del rango válido.
 */
function generarNum() {
  return Math.floor(Math.random() * (palabras.length - 1 - 0) + 1);
}

/**
 * Inicia el juego ocultando los botones de inicio y mostrando el juego.
 */
function inicio() {
  ocultarYmostrar("#juego", "#botonesInicio");
}

/**
 * Comienza un nuevo juego.
 * @param {string} [ocultar="#botonesInicio"] - Selector del elemento a ocultar.
 * @param {string} [mostrar="#juego"] - Selector del elemento a mostrar.
 */
function jugar(ocultar = "#botonesInicio", mostrar = "#juego") {
  ocultarYmostrar(ocultar, mostrar);
  teclado();
  agregarCampos(palabra);
}

/**
 * Agrega campos de texto para representar las letras de la palabra.
 * @param {string} palabra - La palabra a adivinar.
 */
function agregarCampos(palabra) {
  const tablero = document.querySelector(".tablero");
  for (let i = 0; i < palabra.length; i++) {
    const campo = document.createElement("TEXTAREA");
    campo.classList.add("letra");
    campo.setAttribute("id", i);
    campo.setAttribute("cols", 1);
    campo.setAttribute("rows", 1);
    campo.setAttribute("disabled", "");
    tablero.appendChild(campo);
  }
}

/**
 * Agrega un event listener para detectar pulsaciones de teclas.
 */
function teclado() {
  document.addEventListener(
    "keydown",
    (event) => {
      var tecla = event.key.toUpperCase();
      console.log(tecla.charCodeAt());
      if (tecla.charCodeAt(0) >= 65 && tecla.charCodeAt(0) <= 90) {
        validarLetra(tecla);
      }
    },
    false
  );
}

/**
 * Inicia un nuevo juego.
 */
function nuevoJuego() {
  borrarCampos();
  palabra = palabras[generarNum()];
  agregarCampos(palabra);
  document.getElementById("ingresadas").setAttribute("placeholder", "");
  intentos = 0;
  document.getElementById("jugador").src =
    "img/intentos/intento" + intentos + ".png";
}

/**
 * Elimina los campos de texto para las letras de la palabra.
 */
function borrarCampos() {
  for (let i = 0; i < palabra.length; i++) {
    campo = document.getElementById(i);
    campo.remove();
  }
}

/**
 * Agrega una nueva palabra al arreglo `palabras`.
 */
function agregarPalara() {
  nueva = document.querySelector(".input").value;
  if (nueva.length <= 8) {
    palabras.push(nueva.toUpperCase());
    notificar("success", "Palabra agregada con exito!", "Excelente!");
    jugar("#agregarPalabra");
  } else {
    alert("Lo siento, no puede agregar una palabra de mas de 8 letras");
  }
}

/**
 * Valida si la letra ingresada está en la palabra a adivinar.
 * @param {string} letra - La letra ingresada por el usuario.
 */
function validarLetra(letra) {
  if (palabra.includes(letra)) {
    coincidencia(letra);
  } else {
    if (ingresadas.indexOf(letra) == -1) {
      agregarExtremidad();
      registrarLetra(letra);
    }
  }
}

/**
 * Muestra las coincidencias de la letra en los campos de texto correspondientes.
 * @param {string} letra - La letra a mostrar.
 */
function coincidencia(letra) {
  for (let i = 0; i < palabra.length; i++) {
    if (palabra[i] == letra) {
      document.getElementById(i).innerHTML = letra;
    }
  }
  avanzar();
}

/**
 * Actualiza el progreso del juego.
 */
function avanzar() {
  for (let i = 0; i < palabra.length; i++) {
    avance = avance + document.getElementById(i).innerHTML;
  }
  if (avance == palabra) {
    notificar("success", "🥳 Felicidades, Ganaste!", "Buenas Noticias!");
  } else {
    avance = "";
  }
}

/**
 * Agrega una extremidad al muñeco del ahorcado.
 */
function agregarExtremidad() {
  intentos = intentos + 1;
  if (intentos <= 10) {
    refrescarJugador();
  } else {
    notificar("error", "🥹 Lo siento, Perdiste", "Lo siento Mucho");
  }
}

/**
 * Registra la letra ingresada por el usuario.
 * @param {string} letra - La letra ingresada por el usuario.
 */
function registrarLetra(letra) {
  ingresadas =
    document.getElementById("ingresadas").getAttribute("placeholder") +
    " " +
    letra;
  document.getElementById("ingresadas").setAttribute("placeholder", ingresadas);
}

/**
 * Actualiza la imagen del muñeco del ahorcado según los intentos.
 */
function refrescarJugador() {
  document.getElementById("jugador").src =
    "img/intentos/intento" + intentos + ".png";
}

/**
 * Muestra la palabra a adivinar y finaliza el juego como perdido.
 */
function desistir() {
  for (let i = 0; i < palabra.length; i++) {
    document.getElementById(i).innerHTML = palabra[i];
  }
  intentos = 10;
  document.getElementById("jugador").src =
    "img/intentos/intento" + intentos + ".png";
  notificar("error", `Lo siento, Perdiste`, "Lo siento Mucho");
}

/**
 * Muestra una notificación al usuario y comienza un nuevo juego después de 2 segundos.
 * @param {string} tipo - El tipo de notificación ("success", "error", etc.).
 * @param {string} mensaje - El mensaje a mostrar en la notificación.
 * @param {string} titulo - El título de la notificación.
 */
function notificar(tipo, mensaje, titulo) {
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: tipo,
    confirmButtonText: "Aceptar",
  });
  setTimeout(nuevoJuego, 2000);
}

/**
 * Borra el contenido de un elemento con la clase "toast".
 */
function borrar() {
  toast.classList.remove("visible");
}