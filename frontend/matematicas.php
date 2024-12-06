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
        <div class="top-bar">
            <h1>Matemáticas  <img src="src/img/matematicas.png" alt="Logo español" width= "33.6px" height= "33.6px;"></h1>
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

    <div class="section-principal"> 
        <h2 style="padding-top: 20px">Escoge el tema de hoy</h2>
        <div class="section-inicio-btns">
            <ul>
                <li><a href="formulario-numeros.php"><span>Números</span></a><img src="src/img/numeros.png" alt="Logo números"></li>
                <li><a href="formulario-figuras.php"><span>Figuras</span></a><img src="src/img/figuras.png" alt="Logo figuras"></li>
                <li><a href="formulario-operaciones.php"><span>Sumas y Restas</span></a><img src="src/img/operaciones.png" alt="Logo operaciones"></li>
            </ul>
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