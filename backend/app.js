$(document).ready(function() {
    let id_sesion = 0;
    // SE ASIGNA EL EVENTO CLICK AL BOTON DE INICIAR SESIÖN
    $('#login').click(function(e){
        e.preventDefault();
        
        if(!verifFinalLogin()){
            return;
        }

        //SE OBTIENEN LOS VALORES DE LOS INPUTS
        let email = $('input[placeholder="Email"]').val();
        let password = $('input[placeholder="Contraseña"]').val();
    
        // CREAR UN OBJETO JSON
        let finalJSON = {
            'email': email,
            'password': password
        };
        
        $.ajax({
            url: '../backend/eduplay-encontrarUsuario.php',
            type: 'POST',
            data: JSON.stringify(finalJSON), // Convertir el objeto JSON a string
            contentType: 'application/json; charset=utf-8', // Enviar como JSON
            success: function(response) {
                console.log(response);  // Mostrar la respuesta del servidor
                let result = JSON.parse(response);  // Parsear la respuesta JSON
                if (result.status === 'success') {
                    id_sesion = result.id;
                    alert('Login exitoso.');
                    window.location.href = '../frontend/principal.php';  // Redirigir a la página principal
                } else {
                    alert('Error en el login: ' + result.message);  // Mostrar el mensaje de error
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error en la solicitud:', textStatus, errorThrown);  // Manejo de errores
                alert("Hubo un error al procesar el login.");
            }
        });
    });

    // SE ASIGNA EL EVENTO CLICK AL BOTON DE REGISTRAR TUTOR
    $('#signup-tutor').on('click', function(e){
        e.preventDefault();
        
        if(!verifFinalsignup_tut()){
            return;
        }

        // Obtener los valores de los inputs
        let email = $('input[placeholder="Email"]').val();
        let nombre = $('input[placeholder="Nombre(s)"]').val();
        let apellidos = $('input[placeholder="Apellidos"]').val();
        let fecha_nac = $('input[placeholder="Fecha de Nacimiento"]').val();
        let contrasena = $('input[placeholder="Contraseña"]').val();
        let confirmar_contrasena = $('input[placeholder="Confirmar contraseña"]').val();
        
        if (contrasena !== confirmar_contrasena) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Crear el objeto JSON con los datos del formulario
        let tutorData = {
            'usuario': email,
            'nombre': nombre,
            'apellidos': apellidos,
            'fecha_nac': fecha_nac,
            'contrasena': contrasena,  
        };


        localStorage.setItem('tutorData', JSON.stringify(tutorData));

        window.location.href = '../frontend/signup-niño.php';
    });

    // SE ASIGNA EL EVENTO CLICK AL BOTON DE REGISTRAR NIÑO
    $('#signup-nino').on('click', function(e){
        e.preventDefault();
        
        if(!verifFinalsignup_alu()){
            return;
        }

        // Obtener los valores de los inputs del formulario del niño
        let grado = $('select[name="Grado"]').val();
        let nombre_nino = $('input[placeholder="Nombre(s)"]').val();
        let apellidos_nino = $('input[placeholder="Apellidos"]').val();
        let fecha_nac_nino = $('input[placeholder="Fecha de Nacimiento"]').val();
        
        // Recuperar los datos del tutor almacenados en localStorage
        let tutorData = JSON.parse(localStorage.getItem('tutorData'));
        
        if (!tutorData) {
            alert("No se encontraron los datos del tutor.");
            return;
        }
        
        // Crear el objeto JSON con los datos del niño
        let ninoData = {
            'nombre': nombre_nino,
            'apellidos': apellidos_nino,
            'fecha_nac': fecha_nac_nino,
            'grado_curso': grado
        };
        
        // Hacer la petición AJAX para registrar tanto el tutor como el niño
        $.ajax({
            url: '../backend/eduplay-add.php',
            type: 'POST',
            data: JSON.stringify({ tutor: tutorData, nino: ninoData }),  // Enviar ambos objetos JSON
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                console.log(response);
        
                // Aquí puedes manejar la respuesta y redirigir al usuario si es necesario
                const result = JSON.parse(response);
                if (result.status === 'success') {
                    alert('Registro exitoso.');
                    window.location.href = '../frontend/login.php';  // Redirigir al login o a otra página
                } else {
                    alert('Error en el registro: ' + result.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error en la solicitud:', textStatus, errorThrown);
                alert("Hubo un error al procesar el registro.");
            }
        });
    });
    
    // SE ASIGNA EL EVENTO CLICK AL BOTON DE ENVIAR FORMULARIO DE VOCABULARIO ESPAÑOL
    $('#form_vocabulario_es').submit(function(e){
        e.preventDefault();
        console.log("Formulario de vocabulario español enviado.");

        // Obtener las respuestas seleccionadas para cada pregunta
        var respuestas = {
            materia: "español",
            tipo_material: "vocabulario",
            pregunta1: $('input[name="pregunta1"]:checked').val(),
            pregunta2: $('input[name="pregunta2"]:checked').val(),
            pregunta3: $('input[name="pregunta3"]:checked').val(),
            pregunta4: $('input[name="pregunta4"]:checked').val(),
        };

        // Validar que se haya seleccionado una respuesta para cada pregunta
        for (var pregunta in respuestas) {
            if (!respuestas[pregunta]) {
                alert("Por favor, responde a la pregunta " + pregunta.substring(8));
                return;  // Detener la ejecución si falta una respuesta
            }
        }

        // Enviar las respuestas al servidor mediante AJAX
        $.ajax({
            url: '../backend/eduplay-verifResp.php',
            type: 'POST',
            data: { respuestas: respuestas },  // Enviar las respuestas seleccionadas
            success: function(response) {
                // Procesar la respuesta del servidor
                if (response.status === 'correcto') {
                    alert("¡Todas tus respuestas son correctas!");
                    window.location.href = '../frontend/principal.php';  // Redirigir a la página principal
                } else {
                    alert("Algunas respuestas son incorrectas. Vuelve a intentarlo.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error en la solicitud AJAX:", status, error);
                alert("Hubo un error al enviar las respuestas.");
            }
        });
    });

    // SE ASIGNA EL EVENTO CLICK AL BOTON DE ENVIAR FORMULARIO DE VOCABULARIO ESPAÑOL
    $('#form_animales_es').submit(function(e){
        e.preventDefault();

        // Obtener las respuestas seleccionadas para cada pregunta
        var respuestas = {
            materia: "español",
            tipo_material: "animales",
            pregunta1: $('input[name="pregunta1"]:checked').val(),
            pregunta2: $('input[name="pregunta2"]:checked').val(),
            pregunta3: $('input[name="pregunta3"]:checked').val(),
            pregunta4: $('input[name="pregunta4"]:checked').val(),
        };
    
        // Validar que se haya seleccionado una respuesta para cada pregunta
        for (var pregunta in respuestas) {
            if (pregunta.startsWith("pregunta") && !respuestas[pregunta]) {
                alert("Por favor, responde a la pregunta " + pregunta.substring(8));
                return;  // Detener la ejecución si falta una respuesta
            }
        }    

        // Enviar las respuestas al servidor mediante AJAX
        $.ajax({
            url: '../backend/eduplay-verifResp.php',
            type: 'POST',
            data: { respuestas: respuestas },  // Enviar las respuestas seleccionadas
            success: function(response) {
                // Procesar la respuesta del servidor
                if (response.status === 'correcto') {
                    alert("¡Respuestas correctas!");
                } else {
                    alert("Algunas respuestas son incorrectas.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error en la solicitud AJAX:", status, error);
                alert("Hubo un error al enviar las respuestas.");
            }
        });
    });


    // SE ASIGNA EL EVENTO CLICK AL BOTON DE ENVIAR FORMULARIO DE VOCABULARIO ESPAÑOL
    $('#form_colores_es').submit(function(e){
        e.preventDefault();

        // Obtener las respuestas seleccionadas para cada pregunta
        var respuestas = {
            materia: "español",
            tipo_material: "colores",
            pregunta1: $('input[name="pregunta1"]:checked').val(),
            pregunta2: $('input[name="pregunta2"]:checked').val(),
            pregunta3: $('input[name="pregunta3"]:checked').val(),
            pregunta4: $('input[name="pregunta4"]:checked').val(),
        };

        // Validar que se haya seleccionado una respuesta para cada pregunta
        for (var pregunta in respuestas) {
            if (!respuestas[pregunta]) {
                alert("Por favor, responde a la pregunta " + pregunta.substring(8));
                return;  // Detener la ejecución si falta una respuesta
            }
        }

        // Enviar las respuestas al servidor mediante AJAX
        $.ajax({
            url: '../backend/eduplay-verifResp.php',
            type: 'POST',
            data: { respuestas: respuestas },  // Enviar las respuestas seleccionadas
            success: function(response) {
                // Procesar la respuesta del servidor
                if (response.status === 'correcto') {
                    alert("¡Respuestas correctas!");
                } else {
                    alert("Algunas respuestas son incorrectas.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error en la solicitud AJAX:", status, error);
                alert("Hubo un error al enviar las respuestas.");
            }
        });
    });

    // SE ASIGNA EL EVENTO CLICK AL BOTON DE ENVIAR FORMULARIO DE VOCABULARIO MATEMATICAS
    $('#form_vocabulario_mat').submit(function(e){
        e.preventDefault();

        // Obtener las respuestas seleccionadas para cada pregunta
        var respuestas = {
            materia: "matematicas",
            tipo_material: "vocabulario",
            pregunta1: $('input[name="pregunta1"]:checked').val(),
            pregunta2: $('input[name="pregunta2"]:checked').val(),
            pregunta3: $('input[name="pregunta3"]:checked').val(),
            pregunta4: $('input[name="pregunta4"]:checked').val(),
        };

        // Validar que se haya seleccionado una respuesta para cada pregunta
        for (var pregunta in respuestas) {
            if (!respuestas[pregunta]) {
                alert("Por favor, responde a la pregunta " + pregunta.substring(8));
                return;  // Detener la ejecución si falta una respuesta
            }
        }

        // Enviar las respuestas al servidor mediante AJAX
        $.ajax({
            url: '../backend/eduplay-verifResp.php',
            type: 'POST',
            data: { respuestas: respuestas },  // Enviar las respuestas seleccionadas
            success: function(response) {
                // Procesar la respuesta del servidor
                if (response.status === 'correcto') {
                    alert("¡Todas tus respuestas son correctas!");
                    window.location.href = '../frontend/principal.php';  // Redirigir a la página principal
                } else {
                    alert("Algunas respuestas son incorrectas. Vuelve a intentarlo.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error en la solicitud AJAX:", status, error);
                alert("Hubo un error al enviar las respuestas.");
            }
        });
    });

    // SE ASIGNA EL EVENTO CLICK AL BOTON DE ENVIAR FORMULARIO DE ANIMALES MATEMATICAS
    $('#form_animales_mat').submit(function(e){
        e.preventDefault();

        // Obtener las respuestas seleccionadas para cada pregunta
        var respuestas = {
            materia: "matematicas",
            tipo_material: "animales",
            pregunta1: $('input[name="pregunta1"]:checked').val(),
            pregunta2: $('input[name="pregunta2"]:checked').val(),
            pregunta3: $('input[name="pregunta3"]:checked').val(),
            pregunta4: $('input[name="pregunta4"]:checked').val(),
        };

        // Validar que se haya seleccionado una respuesta para cada pregunta
        for (var pregunta in respuestas) {
            if (!respuestas[pregunta]) {
                alert("Por favor, responde a la pregunta " + pregunta.substring(8));
                return;  // Detener la ejecución si falta una respuesta
            }
        }

        // Enviar las respuestas al servidor mediante AJAX
        $.ajax({
            url: '../backend/eduplay-verifResp.php',
            type: 'POST',
            data: { respuestas: respuestas },  // Enviar las respuestas seleccionadas
            success: function(response) {
                // Procesar la respuesta del servidor
                if (response.status === 'correcto') {
                    alert("¡Todas tus respuestas son correctas!");
                    window.location.href = '../frontend/principal.php';  // Redirigir a la página principal
                } else {
                    alert("Algunas respuestas son incorrectas. Vuelve a intentarlo.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error en la solicitud AJAX:", status, error);
                alert("Hubo un error al enviar las respuestas.");
            }
        });
    });

    // SE ASIGNA EL EVENTO CLICK AL BOTON DE ENVIAR FORMULARIO DE COLORES MATEMATICAS
    $('#form_colores_mat').submit(function(e){
        e.preventDefault();

        // Obtener las respuestas seleccionadas para cada pregunta
        var respuestas = {
            materia: "matematicas",
            tipo_material: "colores",
            pregunta1: $('input[name="pregunta1"]:checked').val(),
            pregunta2: $('input[name="pregunta2"]:checked').val(),
            pregunta3: $('input[name="pregunta3"]:checked').val(),
            pregunta4: $('input[name="pregunta4"]:checked').val(),
        };

        // Validar que se haya seleccionado una respuesta para cada pregunta
        for (var pregunta in respuestas) {
            if (!respuestas[pregunta]) {
                alert("Por favor, responde a la pregunta " + pregunta.substring(8));
                return;  // Detener la ejecución si falta una respuesta
            }
        }

        // Enviar las respuestas al servidor mediante AJAX
        $.ajax({
            url: '../backend/eduplay-verifResp.php',
            type: 'POST',
            data: { respuestas: respuestas },  // Enviar las respuestas seleccionadas
            success: function(response) {
                // Procesar la respuesta del servidor
                if (response.status === 'correcto') {
                    alert("¡Todas tus respuestas son correctas!");
                    window.location.href = '../frontend/principal.php';  // Redirigir a la página principal
                } else {
                    alert("Algunas respuestas son incorrectas. Vuelve a intentarlo.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error en la solicitud AJAX:", status, error);
                alert("Hubo un error al enviar las respuestas.");
            }
        });
    });

    // SE ASIGNA EL EVENTO CLICK AL BOTON DE ENVIAR FORMULARIO DE VOCABULARIO ING
    $('#form_vocabulario_ing').submit(function(e){
        e.preventDefault();

        // Obtener las respuestas seleccionadas para cada pregunta
        var respuestas = {
            materia: "ingles",
            tipo_material: "vocabulario",
            pregunta1: $('input[name="pregunta1"]:checked').val(),
            pregunta2: $('input[name="pregunta2"]:checked').val(),
            pregunta3: $('input[name="pregunta3"]:checked').val(),
            pregunta4: $('input[name="pregunta4"]:checked').val(),
        };

        // Validar que se haya seleccionado una respuesta para cada pregunta
        for (var pregunta in respuestas) {
            if (!respuestas[pregunta]) {
                alert("Por favor, responde a la pregunta " + pregunta.substring(8));
                return;  // Detener la ejecución si falta una respuesta
            }
        }

        // Enviar las respuestas al servidor mediante AJAX
        $.ajax({
            url: '../backend/eduplay-verifResp.php',
            type: 'POST',
            data: { respuestas: respuestas },  // Enviar las respuestas seleccionadas
            success: function(response) {
                // Procesar la respuesta del servidor
                if (response.status === 'correcto') {
                    alert("¡Todas tus respuestas son correctas!");
                    window.location.href = '../frontend/principal.php';  // Redirigir a la página principal
                } else {
                    alert("Algunas respuestas son incorrectas. Vuelve a intentarlo.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error en la solicitud AJAX:", status, error);
                alert("Hubo un error al enviar las respuestas.");
            }
        });
    });

    // SE ASIGNA EL EVENTO CLICK AL BOTON DE ENVIAR FORMULARIO DE ANIMALES ING
    $('#form_animales_ing').submit(function(e){
        e.preventDefault();

        // Obtener las respuestas seleccionadas para cada pregunta
        var respuestas = {
            materia: "ingles",
            tipo_material: "animales",
            pregunta1: $('input[name="pregunta1"]:checked').val(),
            pregunta2: $('input[name="pregunta2"]:checked').val(),
            pregunta3: $('input[name="pregunta3"]:checked').val(),
            pregunta4: $('input[name="pregunta4"]:checked').val(),
        };

        // Validar que se haya seleccionado una respuesta para cada pregunta
        for (var pregunta in respuestas) {
            if (!respuestas[pregunta]) {
                alert("Por favor, responde a la pregunta " + pregunta.substring(8));
                return;  // Detener la ejecución si falta una respuesta
            }
        }

        // Enviar las respuestas al servidor mediante AJAX
        $.ajax({
            url: '../backend/eduplay-verifResp.php',
            type: 'POST',
            data: { respuestas: respuestas },  // Enviar las respuestas seleccionadas
            success: function(response) {
                // Procesar la respuesta del servidor
                if (response.status === 'correcto') {
                    alert("¡Todas tus respuestas son correctas!");
                    window.location.href = '../frontend/principal.php';  // Redirigir a la página principal
                } else {
                    alert("Algunas respuestas son incorrectas. Vuelve a intentarlo.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error en la solicitud AJAX:", status, error);
                alert("Hubo un error al enviar las respuestas.");
            }
        });
    });

    // SE ASIGNA EL EVENTO CLICK AL BOTON DE ENVIAR FORMULARIO DE COLORES ING
    $('#form_colores_ing').submit(function(e){
        e.preventDefault();

        // Obtener las respuestas seleccionadas para cada pregunta
        var respuestas = {
            materia: "ingles",
            tipo_material: "colores",
            pregunta1: $('input[name="pregunta1"]:checked').val(),
            pregunta2: $('input[name="pregunta2"]:checked').val(),
            pregunta3: $('input[name="pregunta3"]:checked').val(),
            pregunta4: $('input[name="pregunta4"]:checked').val(),
        };

        // Validar que se haya seleccionado una respuesta para cada pregunta
        for (var pregunta in respuestas) {
            if (!respuestas[pregunta]) {
                alert("Por favor, responde a la pregunta " + pregunta.substring(8));
                return;  // Detener la ejecución si falta una respuesta
            }
        }

        // Enviar las respuestas al servidor mediante AJAX
        $.ajax({
            url: '../backend/eduplay-verifResp.php',
            type: 'POST',
            data: { respuestas: respuestas },  // Enviar las respuestas seleccionadas
            success: function(response) {
                // Procesar la respuesta del servidor
                if (response.status === 'correcto') {
                    alert("¡Todas tus respuestas son correctas!");
                    window.location.href = '../frontend/principal.php';  // Redirigir a la página principal
                } else {
                    alert("Algunas respuestas son incorrectas. Vuelve a intentarlo.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error en la solicitud AJAX:", status, error);
                alert("Hubo un error al enviar las respuestas.");
            }
        });
    });

    // Al cargar la página, obtener el perfil del usuario
    if (window.location.pathname.includes('../frontend/perfil.php')) {
        // Obtener el ID de sesión desde localStorage
        if (id_sesion == 0) {
            alert("No se encontró una sesión activa.");
            window.location.href = '../frontend/login.php'; // Redirigir al login si no hay sesión
            return;
        }

        // Solicitar datos del perfil
        $.ajax({
            url: '../backend/eduplay-listAlumn.php',
            type: 'POST',
            data: JSON.stringify({ id_sesion: id_sesion }),
            contentType: 'application/json; charset=utf-8',
            success: function(response) {
                let result = JSON.parse(response);
                if (result.status === 'success') {
                    // Actualizar el DOM con los datos del perfil
                    $('.perfil-avatar').attr('src', result.avatar || 'img/default-avatar.png');
                    $('.perfil-detalles').html(`
                        <p><strong>${result.nombre}</strong></p>
                        <p>Apodo: ${result.apodo}</p>
                        <p>Grado: ${result.grado}</p>
                        <p>Edad: ${result.edad}</p>
                    `);

                    // Actualizar progreso en cursos
                    let cursos = result.cursos || [];
                    let progresoHtml = '';
                    cursos.forEach(curso => {
                        progresoHtml += `
                            <div class="curso">
                                <span>${curso.nombre} <img src="img/${curso.icono}" alt="${curso.nombre}"></span>
                                <div class="barra-progreso">
                                    <div class="progreso" style="width: ${curso.progreso}%;"></div>
                                </div>
                            </div>
                        `;
                    });
                    $('.perfil-progreso').html(progresoHtml);
                } else {
                    alert(result.message || 'Error al cargar el perfil.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error en la solicitud:', textStatus, errorThrown);
                alert("Hubo un error al cargar el perfil.");
            }
        });
    }


});


    //AREA DE VALIDACIONES
//VALIDAR EMAIL
$('input[placeholder="Email"]').on("blur",function() {
verifUsuario().then(function(isValid) {
    if(isValid) {
        return;
        }
    });
});

//VALIDAR CONTRASEÑA
$('input[placeholder="Contraseña"]').on('blur', function() {
    const { final, status, message } = verifContr();
    if (!final) {
        alert(message);
    }
});

//VALIDAR CONFIRMACION DE CONTRASEÑA
$('input[placeholder="Confirmar contraseña"]').on('blur', function() {
    const { final, status, message } = verifConfirmContr();
    if (!final) {
        alert(message);
    }
});

//VALIDAR NOMBRE
$('input[placeholder="Nombre(s)"]').on('blur', function() {
    const { final, status, message } = verifNombre();
    if (!final) {
        alert(message);
    }
});

//VALIDAR APELLIDOS
$('input[placeholder="Apellidos"]').on('blur', function() {
    const { final, status, message } = verifAped();
    if (!final) {
        alert(message);
    }
});

//VALIDAR FECHA DE NACIMIENTO
$('input[placeholder="Fecha de Nacimiento"]').on('blur', function() {
    const { final, status, message } = verifFecha();
    if (!final) {
        alert(message);
    }
});

async function verifUsuario(){
    var final = true;
    let status = 'success';
    let message = "Validación de correo exitosa"
    var correo = document.getElementById('correo').value;
    
     // Validación del formato de correo
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (correo.length == 0) {
        status = 'error';
        message = 'El correo es un requisito requerido.';
        final = false;
    } else if (!emailPattern.test(correo)) {
        status = 'error';
        message = 'El correo electrónico no tiene un formato válido.';
        final = false;
    } else {
        if (edit == false) {
            try {
                 // Esperamos la respuesta de la validación asincrónica
                const usuario = await verificarCorreoAsy(correo);
                if (usuario && usuario.length > 0) {
                    status = "error";
                    message = "El correo ya está registrado";
                    final = false;
                }
            } catch (error) {
                status = "error";
                message = "Error en la validación del correo";
                final = false;
            }
        }
    }

    console.log(status);
    console.log(message);
    console.log(final);

    mostrarBarraVerif(status, message);
    return final;
}

// Función asincrónica para verificar el correo en la base de datos
function verificarCorreoAsy(correo) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "./backend/verificarCorreo.php",  // ruta al archivo PHP que valida el correo
            data: { correo: correo },
            success: function(response) {
                console.log("Respuesta del servidor:", response); // Ver la respuesta antes de parsear
                try {
                    let usuario = JSON.parse(response);
                    resolve(usuario);  // Resolvemos la promesa con la respuesta
                } catch (e) {
                    reject("Error al parsear la respuesta del servidor");
                }
            },
            error: function(xhr, status, error) {
                 reject(error);  // Rechazamos la promesa si hay un error
            }
        });
    });
}


function verifContr() {
    var final = true;
    let status = 'success';
    let message = "Validación de contraseña exitosa";
    var password = document.querySelector('input[placeholder="Contraseña"]').value;

    if (password.length === 0) {
        status = 'error';
        message = 'La contraseña es un requisito obligatorio.';
        final = false;
    } else if (password.length < 6) {
        status = 'error';
        message = 'La contraseña debe tener al menos 6 caracteres.';
        final = false;
    }

    return { final, status, message };
}

function verifConfirmContr() {
    var final = true;
    let status = 'success';
    let message = "Validación de confirmación de contraseña exitosa";
    var password = document.querySelector('input[placeholder="Contraseña"]').value;
    var confirmPassword = document.querySelector('input[placeholder="Confirmar contraseña"]').value;

    if (confirmPassword.length === 0) {
        status = 'error';
        message = 'La confirmación de contraseña es obligatoria.';
        final = false;
    } else if (password !== confirmPassword) {
        status = 'error';
        message = 'Las contraseñas no coinciden.';
        final = false;
    }

    return { final, status, message };
}


function verifNombre() {
    var final = true;
    let status = 'success';
    let message = "Validación de nombre exitosa";
    var nombre = document.querySelector('input[placeholder="Nombre(s)"]').value;

    if (nombre.length === 0) {
        status = 'error';
        message = 'El nombre es obligatorio.';
        final = false;
    } else if (nombre.length < 2) {
        status = 'error';
        message = 'El nombre debe tener al menos 2 caracteres.';
        final = false;
    }

    return { final, status, message };
}

function verifAped() {
    var final = true;
    let status = 'success';
    let message = "Validación de apellidos exitosa";
    var apellidos = document.querySelector('input[placeholder="Apellidos"]').value;

    if (apellidos.length === 0) {
        status = 'error';
        message = 'Los apellidos son obligatorios.';
        final = false;
    } else if (apellidos.length < 2) {
        status = 'error';
        message = 'Los apellidos deben tener al menos 2 caracteres.';
        final = false;
    }

    return { final, status, message };
}

function verifFecha() {
    var final = true;
    let status = 'success';
    let message = "Validación de fecha de nacimiento exitosa";
    var fecha = document.querySelector('input[placeholder="Fecha de Nacimiento"]').value;
    const fechaRegex = /^\d{2}-\d{2}-\d{4}$/;

    if (fecha.length === 0) {
        status = 'error';
        message = 'La fecha de nacimiento es obligatoria.';
        final = false;
    } else if (!fechaRegex.test(fecha)) {
        status = 'error';
        message = 'El formato de fecha debe ser DD-MM-AAAA.';
        final = false;
    }

    return { final, status, message };
}

function verifFinalLogin(){
    var final = true;
    let status = 'success';
    let message = "Validación de envio de formulario exitosa"

    for(var i=1; i<8; i++){
        switch(i){
            case 1: final = verifUsuario();
                    if(final == false){
                        i = 8;
                    }
                    break;
            case 2: final = verifContr();
                    if(final == false){
                        i = 8;
                    }
                    break;
            default: final=false;
        }
    }

    if(final == false){
        status = 'error';
        message = "Validación de envio de formulario fallida"
        
    }

    return(final);
}

function verifFinalsignup_tut(){
    var final = true;
    let status = 'success';
    let message = "Validación de envio de formulario exitosa"

    for(var i=1; i<8; i++){
        switch(i){
            case 1: final = verifUsuario();
                    if(final == false){
                        i = 8;
                    }
                    break;
            case 2: final = verifContr();
                    if(final == false){
                        i = 8;
                    }
                    break;
            case 3: final = verifConfirmContr();
                    if(final == false){
                        i = 8;
                    }
                    break;
            case 4: final = verifNombre();
                    if(final == false){
                        i = 8;
                    }
                    break;
            case 5: final = verifAped();
                    if(final == false){
                        i = 8;
                    }
                    break; 
            case 6: final = verifFecha();
                    if(final == false){
                        i = 8;
                    }
                    break;
            default: final=false;
        }
    }

    if(final == false){
        status = 'error';
        message = "Validación de envio de formulario fallida"
        
    }

    return(final);
}

function verifFinalsignup_alu(){
    var final = true;
    let status = 'success';
    let message = "Validación de envio de formulario exitosa"

    for(var i=1; i<8; i++){
        switch(i){
            case 1: final = verifNombre();
                    if(final == false){
                        i = 8;
                    }
                    break;
            case 5: final = verifAped();
                    if(final == false){
                        i = 8;
                    }
                    break; 
            case 6: final = verifFecha();
                    if(final == false){
                        i = 8;
                    }
                    break;
            default: final=false;
        }
    }

    if(final == false){
        status = 'error';
        message = "Validación de envio de formulario fallida"
        
    }

    return(final);
}
