<?php
    use EDUPLAY\MYAPI\Read;
    require_once __DIR__.'/vendor/autoload.php';

    // Iniciar sesión si no está iniciada
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    // Crear la instancia de la clase Read y llamar al método logout
    $edu = new Read('eduplay');
    $edu->logout();  // El método de logout destruirá la sesión;
?>