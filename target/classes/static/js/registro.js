/**
 * Cargar la libreria de Jquery y ubicar el cursor en el campo de login
 */
 $(document).ready(function () {
    estadoInicial()
});
/**
 * Intenta autenticar al usuario en la aplicación
 */
function registrar() {
    // captura datos de la pagina registro
    let email = $("#useremail").val()
    let password = $("#password").val()
    let name = $("#username").val()
    let lastname = $("#userlastname").val()
    let repeatpassword = $("#passwordrepeat").val()
    if (password != repeatpassword) {
        alert("¡Contraseña no coincide..!");
        $("#passwordrepeat").focus()
    } else {
        // transformar a un objeto json,  para ello creo un objeto java script con la notacion llave valor en una variable ejemplo datos:
        let datos = {
            email: $("#useremail").val(),
            password: $("#password").val(),
            name: $("#username").val(),
            lastname: $("#userlastname").val(),
        }
        // nuestro servicio web no espera un Javascript, espera un objeto en formato json
        // se convierte de javascript a json
        let datosJson = JSON.stringify(datos)
        // Utilizo la funcion $ de Jquery $.ajax para hacer un llamado asincrono a un servicio web
        // ajax forma de enviar información de manera asincrona por debajo sin recargar la pagina solo se trabajo lo requerido, tecnologia
        // ajax canal de comunicacion entre cliente y servidor, el canal es asincrono
        $.ajax({
            // url del servicio
            // url de prueba =  url: "http://localhost:8080/api/user/all",
            url: "http://144.22.58.155/api/user/new",
            // tipo de peticion 
            type: 'POST',
            contentType: "application/json",
            // tipo de contenido o de datos a intercambiar que se espera en la respuesta
            dataType: 'json',
            // Envio datos capturados por el usuario a la peticion
            data: datosJson,
            // success funcion con acciones si todo sale OK
            success: function (respuesta) {
                // escribe en la consula del desarrollador para fectos de depuracion
                console.log(respuesta);
                resultado(respuesta);
            },
            // error acciones si sale error
            // son pasados como argumentos a la funcion 
            error: function (xhr, status) {
                //escribe en la consula del desarrollador para efectos de depuracion
                console.log("algo falló");
            },
            // complete acciones al final de la peticion se ejecuta asi salga ok o error
            complete: function (xhr, status) {
                console.log(status);
            }
        });
    }
}

function estadoInicial() {
    $("#username").focus()
}

function resultado(respuesta) {
    let id = respuesta.id;
    let nombre = respuesta.name;
    let email = respuesta.email;
    // == : 
    // === : valida si exactamente tienen el mismo contenido, tipo , etc.
    if (id === null) {
        alert("El e-mail " + email + " ya está registrado " ); 
        $("#useremail").focus();
    } else {
        alert("¡Usuario Creado Exitosamente..!");
        estadoInicial();
        limpiarCampos();
    }
}

function limpiarCampos() {
    $("#useremail").val("")
    $("#password").val("")
    $("#username").val("")
    $("#userlastname").val("")
    $("#passwordrepeat").val("")
}
