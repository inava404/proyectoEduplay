$(document).ready(function() {    
    // SE ASIGNA EL EVENTO CLICK AL BOTÓN DE INICIAR SESIÓN
    $('#login').on('click', function(e) {
        e.preventDefault();  // Evita que el formulario se envíe
    
        // Validación del email
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailValue = $('input[name="email"]').val();
        if (!emailRegex.test(emailValue)) {
            alert("Por favor introduce un email válido.");
            return;
        }
    
        // Validación de la contraseña
        let passwordValue = $('input[name="password"]').val();
        if (passwordValue === '') {
            alert("El campo de contraseña no puede estar vacío.");
            return;
        }
    
        // SE OBTIENEN LOS VALORES DE LOS INPUTS
        let email = $('input[name="email"]').val();
        let password = $('input[name="password"]').val();
    
        // CREAR UN OBJETO JSON
        let finalJSON = {
            'email': email,
            'password': password
        };

            // Realizar la solicitud AJAX
            $.ajax({
                url: '../backend/eduplay-encontrarUsuario.php',
                type: 'POST',
                data: JSON.stringify(finalJSON),  // Convertir el objeto JSON a string
                contentType: 'application/json; charset=utf-8',  // Enviar como JSON
                success: function(response) {
                    try {
                        let result = JSON.parse(response); // Parsear la respuesta como JSON
                        if (result.status === 'success') {
                            localStorage.setItem('id_sesion', result.id); // Usa el ID correcto
                            console.log(result.id); // Muestra el ID del usuario
                            alert('Login exitoso.');
                            window.location.href = '../frontend/principal.php';
                        } else {
                            alert('Error en el login: ' + result.message);
                        }
                    } catch (error) {
                        console.error('Error al procesar la respuesta del servidor:', error);
                        alert('Respuesta no válida del servidor.');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('Error en la solicitud AJAX:', textStatus, errorThrown);
                    alert('Error al procesar la solicitud.');
                }
            });
    });

    // SE ASIGNA EL EVENTO CLICK AL BOTON DE REGISTRAR TUTOR
    $('#signup-tutor').on('click', function(e){
        e.preventDefault();

        // Validación del email
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailValue = $('#email').val();
        if (!emailRegex.test(emailValue)) {
            alert("Por favor introduce un email válido.");
            return;
        }

        // Validación del nombre
        if($('#nombre').val() === '') {
            alert("El campo de nombre no puede estar vacío.");
            return;
        }

        // Validación de los apellidos
        if($('#apellido').val() === '') {
            alert("El campo de apellidos no puede estar vacío.");
            return;
        }

        // Validación de la fecha de nacimiento
        let fechaNacRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[01])$/;
        if (!fechaNacRegex.test($('#fecha_nac').val())) {
            alert("Por favor introduce una fecha de nacimiento válida.");
            return;
        }

        // Validación de la contraseña
        if ($('#password') === '') {
            alert("El campo de contraseña no puede estar vacío.");
            return;
        }

        // Validación de la confirmación de la contraseña
        if ($('#password_conf') === '') {
            alert("El campo de confirmar contraseña no puede estar vacío.");
            return;
        }
        else{
            if ($('#password').val() !== $('#password_conf').val()) {
                alert("Las contraseñas no coinciden.");
                return;
            }
        }

                // Obtener los valores de los inputs
                let email = $('input[placeholder="Email"]').val();
                let nombre = $('input[placeholder="Nombre(s)"]').val();
                let apellidos = $('input[placeholder="Apellidos"]').val();
                let fecha_nac = $('input[placeholder="Fecha de Nacimiento"]').val();
                let contrasena = $('input[placeholder="Contraseña"]').val();

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

        // Validación del nombre
        if($('#nombre').val() === '') {
            alert("El campo de nombre no puede estar vacío.");
            return;
        }

        // Validación de los apellidos
        if($('#apellidos').val() === '') {
            alert("El campo de apellidos no puede estar vacío.");
            return;
        }

        // Validación de la fecha de nacimiento
        let fechaNacRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[01])$/;
        if (!fechaNacRegex.test($('#fecha_nac').val())) {
            alert("Por favor introduce una fecha de nacimiento válida.");
            return;
        }
                // Obtener los valores de los inputs del formulario del niño
                let grado = $('#grado').val();
                let nombre_nino = $('#nombre').val();
                let apellidos_nino = $('#apellido').val();
                let fecha_nac_nino = $('#fecha_nac').val();
                
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
            pregunta4: $('input[name="pregunta4"]:checked').val()
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
                    window.location.href = '../frontend/español.php';  // Redirigir a la página principal
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

    // SE ASIGNA EL EVENTO CLICK AL BOTON DE ENVIAR FORMULARIO DE ANIMALES ESPAÑOL
    $('#form_animales_es').submit(function(e){
        e.preventDefault();

        console.log('input[name="pregunta1"]:checked');

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
                    alert("¡Felicidades, las respuestas son correctas!");
                    window.location.href = '../frontend/español.php'; 
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


    // SE ASIGNA EL EVENTO CLICK AL BOTON DE ENVIAR FORMULARIO DE COLORES ESPAÑOL
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
                    alert("¡Felicidades, las respuestas son correctas!");
                    window.location.href = '../frontend/español.php';
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

    // SE ASIGNA EL EVENTO CLICK AL BOTON DE ENVIAR FORMULARIO DE NUMEROS MATEMATICAS
    $('#numeros').submit(function(e){
        e.preventDefault();

        // Obtener las respuestas seleccionadas para cada pregunta
        var respuestas = {
            materia: "matematicas",
            tipo_material: "numeros",
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
                    alert("¡Felicidades, las respuestas son correctas!");
                    window.location.href = '../frontend/matematicas.php';
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

    // SE ASIGNA EL EVENTO CLICK AL BOTON DE ENVIAR FORMULARIO DE FIGURAS MATEMATICAS
    $('#figuras').submit(function(e){
        e.preventDefault();

        // Obtener las respuestas seleccionadas para cada pregunta
        var respuestas = {
            materia: "matematicas",
            tipo_material: "figuras",
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
                    alert("¡Felicidades, las respuestas son correctas!");
                    window.location.href = '../frontend/matematicas.php';
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

    // SE ASIGNA EL EVENTO CLICK AL BOTON DE ENVIAR FORMULARIO DE SUMAS Y RESTAS MATEMATICAS
    $('#operaciones').submit(function(e){
        e.preventDefault();

        // Obtener las respuestas seleccionadas para cada pregunta
        var respuestas = {
            materia: "matematicas",
            tipo_material: "operaciones",
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
                    alert("¡Felicidades, las respuestas son correctas!");
                    window.location.href = '../frontend/matematicas.php';
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
    $('#vocabulario-en').submit(function(e){
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
                    alert("¡Felicidades, las respuestas son correctas!");
                    window.location.href = '../frontend/ingles.php';
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
                    alert("¡Felicidades, las respuestas son correctas!");
                    window.location.href = '../frontend/ingles.php';
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
    $('#colores-en').submit(function (e) {
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

        console.log(respuestas);
    
        // Validar que se haya seleccionado una respuesta para cada pregunta
        for (var pregunta in respuestas) {
            if (pregunta !== "materia" && pregunta !== "tipo_material" && !respuestas[pregunta]) {
                alert("Por favor, responde a la " + pregunta);
                return; // Detener la ejecución si falta una respuesta
            }
    
            // Validar que la respuesta esté dentro de las opciones permitidas
            if (
                pregunta !== "materia" &&
                pregunta !== "tipo_material" &&
                !["A", "B", "C", "D"].includes(respuestas[pregunta])
            ) {
                alert("Respuesta inválida en la " + pregunta + ". Solo se permiten A, B, C o D.");
                return;
            }
        }
    
        // Enviar las respuestas al servidor mediante AJAX
        $.ajax({
            url: '../backend/eduplay-verifResp.php',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ respuestas: respuestas }), // Enviar las respuestas seleccionadas
            success: function (response) {
                console.log('Respuesta del servidor:', response);
    
                if (response.status === 'success') {
                    alert(response.message);
                    window.location.href = '../frontend/ingles.php';
                } else {
                    alert(response.message || "Algunas respuestas son incorrectas. Vuelve a intentarlo.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud AJAX:", status, error);
                alert("Hubo un error al enviar las respuestas.");
            }
        });
    });
    

    
        // Al cargar la página perfil.php
        if (window.location.pathname.includes('perfil.php')) {
            // Obtener el id_sesion del localStorage (asegúrate de que lo has guardado correctamente)
            let id_sesion = localStorage.getItem('id_sesion');
    
            if (!id_sesion) {
                alert("No se encontró una sesión activa.");
                window.location.href = 'login.php'; // Redirigir al login si no hay sesión
                return;
            }
    
            console.log('ID de sesión:', id_sesion);
    
            // Hacer la solicitud AJAX al backend para obtener el perfil del usuario
            $.ajax({
                url: '../backend/eduplay-listAlumn.php',
                type: 'POST',
                data: JSON.stringify({ id_sesion: id_sesion }),
                contentType: 'application/json; charset=utf-8',
                success: function(response) {
                    console.log('Respuesta del servidor:', response); // Ahora la respuesta es un objeto JavaScript automáticamente
                    let result = JSON.parse(response);
                    console.log('Resultado:', result);    
                    const perfil = result.perfil;
                    const progreso = result.progreso;
            
                        // Actualizar los datos del perfil en el DOM
                        $('.perfil-detalles').html(`
                            <h3>${perfil.nombre_com}</h3>
                            <h3>Apodo: ${perfil.apodo}</h3>
                            <h3>Grado: ${perfil.grado === 1 ? 'Primer Grado' : perfil.grado === 2 ? 'Segundo Grado' : 'Tercer Grado'}</h3>
                            <h3>Edad: ${calcularEdad(perfil.fecha_nacimiento)} años</h3>
                        `);
            
                        // Actualizar las barras de progreso de los cursos
                        $('.curso .progreso').eq(0).css('width', progreso.Espanol + '%');
                        $('.curso .progreso').eq(1).css('width', progreso.Matematicas + '%');
                        $('.curso .progreso').eq(2).css('width', progreso.Ingles + '%');
                    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('Error en la solicitud:', textStatus, errorThrown);
                    console.log('Estado HTTP:', jqXHR.status); // Aquí verificamos el código de estado HTTP
                    console.log('Respuesta del servidor:', jqXHR.responseText); // Para ver qué devolvió el servidor
                    alert("Hubo un error al cargar el perfil.");
                }
            });
        }
                        
    
    // Función para calcular la edad a partir de la fecha de nacimiento
    function calcularEdad(fechaNacimiento) {
        let nacimiento = new Date(fechaNacimiento);
        let hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        let m = hoy.getMonth() - nacimiento.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
    }
    

        // Al cargar la página mas-datos-tutor.php
    if (window.location.pathname.includes('mas-datos-tutor.php')) {
        // Obtener el id_sesion del localStorage
        let id_sesion = localStorage.getItem('id_sesion');

        if (!id_sesion) {
            alert("No se encontró una sesión activa.");
            window.location.href = '../frontend/login.php'; // Redirigir al login si no hay sesión
            return;
        }

        console.log('ID de sesión:', id_sesion);

        // Hacer la solicitud AJAX al backend para obtener los datos del tutor
        $.ajax({
            url: '../backend/eduplay-listTutor.php', // Ruta del backend para obtener los datos del tutor
            type: 'POST',
            data: JSON.stringify({ id_sesion: id_sesion }), // Enviamos el ID de sesión como JSON
            contentType: 'application/json; charset=utf-8',
            success: function(response) {
                console.log('Respuesta del servidor:', response); // Ver respuesta del servidor
                let result = JSON.parse(response); // Parsear la respuesta JSON
                const tutor = result.perfil;

                    // Actualizar los campos del tutor en el DOM
                    $('.datos').eq(0).find('p').text(tutor.nombres || 'N/A');
                    $('.datos').eq(1).find('p').text(tutor.apellidos || 'N/A');
                    $('.datos').eq(2).find('p').text(tutor.email || 'N/A');
                    $('.datos').eq(3).find('p').text(tutor.fecha_nacimiento || 'N/A');
                    $('.datos').eq(4).find('p').text('********'); // Ocultamos la contraseña
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error en la solicitud AJAX:', textStatus, errorThrown);
                alert("Hubo un error al obtener los datos del tutor.");
            }
        });
    }

    // Al cargar la página mas-datos-nino
    if (window.location.pathname.includes('mas-datos-niño.php')) {
        // Obtener el id_sesion del localStorage
        let id_sesion = localStorage.getItem('id_sesion');

        console.log('ID de sesión:', id_sesion);

        if (!id_sesion) {
            alert("No se encontró una sesión activa.");
            window.location.href = '../frontend/login.php'; // Redirigir al login si no hay sesión
            return;
        }

        console.log('ID de sesión:', id_sesion);
        // Hacer la solicitud AJAX al backend para obtener el perfil del usuario
        $.ajax({
            url: '../backend/eduplay-listAlumn.php',
            type: 'POST',
            data: JSON.stringify({ id_sesion: id_sesion }),
            contentType: 'application/json; charset=utf-8',
            success: function(response) {
                console.log('Respuesta del servidor:', response); // Ahora la respuesta es un objeto JavaScript automáticamente
                let result = JSON.parse(response);
                console.log('Resultado:', result);    
                const perfil = result.perfil;
        
                    // Actualizar los datos del perfil en el DOM
                    $('.datos').eq(0).find('p').text(perfil.nombre || 'N/A');
                    $('.datos').eq(1).find('p').text(perfil.apellidos || 'N/A');
                    $('.datos').eq(2).find('p').text(perfil.fecha_nacimiento || 'N/A');
                    $('.datos').eq(3).find('p').text(perfil.grado === 1 ? 'Primer Grado' : perfil.grado === 2 ? 'Segundo Grado' : 'Tercer Grado');
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error en la solicitud:', textStatus, errorThrown);
                console.log('Estado HTTP:', jqXHR.status); // Aquí verificamos el código de estado HTTP
                console.log('Respuesta del servidor:', jqXHR.responseText); // Para ver qué devolvió el servidor
                alert("Hubo un error al cargar el perfil.");
            }
        });
    }


    $('#eliminar-cuenta').click(function(e) {
        e.preventDefault();  // Evita que el enlace realice su acción por defecto

        // Alerta de confirmación
        if (!confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.")) {
            return;  // Si el usuario cancela, no hacer nada
        }

        // Realizar la solicitud AJAX para eliminar la cuenta
        $.ajax({
            url: '../backend/eliminar-cuenta.php',  // Ruta del script PHP que manejará la eliminación de la cuenta
            type: 'POST',
            data: { 
                id_sesion: localStorage.getItem('id_sesion') // Asegúrate de enviar el ID de sesión o cualquier dato necesario
            },
            success: function(response) {
                alert('Cuenta eliminada correctamente.');
                // Redirigir al login u otra página después de eliminar la cuenta
                localStorage.removeItem('id_sesion');  // Eliminar el ID de sesión del localStorage
                window.location.href = '../frontend/inicio.php';   
            },
            error: function() {
                alert("Hubo un error al intentar eliminar la cuenta.");
            }
        });
    });

    $('#logout').click( function(e) {
        e.preventDefault();  // Evita que el enlace realice su acción por defecto
        
        //Alerta de confirmación
        if (!confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            return;
        }

        alert('Sesión cerrada correctamente.');
        // Eliminar el id de sesión en el localStorage
        localStorage.removeItem('id_sesion');

        // Redirigir a la página de inicio de sesión
        window.location.href = '../frontend/inicio.php';
    });
    
    // SE ASIGNA EL EVENTO CLICK AL BOTÓN DE ENVIAR CONTRASEÑA TEMPORAL
    $('#recover').on('click', function(e) {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Validación del email
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailValue = $('input[name="email"]').val();
        if (!emailRegex.test(emailValue)) {
            alert("Por favor introduce un email válido.");
            return;
        }

        alert('Contraseña enviada, favor de volver al inicio.');
        window.location.href = '../frontend/login.php'; // Redirigir al login o inicio

        // Crear un objeto JSON con el email
        let emailJSON = {
            'email': emailValue
        };
    });

    // SE ASIGNA EL EVENTO CLICK AL BOTÓN DE MAS
    $('#mas').on('click', function(e) {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente

        let id_sesion = localStorage.getItem('id_sesion');
    
        // Verifica si hay una sesión activa
        if (!id_sesion) {
            alert("No se encontró una sesión activa.");
            window.location.href = '../frontend/login.php'; // Redirige al login si no hay sesión
            return;
        }

        // Mostrar prompt para pedir la clave
        const clave = prompt("Por favor, introduce la clave:");

        
        console.log(clave);

        if (clave) {
            // Realizar la petición AJAX
            $.ajax({
                url: '../backend/eduplay-validarClave.php', // Archivo PHP para validar la clave
                type: 'POST',
                data: JSON.stringify({ id: id_sesion, clave: clave}),  // Enviar ambos objetos JSON
                contentType: 'application/json; charset=utf-8',// Enviar la clave como POST
                success: function (response) {
                    let result = JSON.parse(response);
                    console.log(result);
                    if (result.status === 'success') {
                        alert('Clave válida, puedes continuar.');
                        window.location.href = 'mas.php'; // Redirigir al enlace
                    } else {
                        alert('Clave incorrecta. Inténtalo de nuevo.');
                    }
                },
                error: function () {
                    alert('Hubo un error al validar la clave. Inténtalo más tarde.');
                }
            });
        } else {
            alert("No se ingresó ninguna clave.");
        }
    });

});

