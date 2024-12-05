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
            <h1>Animales  <img src="src/img/animales.png" alt="Logo español" width= "33.6px" height= "33.6px;"></h1>
            <a href="español.php"><img src="src/img/salir.png" alt="Salir" width= "33.6px" height= "33.6px;" class="salir-btn"></a>
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
            <form id="form_animales_es" action="#">
                <div class="form-group">
                    <label>¿Cuál de estos animales puede volar?</label>
                    <div class="form-images">
                        <img src="src/img/leon.png" alt="Leon">
                        <img src="src/img/perro.png" alt="Perro">
                        <img src="src/img/aguila.png" alt="Águila">
                        <img src="src/img/delfin.png" alt="Delfín">
                    </div>
                    <input type="radio" name="pregunta1" value="A"> A) León<br>
                    <input type="radio" name="pregunta1" value="B"> B) Perro<br>
                    <input type="radio" name="pregunta1" value="C"> C) Águila<br>
                    <input type="radio" name="pregunta1" value="D"> D) Delfín
                </div>

                <div class="form-group">
                    <label>¿Qué animal hace el sonido "miau"?</label>
                    <div class="form-images">
                        <img src="src/img/perro.png" alt="Perro">
                        <img src="src/img/gato.png" alt="Gato">
                        <img src="src/img/vaca.png" alt="Vaca">
                        <img src="src/img/caballo.png" alt="Caballo">
                    </div>
                    <input type="radio" name="pregunta2" value="A"> A) Perro<br>
                    <input type="radio" name="pregunta2" value="B"> B) Gato<br>
                    <input type="radio" name="pregunta2" value="C"> C) Vaca<br>
                    <input type="radio" name="pregunta2" value="D"> D) Caballo
                </div>

                <div class="form-group">
                    <label>¿Cuál de estos animales vive en el agua?</label>
                    <div class="form-images">
                        <img src="src/img/elefante.png" alt="Elefante">
                        <img src="src/img/tiburon.png" alt="Tiburón">
                        <img src="src/img/tigre.png" alt="Tigre">
                        <img src="src/img/loro.png" alt="Loro">
                    </div>
                    <input type="radio" name="pregunta3" value="A"> A) Elefante<br>
                    <input type="radio" name="pregunta3" value="B"> B) Tiburón<br>
                    <input type="radio" name="pregunta3" value="C"> C) Tigre<br>
                    <input type="radio" name="pregunta3" value="D"> D) Loro
                </div>

                <div class="form-group">
                    <label>¿Qué animal pone huevos?</label>
                    <div class="form-images">
                        <img src="src/img/gato.png" alt="Gato">
                        <img src="src/img/gallina.png" alt="Gallina">
                        <img src="src/img/perro.png" alt="Perro">
                        <img src="src/img/caballo.png" alt="Caballo">
                    </div>
                    <input type="radio" name="pregunta4" value="A"> A) Gato<br>
                    <input type="radio" name="pregunta4" value="B"> B) Gallina<br>
                    <input type="radio" name="pregunta4" value="C"> C) Perro<br>
                    <input type="radio" name="pregunta4" value="D"> D) Caballo
                </div>
                <div class="form-btns">
                    <button type="submit" id="form-animales-es"><span>¡He terminado!</span></button>
                </div>
            </form>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="../backend/app.js"></script>
</body>
</html>