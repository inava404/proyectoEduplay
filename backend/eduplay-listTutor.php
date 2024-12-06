<?php
    use EDUPLAY\MYAPI\Read;
    require_once __DIR__.'/vendor/autoload.php';

    $edu = new Read('eduplay');
    $edu->listTutor($_POST['id_sesion']);
    echo $edu->getData();
?>