<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eduplay</title>
    <link rel="stylesheet" href="https://bootswatch.com/4/lux/bootstrap.min.css">
    <link rel="stylesheet" href="src/estilo.css">
</head>

<body style="background-image: none;">
    <header>
        <div class="top-bar" style="height: 62px">
            <h1>Vocabulario  <img src="src/img/vocabulario.png" alt="Logo español" width= "33.6px" height= "33.6px;"></h1>
            <a href="ingles.php"><img src="src/img/salir.png" alt="Salir" width= "33.6px" height= "33.6px;" class="salir-btn"></a>
        </div>
    </header>

    <aside class="sidebar">
        <a href="principal.php"><img src="src/img/EduplayLogo.png" alt="Eduplay Logo" width="270px"></a>
        <ul>
            <li><a href="principal.php">Cursos <img src="src/img/cursos.png" alt="Logo cursos" width="40px"></a></li>
            <li><a href="retos.php">Retos <img src="src/img/retos.png" alt="Logo retos" width="40px"></a></li>
            <li><a href="perfil.php">Perfil <img src="src/img/perfil.png" alt="Logo perfil" width="40px"></a></li>
            <li><a href="mas.php">Más <img src="src/img/Más.png" alt="Logo más" width="40px"></a></li>
        </ul>
    </aside>


    <div class="formulario-materias">
        <div class="materias-wrapper">
            <form id="vocabulario-en">
                <div class="form-group">
                    <label>¿Cómo se llama el lugar donde estudias?</label><br>
                    <div class="form-images">
                        <img src="src/img/parque.png" alt="Parque">
                        <img src="src/img/escuela.png" alt="Escuela">
                        <img src="src/img/casa.png" alt="Casa">
                        <img src="src/img/tienda.png" alt="Tienda">
                    </div>
                    <input type="radio" name="pregunta1" value="A"> A) Parque<br>
                    <input type="radio" name="pregunta1" value="B"> B) Escuela<br>
                    <input type="radio" name="pregunta1" value="C"> C) Casa<br>
                    <input type="radio" name="pregunta1" value="D"> D) Tienda
                </div>

                <div class="form-group">
                    <label>¿Qué palabra es el nombre de un juguete?</label>
                    <div class="form-images">
                        <img src="src/img/pelota.png" alt="Pelota">
                    </div>
                    <input type="radio" name="pregunta2" value="A"> A) Pelota<br>
                    <input type="radio" name="pregunta2" value="B"> B) Escuela<br>
                    <input type="radio" name="pregunta2" value="C"> C) Avión<br>
                    <input type="radio" name="pregunta2" value="D"> D) Sol
                </div>

                <div class="form-group">
                    <label>¿Qué haces cuando tienes sueño?</label>
                    <div class="form-images">
                        <img src="src/img/correr.png" alt="Correr">
                        <img src="src/img/nadar.png" alt="Nadar">
                        <img src="src/img/dormir.png" alt="Dormir">
                        <img src="src/img/jugar.png" alt="Jugar">
                    </div>
                    <input type="radio" name="pregunta3" value="A"> A) Correr<br>
                    <input type="radio" name="pregunta3" value="B"> B) Nadar<br>
                    <input type="radio" name="pregunta3" value="C"> C) Dormir<br>
                    <input type="radio" name="pregunta3" value="D"> D) Jugar
                </div>

                <div class="form-group">
                    <label>¿Con que escribes?</label>
                    <div class="form-images">
                        <img src="src/img/lapiz.png" alt="Lapiz">
                        <img src="src/img/goma.png" alt="Goma">
                        <img src="src/img/tijeras.png" alt="Tijeras">
                        <img src="src/img/pegamento.png" alt="Pegamento">
                    </div>
                    <input type="radio" name="pregunta4" value="A"> A) Lapiz<br>
                    <input type="radio" name="pregunta4" value="B"> B) Goma<br>
                    <input type="radio" name="pregunta4" value="C"> C) Pegamento<br>
                    <input type="radio" name="pregunta4" value="D"> D) Tijeras
                </div>
                <div class="form-btns">
                    <button type="submit" id="form-vocabulario-en"><span>¡He terminado!</span></button>
                </div>
            </form>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src=""></script>
</body>
</html>