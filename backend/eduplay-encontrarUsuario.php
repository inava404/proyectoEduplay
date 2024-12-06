<?php
    use EDUPLAY\MYAPI\Read;
    require_once __DIR__.'/vendor/autoload.php';

    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    $data = json_decode(file_get_contents("php://input"));

    $edu = new Read('eduplay');
    $edu->encontrarUsuario( $data);
    echo $edu->getData();
?>