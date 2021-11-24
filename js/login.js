const urlbase = "http://129.151.102.175:8080/api/user";

const crear = () => {
    //document.getElementById('txtNombre').value;
    const nombre = $.trim($('#name').val());
    const email = $.trim($('#email').val());
    const password = $.trim($('#pass').val());
    const confirmar = $.trim($('#pass2').val());

    if (password.length < 6){        
        mostrarMensaje("Error", "La contraseñas no coinciden", true); // Con errores
        alert("La contraseña debe tener mínimo 6 caracteres");
        return;
    } else if (password !== confirmar) {
        mostrarMensaje("Error", "La clave debe tener minimo 6 caracteres", true); // Con errores
        alert("Las contraseñas no coinciden");
    } else {
      const payload = {
        name: nombre,
        email: email,
        password: password,
      };
      $.ajax({
        url: `${urlbase}/new`,
        type: "POST",
        data: JSON.stringify(payload),
        dataType: "json",
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: {
          201: function () {
            mostrarMensaje("Confirmacion", "Usuario  creado exitosamente"); // Con errores
            alert("Usuario Creado");
          },
        },
      });
    }
}

const mostrarMensaje = (titulo, cuerpo, error) => {
    //console.log("error",error);
    document.getElementById("titulomensaje").innerHTML = titulo;
    $("#cuerpomensaje").html(cuerpo);
    $("#myToast").removeClass();
    if (error) {
        $("#myToast").addClass("toast bg-danger")
    } else {
        $("#myToast").addClass("toast bg-primary")
    }

    $("#myToast").toast("show");
}

const iniciarSesion = () => {
    //const loading = '<img src="https://icon-library.com/icon/spinner-icon-gif-10.html">';
    //$("#loading").html(loading);

    setTimeout(() => {
        autenticar();
    }, 2000);
}

const autenticar = () => {
    const email = $.trim($("#email").val());
    const password = $.trim($("#pass").val());
    console.log(email)

    if (email === "" || password === "") {
        mostrarMensaje('Error', 'Debe escribir el email y el password para ingresar', true);
        $("#loading").html("");
        return;
    }else {
      $.ajax({
        url: `${urlbase}/${email}/${password}`,
        type: "GET",
        dataType: "json",
        success: function (respuesta) {
          $("#loading").html("");
          console.log(respuesta);
          if (respuesta.id === null) {
            mostrarMensaje("Error", "Usuario y/o clave incorrectos", true);
          } else {
            mostrarMensaje("Bienvenido", "Ingreso Correcto");

            setTimeout(() => {
              //window.location.href = 'login.html'; //redireccionamiento a página principal del usuario
            }, 1000);
          }
        },
        error: function (xhr, status) {
          $("#loading").html("");
          console.log(xhr);
          console.log(status);
          mostrarMensaje("Error", "Error al validar", true);
        },
      });
    }
}