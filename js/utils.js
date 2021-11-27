// Url del end-point rest
const urlbase = "http://localhost:8080/api/user";

// RegEx para validar un direccion de email
const regExEmail =
    /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

// Se llama cada que se quiera mostrar mensaje de error/confirmacion emergente
const mostrarMensaje = (titulo, cuerpo, error) => {
    document.getElementById("titulomensaje").innerHTML = titulo;
    $("#cuerpomensaje").html(cuerpo);
    $("#myToast").removeClass();
    if (error) {
        $("#myToast").addClass("toast bg-danger");
    } else {
        $("#myToast").addClass("toast bg-primary");
    }

    $("#myToast").toast("show");
};

// Regresa boolean, verifica si un campo se dejo en blanco
function campoEstaVacio(valor) {
    return (valor === null || valor.trim() === "");
}

export { mostrarMensaje, campoEstaVacio, urlbase, regExEmail };