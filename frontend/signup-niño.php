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
      <h1>Registrar niño</h1>
      <form action="#" id="form-nino">
        <input type="text" placeholder="Nombre(s)" id="nombre">
        <input type="text" placeholder="Apellidos" id="apellido">
        <input type="text" placeholder="Fecha de Nacimiento" id="fecha_nac">
        <select class="select-form" name="Grado" id="grado">
          <option value="" disabled selected>Selecciona el grado en curso del niño</option>
          <option value="1">Primer grado</option>
          <option value="2">Segundo grado</option>
          <option value="3">Tercer grado</option>
        </select>
      </form>
      <div class="section-inicio-btns">
        <a id="signup-nino" href="#" type="button"><span>Registrar niño</span></a>
      </div>
      <div class="member">
        ¿Ya tienes cuenta? <a href="login.php">
          ¡Inicia sesión aquí!
        </a>
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