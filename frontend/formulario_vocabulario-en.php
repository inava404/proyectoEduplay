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
            <li><button type="submit" id="logout">Salir <img src="src/img/cerrar-sesion.png" alt="Logo salir" width="40px"></button></li>
        </ul>
    </aside>


    <div class="formulario-materias">
        <div class="materias-wrapper">
            <form id="form-vocabulario-en">
            <div class="form-group">
                <label>¿Cómo dices 'hola' en inglés?</label>
                <div class="form-images">
                    <img src="src/img/saludo.png" alt="Saludo">
                </div>
                <input id="1A" type="radio" name="pregunta1" value="A"> A) Goodbye<br>
                <input id="1B" type="radio" name="pregunta1" value="B"> B) Thank you<br>
                <input id="1C" type="radio" name="pregunta1" value="C"> C) Hello<br>
                <input id="1D" type="radio" name="pregunta1" value="D"> D) Please
            </div>

            <div class="form-group">
                <label>¿Qué dices cuándo te despides?</label>
                <div class="form-images">
                    <img src="src/img/adios.png" alt="Despedida">
                </div>
                <input id="2A" type="radio" name="pregunta2" value="A"> A) Goodbye<br>
                <input id="2B" type="radio" name="pregunta2" value="B"> B) Nice to meet you<br>
                <input id="2C" type="radio" name="pregunta2" value="C"> C) I’m sorry<br>
                <input id="2D" type="radio" name="pregunta2" value="D"> D) Welcome
            </div>

            <div class="form-group">
                <label>¿Cómo se dice "Gracias" en inglés?</label>
                <div class="form-images">
                    <img src="src/img/gracias.png" alt="Gracias">
                </div>
                <input id="3A" type="radio" name="pregunta3" value="A"> A) Hello<br>
                <input id="3B" type="radio" name="pregunta3" value="B"> B) Goodbye<br>
                <input id="3C" type="radio" name="pregunta3" value="C"> C) Thank you<br>
                <input id="3D" type="radio" name="pregunta3" value="D"> D) Please
            </div>

            <div class="form-group">
                <label>¿Qué dices cuando te disculpas con alguien?</label>
                <div class="form-images">
                    <img src="src/img/disculpa.png" alt="Disculpa">
                </div>
                <input id="4A" type="radio" name="pregunta4" value="A"> A) Please<br>
                <input id="4B" type="radio" name="pregunta4" value="B"> B) Thank you<br>
                <input id="4C" type="radio" name="pregunta4" value="C"> C) I’m sorry<br>
                <input id="4D" type="radio" name="pregunta4" value="D"> D) Nice to meet you
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