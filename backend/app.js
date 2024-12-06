$(document).ready(function() {
    let validacion, validacionTutor, validacionNino;
    
    if ($('#form-login').length) {
        validacion = new JustValidate('#form-login');

        validacion
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'El email es obligatorio',  // Agrega mensaje de error
            },
            {
                rule: 'email',
                errorMessage: 'Introduce un email válido.',  // Agrega mensaje de error
            },
        ])
        .addField('#password', [
            {
                rule: 'required',
                errorMessage: 'La contraseña es obligatoria.',
            },
            {
                rule: 'minLength',
                value: 8,
                errorMessage: 'La contraseña debe tener al menos 8 caracteres.',
            },
        ]);
    }

    
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

        validacion.validate().then(function(isValid) {
            if(isValid) {
    
        // Si ambas validaciones pasan
        alert("Validaciones correctas, puedes proceder.");
    
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
                    console.log(response);  // Mostrar la respuesta del servidor
                    let result = JSON.parse(response);  // Parsear la respuesta JSON
                    if (result.status === 'success') {
                        localStorage.setItem('id_sesion', result.id_sesion);  // Almacenar el ID de sesión
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
        }
    });
    });

    if ($('#form-tutor').length) {
        validacionTutor = new JustValidate("#form-tutor");
            validacionTutor
            .addField('#nombre', [
                {
                    rule: 'required',
                    errorMessage: 'El nombre es obligatorio.',
                },
                {
                    rule: 'minLength',
                    value: 2,
                    errorMessage: 'El nombre debe tener al menos 2 caracteres.',
                },
                {
                    rule: 'maxLength',
                    value: 50,
                    errorMessage: 'El nombre no puede tener más de 50 caracteres.',
                },
            ])
            .addField('#apellido', [
                {
                    rule: 'required',
                    errorMessage: 'Los apellidos son obligatorios.',
                },
                {
                    rule: 'minLength',
                    value: 2,
                    errorMessage: 'Los apellidos deben tener al menos 2 caracteres.',
                },
                {
                    rule: 'maxLength',
                    value: 50,
                    errorMessage: 'Los apellidos no pueden tener más de 50 caracteres.',
                },
            ])
            .addField('#fecha_nac', [
                {
                    rule: 'required',
                    errorMessage: 'La fecha de nacimiento es obligatoria.',
                },
                {
                    rule: 'customRegexp',
                    value: /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,  // Expresión regular para formato dd/mm/yyyy
                    errorMessage: 'Introduce una fecha válida (dd/mm/yyyy).',
                },
            ])
            .addField('#email', [
                {
                    rule: 'required',
                    errorMessage: 'El email es obligatorio.',
                },
                {
                    rule: 'email',
                    errorMessage: 'Introduce un email válido.',
                },
            ])
            .addField('#password', [
                {
                    rule: 'required',
                    errorMessage: 'La contraseña es obligatoria.',
                },
                {
                    rule: 'minLength',
                    value: 8,
                    errorMessage: 'La contraseña debe tener al menos 8 caracteres.',
                },
                {
                    rule: 'maxLength',
                    value: 50,
                    errorMessage: 'La contraseña no puede tener más de 50 caracteres.',
                },
            ])
            .addField('#password_conf', [
                {
                    rule: 'required',
                    errorMessage: 'La confirmación de la contraseña es obligatoria.',
                },
                {
                    rule: 'minLength',
                    value: 8,
                    errorMessage: 'La contraseña debe tener al menos 8 caracteres.',
                },
                {
                    rule: 'maxLength',
                    value: 50,
                    errorMessage: 'La contraseña no puede tener más de 50 caracteres.',
                },
                {
                    rule: 'custom',
                    errorMessage: 'Las contraseñas no coinciden.',
                    validator: function() {
                        const password = document.querySelector('#password').value;
                        const confirmPassword = document.querySelector('#password_conf').value;
                        return password === confirmPassword;
                    },
                },
            ]);
    }

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

        //Ejecuta las validaciones de JustValidate
        validacionTutor.validate().then(function(isValid) {
            if (isValid) {
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
            };
        });
    });

    if ($('#form-nino').length) {
        validacionNino = new JustValidate("#form-nino");
        validacionNino
            .addField('#nombre', {
                rules: {
                    required: true,
                    minLength: 2,
                    maxLength: 50
                }
            })
            .addField('#apellido', {
                rules: {
                    required: true,
                    minLength: 2,
                    maxLength: 50
                }
            })
            .addField('#password', [
                {
                    rule: 'required',
                    errorMessage: 'La contraseña es obligatoria.',
                },
                {
                    rule: 'minLength',
                    value: 8,
                    errorMessage: 'La contraseña debe tener al menos 8 caracteres.',
                },
                {
                    rule: 'maxLength',
                    value: 50,
                    errorMessage: 'La contraseña no puede tener más de 50 caracteres.',
                },
                {
                    rule: 'custom',
                    errorMessage: 'Las contraseñas no coinciden.',
                    validator: function() {
                        const password = document.querySelector('#password').value;
                        const confirmPassword = document.querySelector('#password_conf').value;
                        return password === confirmPassword;
                    },
                },
            ]);
    }
    

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
        
        validacionNino.validate().then(function(isValid) {
            if (isValid) {
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
            pregunta1: $('#pregunta1:checked').val(),
            pregunta2: $('#pregunta2:checked').val(),
            pregunta3: $('#pregunta3:checked').val(),
            pregunta4: $('#pregunta4:checked').val(),
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

        // Obtener las respuestas seleccionadas para cada pregunta
        var respuestas = {
            materia: "español",
            tipo_material: "animales",
            pregunta1: $('#pregunta1:checked').val(),
            pregunta2: $('#pregunta2:checked').val(),
            pregunta3: $('#pregunta3:checked').val(),
            pregunta4: $('#pregunta4:checked').val(),
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
            pregunta1: $('#pregunta1:checked').val(),
            pregunta2: $('#pregunta2:checked').val(),
            pregunta3: $('#pregunta3:checked').val(),
            pregunta4: $('#pregunta4:checked').val(),
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
            pregunta1: $('#pregunta1:checked').val(),
            pregunta2: $('#pregunta2:checked').val(),
            pregunta3: $('#pregunta3:checked').val(),
            pregunta4: $('#pregunta4:checked').val(),
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
            pregunta1: $('#pregunta1:checked').val(),
            pregunta2: $('#pregunta2:checked').val(),
            pregunta3: $('#pregunta3:checked').val(),
            pregunta4: $('#pregunta4:checked').val(),
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
            pregunta1: $('#pregunta1:checked').val(),
            pregunta2: $('#pregunta2:checked').val(),
            pregunta3: $('#pregunta3:checked').val(),
            pregunta4: $('#pregunta4:checked').val(),
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
            pregunta1: $('#pregunta1:checked').val(),
            pregunta2: $('#pregunta2:checked').val(),
            pregunta3: $('#pregunta3:checked').val(),
            pregunta4: $('#pregunta4:checked').val(),
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
            pregunta1: $('#pregunta1:checked').val(),
            pregunta2: $('#pregunta2:checked').val(),
            pregunta3: $('#pregunta3:checked').val(),
            pregunta4: $('#pregunta4:checked').val(),
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
    $('#colores-en').submit(function(e){
        e.preventDefault();

        // Obtener las respuestas seleccionadas para cada pregunta
        var respuestas = {
            materia: "ingles",
            tipo_material: "colores",
            pregunta1: $('#pregunta1:checked').val(),
            pregunta2: $('#pregunta2:checked').val(),
            pregunta3: $('#pregunta3:checked').val(),
            pregunta4: $('#pregunta4:checked').val(),
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

    // Al cargar la página, obtener el perfil del usuario
    if (window.location.pathname.includes('../frontend/perfil.php')) {
        id_sesion = localStorage.getItem('id_sesion');

        if (!id_sesion) {
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
                    const perfil = result.perfil;
                    const progreso = result.progreso;
                    const grados = {
                        1: 'Primer Grado',
                        2: 'Segundo Grado',
                        3: 'Tercer Grado'
                    }
                    let grado = grados[perfil.grado] || "Grado no disponible";

                    // Actualizar datos del perfil en el DOM
                    $('.perfil-detalles').html(`
                        <h3>${perfil.nombre}</h3>
                        <h3>Apodo: ${perfil.apodo}</h3>
                        <h3>Grado: ${grado}</h3>
                        <h3>Edad: ${calcularEdad(perfil.fecha_nacimiento)} años</h3>
                    `);

                    // Asumiendo orden en el DOM: Español, Matemáticas, Inglés
                    $('.curso .progreso').eq(0).css('width', progreso.Español + '%');
                    $('.curso .progreso').eq(1).css('width', progreso.Matemáticas + '%');
                    $('.curso .progreso').eq(2).css('width', progreso.Inglés + '%');
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

    $('#logout').on('click', function(e) {
        e.preventDefault();  // Evita que el enlace realice su acción por defecto
        
        //Alerta de confirmación
        if (!confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            return;
        }

        // Realizar la solicitud AJAX para cerrar sesión en el servidor
        $.ajax({
            url: '../backend/eduplay-logout.php',  // Ruta del script PHP para cerrar sesión
            type: 'POST',
            data: { action: 'logout' },  // Enviar un dato para identificar que es un cierre de sesión
            success: function(response) {
                // Si el cierre de sesión en el servidor es exitoso
                let result = JSON.parse(response);
                if (result.status === 'success') {
                    // Eliminar el id de sesión en el localStorage
                    localStorage.removeItem('id_sesion');
    
                    // Redirigir a la página de inicio de sesión
                    window.location.href = '../backend/incio.php';
                } else {
                    alert('Hubo un error al cerrar sesión. Inténtalo de nuevo.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error en la solicitud:', textStatus, errorThrown);
                alert("Hubo un error al intentar cerrar sesión.");
            }
        });
    });
    

});

