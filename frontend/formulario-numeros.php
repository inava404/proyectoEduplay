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
            <h1>Números  <img src="src/img/numeros.png" alt="Logo español" width= "33.6px" height= "33.6px;"></h1>
            <a href="matematicas.php"><img src="src/img/salir.png" alt="Salir" width= "33.6px" height= "33.6px;" class="salir-btn"></a>
        </div>
    </header>

    <aside class="sidebar">
        <a href="principal.php"><img src="src/img/EduplayLogo.png" alt="Eduplay Logo" width="270px"></a>
        <ul>
            <li><a href="principal.php">Cursos <img src="src/img/cursos.png" alt="Logo cursos" width="40px"></a></li>
            <li><a href="retos.php">Retos <img src="src/img/retos.png" alt="Logo retos" width="40px"></a></li>
            <li><a href="perfil.php">Perfil <img src="src/img/perfil.png" alt="Logo perfil" width="40px"></a></li>
            <li><a href="mas.php" id="mas">Más <img src="src/img/Más.png" alt="Logo más" width="40px"></a></li>
            <li><button type="submit" id="logout">Salir <img src="src/img/cerrar-sesion.png" alt="Logo salir" width="40px"></button></li>
        </ul>
    </aside>


    <div class="formulario-materias">
        <div class="materias-wrapper">
        <form id="numeros">
            <div class="form-group">
                <label>¿Cuántos manzanas hay en la imagen?</label>
                <div class="form-images">
                    <img src="src/img/manzanaRoja.png" alt="Manzana">
                    <img src="src/img/manzanaRoja.png" alt="Manzana">
                    <img src="src/img/manzanaRoja.png" alt="Manzana">
                </div>
                <input id="1A" type="radio" name="pregunta1" value="A"> A) 2<br>
                <input id="1B" type="radio" name="pregunta1" value="B"> B) 3<br>
                <input id="1C" type="radio" name="pregunta1" value="C"> C) 4<br>
                <input id="1D" type="radio" name="pregunta1" value="D"> D) 5
            </div>

            <div class="form-group">
                <label>¿Qué número viene después del 4?</label>
                <div class="form-images">
                    <img src="src/img/1.png" alt="Numero 1">
                    <img src="src/img/2.png" alt="Numero 2">
                    <img src="src/img/3.png" alt="Numero 3">
                    <img src="src/img/4.png" alt="Numero 4">
                    <img src="src/img/5.png" alt="Numero 5">
                </div>
                <input id="2A" type="radio" name="pregunta2" value="A"> A) 2<br>
                <input id="2B" type="radio" name="pregunta2" value="B"> B) 3<br>
                <input id="2C" type="radio" name="pregunta2" value="C"> C) 6<br>
                <input id="2D" type="radio" name="pregunta2" value="D"> D) 5
            </div>

            <div class="form-group">
                <label>¿Cuántos dedos hay en una mano?</label>
                <div class="form-images">
                    <img src="src/img/mano.png" alt="Mano">
                </div>
                <input id="3A" type="radio" name="pregunta3" value="A"> A) 4<br>
                <input id="3B" type="radio" name="pregunta3" value="B"> B) 5<br>
                <input id="3C" type="radio" name="pregunta3" value="C"> C) 6<br>
                <input id="3D" type="radio" name="pregunta3" value="D"> D) 1
            </div>

            <div class="form-group">
                <label>¿Cuántos patos hay?</label>
                <div class="form-images">
                    <img src="src/img/pato.png" alt="Pato">
                    <img src="src/img/pato.png" alt="Pato">
                    <img src="src/img/pato.png" alt="Pato">
                    <img src="src/img/pato.png" alt="Pato">
                    <img src="src/img/pato.png" alt="Pato">
                    <img src="src/img/pato.png" alt="Pato">
                    <img src="src/img/pato.png" alt="Pato">
                </div>
                <input id="4A" type="radio" name="pregunta4" value="A"> A) 7<br>
                <input id="4B" type="radio" name="pregunta4" value="B"> B) 4<br>
                <input id="4C" type="radio" name="pregunta4" value="C"> C) 6<br>
                <input id="4D" type="radio" name="pregunta4" value="D"> D) 8
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
    <script src="../backend/app.js"></script>
</body>
</html>