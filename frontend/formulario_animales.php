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
            <h1>Colores<img src="src/img/español.png" alt="Logo español" width= "33.6px" height= "33.6px;"></h1>
        </div>
    </header>

    <aside class="sidebar">
        <img src="src/img/EduplayLogo.png" alt="Eduplay Logo" width="270px">
        <ul>
            <li><a href="#">Cursos <img src="src/img/cursos.png" alt="Logo cursos" width="40px"></a></li>
            <li><a href="#">Retos <img src="src/img/retos.png" alt="Logo retos" width="40px"></a></li>
            <li><a href="#">Perfil <img src="src/img/perfil.png" alt="Logo perfil" width="40px"></a></li>
            <li><a href="#">Más <img src="src/img/Más.png" alt="Logo más" width="40px"></a></li>
        </ul>
    </aside>


    <div class="formulario-materias">
        <h3>Formulario de Español: Animales</h3>
        <form>
        <div class="form-group">
            <label>¿Cuál de estos animales puede volar?</label><br>
            <img src="src/img/cursos.png" alt="im" width="40px">
            <img src="src/img/cursos.png" alt="im" width="40px">
            <img src="src/img/cursos.png" alt="im" width="40px">
            <img src="src/img/cursos.png" alt="im" width="40px">
            <br>
            <input type="radio" name="pregunta1" value="A"> A) León<br>
            <input type="radio" name="pregunta1" value="B"> B) Perro<br>
            <input type="radio" name="pregunta1" value="C"> C) Águila<br>
            <input type="radio" name="pregunta1" value="D"> D) Delfín
        </div>

        <div class="form-group">
            <label>¿Qué animal hace el sonido "miau"?</label><br>
            <img src="src/img/cursos.png" alt="im" width="40px">
            <img src="src/img/cursos.png" alt="im" width="40px">
            <img src="src/img/cursos.png" alt="im" width="40px">
            <img src="src/img/cursos.png" alt="im" width="40px">
            <br>
            <input type="radio" name="pregunta2" value="A"> A) Perro<br>
            <input type="radio" name="pregunta2" value="B"> B) Gato<br>
            <input type="radio" name="pregunta2" value="C"> C) Vaca<br>
            <input type="radio" name="pregunta2" value="D"> D) Caballo
        </div>

        <div class="form-group">
            <label>¿Cuál de estos animales vive en el agua?</label><br>
            <img src="src/img/cursos.png" alt="im" width="40px">
            <img src="src/img/cursos.png" alt="im" width="40px">
            <img src="src/img/cursos.png" alt="im" width="40px">
            <img src="src/img/cursos.png" alt="im" width="40px">
            <br>
            <input type="radio" name="pregunta3" value="A"> A) Elefante<br>
            <input type="radio" name="pregunta3" value="B"> B) Tiburón<br>
            <input type="radio" name="pregunta3" value="C"> C) Tigre<br>
            <input type="radio" name="pregunta3" value="D"> D) Loro
        </div>

        <div class="form-group">
            <label>¿Qué animal pone huevos?</label><br>
            <img src="src/img/cursos.png" alt="im" width="40px">
            <img src="src/img/cursos.png" alt="im" width="40px">
            <img src="src/img/cursos.png" alt="im" width="40px">
            <img src="src/img/cursos.png" alt="im" width="40px">
            <br>
            <input type="radio" name="pregunta4" value="A"> A) Gato<br>
            <input type="radio" name="pregunta4" value="B"> B) Gallina<br>
            <input type="radio" name="pregunta4" value="C"> C) Perro<br>
            <input type="radio" name="pregunta4" value="D"> D) Caballo
        </div>

        <button type="submit" class="btn btn-primary">Enviar respuestas</button>
    </form>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src=""></script>
</body>
</html>