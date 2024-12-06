<?php
    use EDUPLAY\MYAPI\Read;
    require_once __DIR__.'/vendor/autoload.php';

    $edu = new Read('eduplay');
    $edu->verifiCorreo($_POST['id']);
    echo $edu->getData();
?>