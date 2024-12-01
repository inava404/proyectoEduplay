
$(document).ready(function() {
    
    // SE ASIGNA EL EVENTO CLICK AL BOTON DE INICIAR SESIÖN
    $('#login').click(function(e){
        e.preventDefault();
        
        if(!verifFinal(edit)){
            return;
        }

        //SE OBTIENEN LOS VALORES DE LOS INPUTS
        let email = $('#email').val();
        let password = $('#password').val();
    
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
                if (result.status === 'success') {
                    alert('Registro exitoso.');
                    window.location.href = '../frontend/principal.php';  // Redirigir al login o a otra página
                } else {
                    alert('Error en el login: ' + result.message);
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
            'email': email,
            'nombre': nombre,
            'apellidos': apellidos,
            'fecha_nac': fecha_nac,
            'contrasena': contrasena,  
        };


        localStorage.setItem('tutorData', JSON.stringify(tutorData));

        // Hacer la petición AJAX para registrar el tutor
        $.ajax({
            url: '../backend/eduplay-add.php',  // URL del script PHP que procesará la solicitud
            type: 'POST',
            data: JSON.stringify({tutor: tutorData}),  // Enviar el objeto JSON convertido a string
            contentType: 'application/json; charset=utf-8',  // Enviar como JSON
            success: function (response) {
                console.log(response);  // Mostrar la respuesta del servidor

                const result = JSON.parse(response);
                
                window.location.href = '../frontend/signup-niño.php';  // Redirigir al formulario del niño
            }
        });
    });

    $('#signup_nino').on('click', function(e){
        e.preventDefault();
        
        // Obtener los valores de los inputs del formulario del niño
        let grado = $('select[name="Grado"]').val();
        let nombre_nino = $('input[placeholder="Nombre del Niño"]').val();
        let apellidos_nino = $('input[placeholder="Apellidos del Niño"]').val();
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
                    window.location.href = '..frontend/login.php';  // Redirigir al login o a otra página
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

    });


    //AREA DE VALIDACIONES
    // VALIDAR NOMBRE
    $("#name").on("blur",function() {
        verifNombre(edit).then(function(isValid) {
            if (isValid) {
                return;
            }
        });
    });

    // VALIDAR PRECIO
    $("#precio").on("blur", function() {
        if(verifPrecio()){
            return;
        }
    });

    //VALIDAR UNIDADES
    $("#unidades").on("blur", function() {
        if(verifUnidades()){
            return;
        }
    });

    // VALIDAR MODELO
    $("#modelo").on("blur",function() {
        if(verifModelo()){
            return;
        }
    });

    //VALIDAR MARCA
    $("#marca").on("blur",function() {
        if(verifMarca()){
            return;
        }
    });

    //VALIDAR DETALLES
    $("#detalles").on("blur",function() {
        if(verifDetalles()){
            return;
        }
    });

    //VALIDAR IMAGEN
    $("#imagen").on("blur",function() {
        if(verifImagen()){
            return;
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


function verifPrecio(){
var final = true;
let status = 'success';
let message = "Validación de precio exitosa"
var precio = document.getElementById('precio').value;

    if(precio.length == 0){
        status = 'error';
        message = 'El modelo es un requisito requerido.';
        final = false;
    }
    else{
        var aux = parseFloat(precio);
        if(aux < 99.99){
            status = 'error';
            message = 'El precio debe de ser mayor a $ 99.99.';
            final = false;
        }
    }
    

    mostrarBarraVerif(status, message);


    return (final);
}

function verifUnidades(){
    var final = true;
    let status = 'success';
    let message = "Validación de unidades exitosa"
    var unidades = document.getElementById('unidades').value;
    var aux = parseInt(unidades);
    
    if(unidades.length == 0){
        status = 'error';
        message = 'Las unidades son un requisito requerido.';
        final = false;
    }
    else{
        if(aux < 0){
            status = 'error';
            message = 'Las unidades deben ser mayor o igual a 0.';
            final = false;
        }
    }


    mostrarBarraVerif(status, message);

    return (final);
}

function verifModelo(){
    var final = true;
    let status = 'success';
    let message = "Validación de modelo exitosa"
    var modelo = document.getElementById('modelo').value;
    
    if(modelo.length == 0){
        status = 'error';
        message = 'El modelo es un requisito requerido.';
        final = false;
    }
    else{
        if(!/^[A-Za-z0-9 ]+$/.test(modelo)){
            status = 'error';
            message = 'El modelo debe de estar escrito en formato alfanumerico.';
            final = false;
        }
        else{
            if(modelo.length > 25){
                status = 'error';
                message = 'El modelo debe de tener menos de 25 caracteres.';
                final = false;
            }
        }
    }


    mostrarBarraVerif(status, message);


    return (final);
}

function verifMarca(){
    var final = true;
    let status = 'success';
    let message = "Validación de marca exitosa"
    var marca = document.getElementById('marca').value;
    let marcas = ["HP", "Asus", "Acer", "Huawei"];
    
    if(marca.length == 0){
        status = 'error';
        message = 'La marca es un requisito requerido.';
        final = false;
    }
    else{
        if(!marcas.includes(marca)){
            status = 'error';
            message = 'Elije una de las marcas predefinidas.';
            final = false;
        }
    }

    mostrarBarraVerif(status, message);
    

    return (final);
}

function verifDetalles(){
    var final = true;
    let status = 'success';
    let message = "Validación de detalles exitosa"
    var detalles = document.getElementById('detalles').value;
    
    if(detalles.length == 0){
        document.getElementById('detalles').value = "S/D"
    }
    else{
        if (detalles.length > 250){
            status = 'error';
            message = 'Los detalles deben de tener 250 caracteres o menos.';
            final = false;
        }
    }

    mostrarBarraVerif(status, message);

    return (final);
}

function verifImagen(){
    var final = true;
    let status = 'success';
    let message = "Validación de URL de imagen exitosa"
    var imagen = document.getElementById('imagen').value;
    
    if(imagen.length == 0){
        imagen = 'img/imagen.png';
    }

    mostrarBarraVerif(status, message);

    return (final);
}

function mostrarBarraVerif(status, message){
    let template_bar = '';
    template_bar += `
        <li style="list-style: none;">status: ${status}</li>
        <li style="list-style: none;">message: ${message}</li>
    `;
    // SE HACE VISIBLE LA BARRA DE ESTADO
    document.getElementById("product-result").className = "card my-4 d-block";
    // SE INSERTA LA PLANTILLA PARA LA BARRA DE ESTADO
    document.getElementById("container").innerHTML = template_bar;
}


function verifFinal(edit){
    var final = true;
    let status = 'success';
    let message = "Validación de envio de formulario exitosa"

    for(var i=1; i<8; i++){
        switch(i){
            case 1: final = verifNombre(edit);
                    if(final == false){
                        i = 8;
                    }
                    break;
            case 2: final = verifPrecio();
                    if(final == false){
                        i = 8;
                    }
                    break;
            case 3: final = verifUnidades();
                    if(final == false){
                        i = 8;
                    }
                    break;
            case 4: final = verifModelo();
                    if(final == false){
                        i = 8;
                    }
                    break;
            case 5: final = verifMarca();
                    if(final == false){
                        i = 8;
                    }
                    break; 
            case 6: final = verifDetalles();
                    if(final == false){
                        i = 8;
                    }
                    break;
            case 7: final = verifImagen();
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

    mostrarBarraVerif(status, message);
    return(final);
}
