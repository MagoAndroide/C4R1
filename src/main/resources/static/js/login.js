/**
 * Cargar la libreria de Jquery y ubicar el cursor en el campo de login
 */
 $(document).ready(function () {
    estadoInicial()
});
/**
 * Intenta autenticar al usuario en la aplicación
 */
function login() {
    // Capturar datos que ingreso en la pagina login o endpoint
    let email = $("#useremail").val()
    let password = $("#password").val()
    if (email == "" || password == "") {
        alert("campos email y password son obligatorios");
        estadoInicial()
    } else {
        // Utilizo la funcion $ de Jquery $.ajax para hacer un llamado asincrono a un servicio web
        // ajax forma de enviar información de manera asincrona por debajo sin recargar la pagina solo se trabajo lo requerido, tecnologia
        // ajax canal de comunicacion entre cliente y servidor, el canal es asincrono
        $.ajax({
            // url del servicio
            // url de prueba =  url: "http://localhost:8080/api/user/all",
            url: "http://144.22.58.155/api/user/" + email + "/" + password,
            // tipo de peticion 
            type: 'GET',
            // tipo de contenido o de datos a intercambiar que se espera en la respuesta
            dataType: 'json',
            // Envio datos capturados por el usuario a la peticion

            // success funcion con acciones si todo sale OK
            success: function (respuesta) {
                // escribe en la consula del desarrollador para fectos de depuracion
                console.log(respuesta);
                resultado(respuesta);
            },
            // error acciones si sale error
            // son pasados como argumentos a la funcion 
            error: function (xhr, status) {
                //escribe en la consula del desarrollador para fectos de depuracion
                console.log("algo falló");
            },
            // complete acciones al final de la peticion se ejecuta asi salga ok o error
            complete: function (xhr, status) {
                console.log(status);
            }
        });
    }
}
/**
 * valida si el id viene un el codigo del usuario nulo o si viene el codigo del usuario 
 * 
 * configura si viene el mensaje de bienvenida o error segun el caso
 */
function resultado(respuesta) {
    let id = respuesta.id;
    let nombre = respuesta.name;
    // == : 
    // === : valida si exactamente tienen el mismo contenido, tipo , etc.
    if (id === null) {
        console.log("Usuario no existe : " + nombre);
        $("#mensaje").html("Usuario no existe : " + nombre);
    } else {
        console.log("Usuario : " + id + " " + nombre);
        $("#mensaje").html("Bienvenido : " + nombre);
    }
    $("#mensaje").show()

}

function estadoInicial() {
    $("#useremail").focus()
    // para ocualtar se utiliza la funcion hide
    $("#mensaje").hide()
}
