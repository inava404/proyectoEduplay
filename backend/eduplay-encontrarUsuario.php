<?php
    use EDUPLAY\MYAPI\Read;
    require_once __DIR__.'/vendor/autoload.php';

    $edu = new Read('eduplay');
    $edu->encontrarUsuario( json_decode( json_encode($_POST) ) );
    echo $edu->getData();
?>