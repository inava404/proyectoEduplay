<?php
    use EDUPLAY\MYAPI\Read;
    require_once __DIR__.'/vendor/autoload.php';

    $data = json_decode(file_get_contents("php://input"));

    $edu = new Read('eduplay');
    $edu->validClave($data);
    echo $edu->getData();
?>