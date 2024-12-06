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
            <h1>Perfil  <img src="src/img/perfil.png" alt="Perfil" width= "34px" height= "34px;"></h1>
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


    <div class="section-principal"> 
        <section class="perfil">
            <div class="perfil-container">
                <div class="perfil-avatar">
                    <img src="src/img/perfil.png" alt="Avatar" class="perfil-avatar-icon">
                </div>
                <div class="perfil-detalles">
                    <h3>Kevin Ethan Levin</h3>
                    <h3>Apodo: Kevin Levin</h3>
                    <h3>Grado: Segundo</h3>
                    <h3>Edad: 4 años</h3>
                </div>
            </div>
            <div class="section-progreso">
                <h3>Progreso en cursos</h3>
                <div class="perfil-progreso">
                    <div class="progreso-cursos">
                        <div class="curso">
                            <span>Español<img src="src/img/español.png" alt="Español" class="curso-img"></span>
                            <div class="barra-progreso">
                            <div class="progreso" style="width: 0%;"></div>
                            </div>
                        </div>
                        <div class="curso">
                            <span>Matemáticas <img src="src/img/matematicas.png" alt="Matemáticas" class="curso-img"></span>
                            <div class="barra-progreso">
                            <div class="progreso" style="width: 0%;"></div>
                            </div>
                        </div>
                        <div class="curso">
                            <span>Inglés <img src="src/img/ingles.png" alt="Inglés" class="curso-img"></span>
                            <div class="barra-progreso">
                            <div class="progreso" style="width: 0%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="../backend/app.js"></script>
</body>
</html>