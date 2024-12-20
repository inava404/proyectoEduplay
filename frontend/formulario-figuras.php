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
            <h1>Figuras  <img src="src/img/figuras.png" alt="Logo español" width= "33.6px" height= "33.6px;"></h1>
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
        <form id="figuras">
        <div class="form-group">
            <label>¿Qué figura es un círculo?</label>
            <div class="form-images">
                <img src="src/img/cuadrado-azul.png" alt="Cuadrado">
                <img src="src/img/circulo.png" alt="Círculo">
                <img src="src/img/triangulo-verde.png" alt="Triángulo">
                <img src="src/img/rectangulo.png" alt="Rectángulo">
            </div>
            <input id="1A" type="radio" name="pregunta1" value="A"> A) Cuadrado<br>
            <input id="1B" type="radio" name="pregunta1" value="B"> B) Círculo<br>
            <input id="1C" type="radio" name="pregunta1" value="C"> C) Triángulo<br>
            <input id="1D" type="radio" name="pregunta1" value="D"> D) Rectángulo
        </div>

        <div class="form-group">
            <label>¿Qué figura tiene tres lados?</label>
            <div class="form-images">
                <img src="src/img/cuadrado.png" alt="Cuadrado">
                <img src="src/img/circulo-azul.png" alt="Círculo">
                <img src="src/img/triangulo.png" alt="Triángulo">
                <img src="src/img/rectangulo-rosa.png" alt="Rectángulo">
            </div>
            <input id="2A" type="radio" name="pregunta2" value="A"> A) Cuadrado<br>
            <input id="2B" type="radio" name="pregunta2" value="B"> B) Círculo<br>
            <input id="2C" type="radio" name="pregunta2" value="C"> C) Triángulo<br>
            <input id="2D" type="radio" name="pregunta2" value="D"> D) Rectángulo
        </div>

        <div class="form-group">
            <label>¿Cuál de estas figuras es más grande?</label>
            <div class="form-images">
                <img src="src/img/triangulo-rojo.png" alt="Triángulo Grande">
                <img src="src/img/cuadrado-azul.png" alt="Cuadrado Pequeño" style="width: 30px; height: 30px;">
            </div>
            <input id="3A" type="radio" name="pregunta3" value="A"> A) Cuadrado<br>
            <input id="3B" type="radio" name="pregunta3" value="B"> B) Triángulo
        </div>

        <div class="form-group">
            <label>¿La figura de color rojo es un...</label>
            <div class="form-images">
                <img src="src/img/circulo.png" alt="Círculo">
            </div>
            <input id="4A" type="radio" name="pregunta4" value="A"> A) Triángulo<br>
            <input id="4B" type="radio" name="pregunta4" value="B"> B) Cuadrado<br>
            <input id="4C" type="radio" name="pregunta4" value="C"> C) Círculo
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