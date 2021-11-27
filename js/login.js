import { mostrarMensaje, campoEstaVacio, urlbase, regExEmail } from "./utils.js";

// Se ejecuta cuando se da click en "Ingresar" valida, entonces valida que un usuario existe
$(document).ready(function () {
  $("#btn-login").click(function () {
    const email = $.trim($("#email").val());
    const password = $("#pass").val()

    if (validaDatosLogin(email, password) === true) {
      $.ajax(
        {
          url: `${urlbase}/${email}/${password}`,
          type: "GET",
          dataType: "json",
        })
        .done(function (user) {
          $("#loading").html("");
          if (user.id === null) {
            mostrarMensaje("Error", "Usuario o contraseña incorrectos", true);
          } else {
            mostrarMensaje("Bienvenido", "Bienvenido " + user.name);
          }
        });
    }
  })
})

// Regresa boolean, valida los campos form login
function validaDatosLogin(email, password) {
  if (campoEstaVacio(email) === true || campoEstaVacio(password) === true) {
    mostrarMensaje('Error', 'El email y la contraseña son requeridos para ingresar', true);
    return false;
  } else if (regExEmail.test(email) === false) {
    mostrarMensaje(
      "Error",
      "El formato de email es inválido, verifiquelo e intente de nuevo",
      true);
    return false;
  }
  return true
}