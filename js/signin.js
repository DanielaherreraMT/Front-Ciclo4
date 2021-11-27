import { mostrarMensaje, campoEstaVacio, urlbase } from "./utils.js";

// Valida los atributos del usuario, entonces lo guarda
$(document).ready(function () {
    $("#btn-signin").click(function () {
        const nombre = $.trim($("#name").val());
        const email = $.trim($("#email").val());
        const password = $("#pass").val();
        const confirmar = $("#pass2").val()

        if (validaUsuario(nombre, email, password, confirmar) === false) {
            return;
        } else {
            // Verificar email no en uso
            $.get(urlbase + "/" + email, function (estaEnUso) {
                if (estaEnUso === false) {
                    const user = {
                        name: nombre,
                        email: email,
                        password: password,
                    };
                    $.ajax({
                        url: `${urlbase}/new`,
                        type: "POST",
                        data: JSON.stringify(user),
                        dataType: "json",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        statusCode: {
                            201: function () {
                                mostrarMensaje("Confirmacion", "Usuario  creado exitosamente", false);
                                limpiarCampos($('#name'), $('#email'), $('#pass'), $('#pass2'));
                            },
                        },
                    }
                    )
                } else {
                    mostrarMensaje("Error", "El email proporcionado ya se encuentra en uso", true);
                }
            })
        }
    })
})


// Valida que el email sea valido, la obligatoriedad de los campos, que las contraseñas coincidan y su longitud
function validaUsuario(nombre, email, password, confirmar) {
    const regExEmail =
        /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

    if (
        campoEstaVacio(nombre) === true || campoEstaVacio(email) === true ||
        campoEstaVacio(password) === true || campoEstaVacio(confirmar) === true
    ) {
        mostrarMensaje(
            "Error",
            "Todos los campos son requeridos, verifique e intente nuevamente",
            true
        );
        return false;
    }
    else if (regExEmail.test(email) === false) {
        mostrarMensaje(
            "Error",
            "El formato de email es inválido, verifiquelo e intente de nuevo",
            true
        );
        return false;
    }
    else if (password.length < 8 || confirmar.length < 8) {
        mostrarMensaje("Error", "La contraseña debe tener minimo 8 caracteres", true);
        return false;
    } else if (password !== confirmar) {
        mostrarMensaje("Error", "La contraseñas no coinciden", true);
        return false;
    }
    return true;
}

// Limpia los campos del formulario
function limpiarCampos(nombre, email, pass, passConfirm) {
    $(nombre).val("");
    $(email).val("");
    $(pass).val("");
    $(passConfirm).val("");
}