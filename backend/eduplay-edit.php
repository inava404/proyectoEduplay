<?php
    use EDUPLAY\MYAPI\Update;
    require_once __DIR__.'/vendor/autoload.php';

    $edu = new Update('eduplay');
    $edu->edit( json_decode( json_encode($_POST) ) );
    echo $edu->getData();
?>