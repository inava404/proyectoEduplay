<?php
    use EDUPLAY\MYAPI\Delete;
    require_once __DIR__.'/vendor/autoload.php';

    session_start();
    $edu = new Delete('eduplay');
    $edu->delete($_POST['id_sesion']);
    echo $edu->getData();
?>