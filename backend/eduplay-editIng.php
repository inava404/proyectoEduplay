<?php
    use EDUPLAY\MYAPI\Update;
    require_once __DIR__.'/vendor/autoload.php';

    $data = json_decode(file_get_contents('php://input'), true);
    $id_sesion = $data['id_sesion'] ?? null;

    $edu = new Update('eduplay');
    $edu->updateProgresoIng( $id_sesion);
    echo $edu->getData();
?>