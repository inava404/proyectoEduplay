<?php
    use EDUPLAY\MYAPI\Create;
    require_once __DIR__.'/vendor/autoload.php';
    // Leer los datos del cuerpo de la solicitud (POST) en formato JSON
    $data = json_decode(file_get_contents("php://input"));
    
    //ASEGURAR DE RECIBIR LOS DOS JSON
    if (!isset($data->tutor) || !isset($data->nino)) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Faltan datos para el tutor o el niño.'
        ]);
        exit;
    }
    
    $edu = new Create('eduplay');
    $edu->add($data->tutor, $data->nino);
    echo $edu->getData();
?>