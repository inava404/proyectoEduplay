<?php
namespace EDUPLAY\MYAPI;

use EDUPLAY\MYAPI\DataBase;
require_once __DIR__ . '/DataBase.php';

class Create extends DataBase {

    public function __construct($db) {
        parent::__construct($db, 'root', 'Buap123');
    }

    public function add($jsonOBJ, $jsonOBJ2) {
        // SE OBTIENE LA INFORMACIÓN DEL PRODUCTO ENVIADA POR EL CLIENTE
        $this->data = array(
            'status'  => 'error',
            'message' => 'Ya existe un usuario con ese correo'
        );
        if(isset($jsonOBJ->usuario)) {
            // SE ASUME QUE LOS DATOS YA FUERON VALIDADOS ANTES DE ENVIARSE
            $sql = "SELECT * FROM sesiones WHERE usuario = '{$jsonOBJ->email}' AND eliminado = 0";
            $result = $this->conexion->query($sql);
            
            if ($result->num_rows == 0) {
                $this->conexion->set_charset("utf8");
                
                $sqlEstadis = "INSERT INTO estadisticas VALUES (null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)";
                $sqlTutor = "INSERT INTO tutores VALUES (null, '{$jsonOBJ->nombre}', '{$jsonOBJ->apellido}', '{$jsonOBJ->fecha_nac}',0')";
                if($this->conexion->query($sqlTutor)){
                    $tut = $this->conexion->insert_id;
                    if($this->conexion->query($sqlEstadis)){
                        $est = $this->conexion->insert_id;
                        $sqlAlumno = "INSERT INTO alumnos VALUES (null, '{$jsonOBJ2->nombre}', '{$jsonOBJ2->apellido}', '{$jsonOBJ2->fecha_nac}', '{$jsonOBJ2->grado_curso}',$est ,0')";
                        if($this->conexion->query($sqlAlumno)){
                            $alum = $this->conexion->insert_id;
                            $sqlUser = "INSERT INTO sesiones VALUES (null, '{$jsonOBJ->usuario}', '{$jsonOBJ->contrasena}', $tut, '$alum' 0)";
                            if($this->conexion->query($sqlUser)){
                                $this->data['status'] =  "success";
                                $this->data['message'] =  "Usuario agregado";
                            }
                        }
                    }
                } else {
                    $this->data['message'] = "ERROR: No se ejecuto $sql. " . mysqli_error($this->conexion);
                }
            }

            $result->free();
            // Cierra la conexion
            $this->conexion->close();
        }
    }
    
}
?>