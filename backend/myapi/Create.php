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
            if($result = $this->conexion->prepare("SELECT * FROM sesiones WHERE usuario = ? AND eliminado = 0")){
                $result->bind_param('s', $jsonOBJ->usuario);
                $result->execute();
                $result->store_result();
                
                if ($result->num_rows == 0) {
                    $this->conexion->set_charset("utf8");
                    
                    $sqlEstadis = $this->conexion->prepare("INSERT INTO estadisticas VALUES (null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)");
                    $sqlEstadis->bind_param('iiiiiiiiiiiiii', ...array_fill(0, 14, 0));
                    if($sqlEstadis->execute()){
                        $est = $this->conexion->insert_id;

                        $sqlTutor = $this->conexion->prepare("INSERT INTO tutores VALUES (null, ?, ?, ?,0)");
                        $sqlTutor->bind_param('sssi', $jsonOBJ->nombre, $jsonOBJ->apellidos, $jsonOBJ->fecha_nac, 0);
                        if($sqlTutor->execute()){
                            $tut = $this->conexion->insert_id;
                            
                            $sqlAlumno = $this->conexion->prepare("INSERT INTO alumnos VALUES (null, ?, ?,?, ?, ?,? ,0)");
                            $sqlAlumno->bind_param('ssssii', $jsonOBJ2->nombre, $jsonOBJ2->apellidos, 'User', $jsonOBJ2->fecha_nac, $jsonOBJ2->grado_curso, $est);
                            if($sqlAlumno->execute()){
                                $alum = $this->conexion->insert_id;
                                
                                $passwordHashed = password_hash($jsonOBJ->contrasena, PASSWORD_DEFAULT);
                                $sqlUser = $this->conexion->prepare("INSERT INTO sesiones VALUES (null, ?, ?, ?, ?, 12345, 0)");
                                $sqlUser->bind_param('ssii', $jsonOBJ->usuario, $passwordHashed, $alum, $tut);
                                if($this->conexion->query($sqlUser)){
                                    $this->data['status'] =  "success";
                                    $this->data['message'] =  "Usuario agregado";
                                }
                            }
                        }
                    } else {
                        $this->data['message'] = "ERROR: No se pudo preparar la consulta " . mysqli_error($this->conexion);
                    }
                }
            }
            $result->close();
            // Cierra la conexion
            $this->conexion->close();
        }
    }
    
}
?>