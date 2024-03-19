const palabras = [
  "AHORCADO",
  "UTN",
  "BANANO",
  "GATO",
  "PERRO",
  "LAPTOP",
  "PARANGUTIRIMICUARO",
];

var palabra = palabras[generarNum()];
var intentos = 0;
var ingresadas = document
  .getElementById("ingresadas")
  .getAttribute("placeholder");
var avance = "";

ocultar("#agregarPalabra");
//ocultar("#botonesInicio");
ocultar("#juego");
//Crear alertas personalizadas

function cancelar() {
  ocultarYmostrar("#agregarPalabra", "#botonesInicio");
}

function ventanaAgregar() {
  ocultarYmostrar("#botonesInicio", "#agregarPalabra");
}

function ocultarYmostrar(elemento1, elemento2) {
  ocultar(elemento1);
  mostrar(elemento2);
}

function ocultar(elemento) {
  document.querySelector(elemento).style.display = "none";
}

function mostrar(elemento) {
  document.querySelector(elemento).style.display = "";
}

function generarNum() {
  return Math.floor(Math.random() * (palabras.length - 1 - 0) + 1);
}

function inicio() {
  ocultarYmostrar("#juego", "#botonesInicio");
}

function jugar() {
  ocultarYmostrar("#botonesInicio", "#juego");
  teclado();
  agregarCampos(palabra);
}

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

function nuevoJuego() {
  borrarCampos();
  palabra = palabras[generarNum()];
  agregarCampos(palabra);
  document.getElementById("ingresadas").setAttribute("placeholder", "");
  intentos = 0;
  document.getElementById("jugador").src =
    "img/intentos/intento" + intentos + ".png";
}

function borrarCampos() {
  for (let i = 0; i < palabra.length; i++) {
    campo = document.getElementById(i);
    campo.remove();
  }
}

function agregarPalara() {
  nueva = document.querySelector(".input").value;
  if (nueva.length <= 8) {
    console.log(nueva);
    palabras.push(nueva.toUpperCase());
    // guardar();
    notificar(
      "success",
      'Palabra agregada con exito!',
      2000
    );
    jugar();
  } else {
    alert("Lo siento, no puede agregar una palabra de mas de 8 letras");
  }
}

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

function coincidencia(letra) {
  for (let i = 0; i < palabra.length; i++) {
    if (palabra[i] == letra) {
      document.getElementById(i).innerHTML = letra;
    }
  }
  avanzar();
}

function avanzar() {
  for (let i = 0; i < palabra.length; i++) {
    avance = avance + document.getElementById(i).innerHTML;
  }
  if (avance == palabra) {
    notificar(
      "success",
      '🥳 Felicidades, Ganaste!',
      2000
    );
  } else {
    avance = "";
  }
}

function agregarExtremidad() {
  intentos = intentos + 1;
  if (intentos <= 10) {
    refrescarJugador();
  } else {
    notificar(
      "error",
      '🥹 Lo siento, Perdiste',
      2000
    );
  }
}

function registrarLetra(letra) {
  ingresadas =
    document.getElementById("ingresadas").getAttribute("placeholder") +
    " " +
    letra;
  document.getElementById("ingresadas").setAttribute("placeholder", ingresadas);
}

function refrescarJugador() {
  document.getElementById("jugador").src =
    "img/intentos/intento" + intentos + ".png";
}

function desistir() {
  for (let i = 0; i < palabra.length; i++) {
    document.getElementById(i).innerHTML = palabra[i];
  }
  intentos = 10;
  document.getElementById("jugador").src =
    "img/intentos/intento" + intentos + ".png";
  notificar(
    "error",
    `Lo siento, Perdiste`,
    2000
  );
}

function notificar(tipo, mensaje, tiempo) {
  Swal.fire({
    title: "Error!",
    text: mensaje,
    icon: tipo,
    confirmButtonText: "Aceptar",
  });
  setTimeout(nuevoJuego, 2000);

  //   toast.querySelector(".toast-body").style.backgroundColor = color;
  //   toast.querySelector(".toast-body").innerHTML = mensaje;
  //   toast.classList.add("visible");
  //   setTimeout(borrar, tiempo);
  //   setTimeout(nuevoJuego, 2000);
}

function borrar() {
  toast.classList.remove("visible");
}
