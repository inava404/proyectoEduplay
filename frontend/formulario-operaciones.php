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
            <h1>Sumas y Restas  <img src="src/img/operaciones.png" alt="Logo español" width= "33.6px" height= "33.6px;"></h1>
            <a href="matematicas.php"><img src="src/img/salir.png" alt="Salir" width= "33.6px" height= "33.6px;" class="salir-btn"></a>
        </div>
    </header>

    <aside class="sidebar">
        <a href="principal.php"><img src="src/img/EduplayLogo.png" alt="Eduplay Logo" width="270px"></a>
        <ul>
            <li><a href="principal.php">Cursos <img src="src/img/cursos.png" alt="Logo cursos" width="40px"></a></li>
            <li><a href="retos.php">Retos <img src="src/img/retos.png" alt="Logo retos" width="40px"></a></li>
            <li><a href="perfil.php">Perfil <img src="src/img/perfil.png" alt="Logo perfil" width="40px"></a></li>
            <li><a href="mas.php">Más <img src="src/img/Más.png" alt="Logo más" width="40px"></a></li>
            <li><a href="inicio.php">Salir <img src="src/img/cerrar-sesion.png" alt="Logo salir" width="40px"></a></li>
        </ul>
    </aside>


    <div class="formulario-materias">
        <div class="materias-wrapper">
        <form id="operaciones">
            <div class="form-group">
                <label>¿Cuánto es 2 + 3?</label>
                <div class="form-images">
                    <img src="src/img/2.png" alt="Dos">
                    <img src="src/img/mas.png" alt="Suma">
                    <img src="src/img/3.png" alt="Tres">
                </div>
                <input type="radio" name="pregunta1" value="A"> A) 4<br>
                <input type="radio" name="pregunta1" value="B"> B) 5<br>
                <input type="radio" name="pregunta1" value="C"> C) 6<br>
                <input type="radio" name="pregunta1" value="D"> D) 7
            </div>

            <div class="form-group">
                <label>Si tienes 5 manzanas y comes 2, ¿cuántas te quedan?</label>
                <div class="form-images">
                    <img src="src/img/manzanaRoja.png" alt="Manzana">
                    <img src="src/img/manzanaRoja.png" alt="Manzana">
                    <img src="src/img/manzanaRoja.png" alt="Manzana">
                    <img src="src/img/manzanaRoja.png" alt="Manzana">
                    <img src="src/img/manzanaRoja.png" alt="Manzana">
                </div>
                <input type="radio" name="pregunta2" value="A"> A) 2<br>
                <input type="radio" name="pregunta2" value="B"> B) 3<br>
                <input type="radio" name="pregunta2" value="C"> C) 4<br>
                <input type="radio" name="pregunta2" value="D"> D) 5
            </div>

            <div class="form-group">
                <label>Si tienes 2 perros y llega otro más, ¿Cuántos perros tienes ahora?</label>
                <div class="form-images">
                    <img src="src/img/perro.png" alt="Perro uno">
                    <img src="src/img/perro1.png" alt="Perro dos">
                    <img src="src/img/perro2.png" alt="Perro tres">
                </div>
                <input type="radio" name="pregunta3" value="A"> A) 4<br>
                <input type="radio" name="pregunta3" value="B"> B) 3<br>
                <input type="radio" name="pregunta3" value="C"> C) 5<br>
                <input type="radio" name="pregunta3" value="D"> D) 2
            </div>

            <div class="form-group">
                <label>¿Cuánto es 6 - 4?</label>
                <div class="form-images">
                    <img src="src/img/6.png" alt="Seis">
                    <img src="src/img/menos.png" alt="Resta">
                    <img src="src/img/4.png" alt="Cuatro">
                </div>
                <input type="radio" name="pregunta4" value="A"> A) 1<br>
                <input type="radio" name="pregunta4" value="B"> B) 2<br>
                <input type="radio" name="pregunta4" value="C"> C) 3<br>
                <input type="radio" name="pregunta4" value="D"> D) 4
            </div>
            <div class="form-btns">
                <button type="submit" id="form-figuras"><span>¡He terminado!</span></button>
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