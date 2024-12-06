<?php
    use EDUPLAY\MYAPI\Read;
    require_once __DIR__.'/vendor/autoload.php';

    $data = json_decode(file_get_contents('php://input'), true);
    $id_sesion = $data['id_sesion'] ?? null;

    $edu = new Read('eduplay');
    $edu->listTutor($id_sesion);
    echo $edu->getData();
?>