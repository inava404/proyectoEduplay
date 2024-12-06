<?php
    use EDUPLAY\MYAPI\Read;
    require_once __DIR__.'/vendor/autoload.php';
    
    $data = json_decode(file_get_contents("php://input"));
    
    // Crear la instancia de la clase Read
    $edu = new Read('eduplay');
    
    // Llamar a la función validClave pasando el objeto $data que contiene el JSON decodificado
    $response = $edu->validClave($data->id, $data->clave);
    
    // Retornar la respuesta en formato JSON
    echo $response;
?>