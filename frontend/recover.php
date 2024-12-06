<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eduplay</title>
    <link rel="stylesheet" href="https://bootswatch.com/4/lux/bootstrap.min.css">
    <link rel="stylesheet" href="src/estilo.css">
</head>
<body>
    <nav class="navbar">
      <img src="src/img/EduplayLogo.png" alt="Eduplay Logo" width="375px">
    </nav>

    <div class="wrapper"> 
      <h1>Recuperar contraseña</h1>

      <form action="recover.php" method="POST">
        <input type="email" name="email" id="email" placeholder="Email asociado a cuenta" required>
      </form>
      <div class="section-inicio-btns">
        <button type="submit" id="login"><span>Enviar contraseña temporal</span></button>
      </div>
      <div class="member">
        <a href="inicio.php">Volver al inicio de sesión</a>
      </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="https://unpkg.com/just-validate@latest/dist/just-validate.production.min.js"></script>
    <script src="../backend/app.js"></script>
  </body>
  </html>