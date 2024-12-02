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
            <li><a href="mas.php">Más <img src="src/img/Más.png" alt="Logo más" width="40px"></a></li>
        </ul>
    </aside>


    <div class="formulario-materias">
        <div class="materias-wrapper">
        <form>
            <div class="form-group">
                <label>¿Cuántos manzanas hay en la imagen?</label>
                <div class="form-images">
                    <img src="src/img/manzanaRoja.png" alt="Manzana">
                    <img src="src/img/manzanaRoja.png" alt="Manzana">
                    <img src="src/img/manzanaRoja.png" alt="Manzana">
                </div>
                <input type="radio" name="pregunta1" value="A"> A) 2<br>
                <input type="radio" name="pregunta1" value="B"> B) 3<br>
                <input type="radio" name="pregunta1" value="C"> C) 4<br>
                <input type="radio" name="pregunta1" value="D"> D) 5
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
                <input type="radio" name="pregunta2" value="A"> A) 2<br>
                <input type="radio" name="pregunta2" value="B"> B) 3<br>
                <input type="radio" name="pregunta2" value="C"> C) 6<br>
                <input type="radio" name="pregunta2" value="D"> D) 5
            </div>

            <div class="form-group">
                <label>¿Cuántos dedos hay en una mano?</label>
                <div class="form-images">
                    <img src="src/img/mano.png" alt="Mano">
                </div>
                <input type="radio" name="pregunta3" value="A"> A) 4<br>
                <input type="radio" name="pregunta3" value="B"> B) 5<br>
                <input type="radio" name="pregunta3" value="C"> C) 6<br>
                <input type="radio" name="pregunta3" value="D"> D) 1
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
                <input type="radio" name="pregunta4" value="A"> A) 7<br>
                <input type="radio" name="pregunta4" value="B"> B) 4<br>
                <input type="radio" name="pregunta4" value="C"> C) 6<br>
                <input type="radio" name="pregunta4" value="D"> D) 8
            </div>
            <div class="form-btns">
                <a href="#"><span>¡He terminado!</span></a>
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