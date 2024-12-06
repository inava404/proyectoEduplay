<?php
use EDUPLAY\MYAPI\Read;
require_once __DIR__.'/vendor/autoload.php';



// Obtener el id_sesion del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);
$id_sesion = $data['id_sesion'] ?? null;

// Crear instancia del backend (suponiendo que Read es tu clase que gestiona las consultas)
$edu = new Read('eduplay');
$edu->listAlumn($id_sesion);
echo $edu->getData();

?>
