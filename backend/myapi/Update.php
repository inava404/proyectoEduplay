<?php
namespace EDUPLAY\MYAPI;

use EDUPLAY\MYAPI\DataBase;
require_once __DIR__ . '/DataBase.php';

class Update extends DataBase {

    public function __construct($db) {
        parent::__construct($db, 'root', 'Buap123');
    }

    public function updateProgresoMate($id) {
        $this->data = array(
            'status'  => 'error',
            'message' => 'La consulta falló'
        );

        if (isset($id)) {
            // Obtenemos el progreso actual
            $sesion = $this->conexion->query("SELECT ID_Alumno FROM sesion WHERE ID = '{$id}'");
            $row = $sesion->fetch_assoc();
            $ID_Alum = $row['ID_Alumno'];
            $est = $this->conexion->query("SELECT ID_Estadisticas FROM alumnos WHERE id = '{$ID_Alum}'");
            $row = $est->fetch_assoc();
            $ID_Estadisticas = $row['ID_Estadisticas'];
            $sql_get = "SELECT porcen_matematicas FROM estadisticas WHERE id = '{$ID_Estadisticas}'";
            $result = $this->conexion->query($sql_get);

            if ($result && $row = $result->fetch_assoc()) {
                $newProgress = min($row['porcen_matematicas'] + 33, 100); // Incremento del 33%, límite en 100%
                $sql_update = "UPDATE estadisticas SET porcen_matematicas = $newProgress WHERE id = '{$ID_Estadisticas}'";

                if ($this->conexion->query($sql_update)) {
                    $this->data['status'] = 'success';
                    $this->data['message'] = 'Progreso actualizado al ' . $newProgress . '%';
                } else {
                    $this->data['message'] = "ERROR: No se ejecutó $sql_update. " . $this->conexion->error;
                }
            } else {
                $this->data['message'] = "No se encontró el registro con ID {$id}";
            }
        } else {
            $this->data['message'] = 'ID no proporcionado';
        }

        $this->conexion->close();
    }

    public function updateProgresoEsp($id) {
        $this->data = array(
            'status'  => 'error',
            'message' => 'La consulta falló'
        );

        if (isset($id)) {
            // Obtenemos el progreso actual
            $sesion = $this->conexion->query("SELECT ID_Alumno FROM sesion WHERE ID = '{$id}'");
            $row = $sesion->fetch_assoc();
            $ID_Alum = $row['ID_Alumno'];
            $est = $this->conexion->query("SELECT ID_Estadisticas FROM alumnos WHERE id = '{$ID_Alum}'");
            $row = $est->fetch_assoc();
            $ID_Estadisticas = $row['ID_Estadisticas'];
            $sql_get = "SELECT porcen_español FROM estadisticas WHERE id = '{$ID_Estadisticas}'";
            $result = $this->conexion->query($sql_get);

            if ($result && $row = $result->fetch_assoc()) {
                $newProgress = min($row['porcen_español'] + 33, 100); // Incremento del 33%, límite en 100%
                $sql_update = "UPDATE estadisticas SET porcen_español = $newProgress WHERE id = '{$ID_Estadisticas}'";

                if ($this->conexion->query($sql_update)) {
                    $this->data['status'] = 'success';
                    $this->data['message'] = 'Progreso actualizado al ' . $newProgress . '%';
                } else {
                    $this->data['message'] = "ERROR: No se ejecutó $sql_update. " . $this->conexion->error;
                }
            } else {
                $this->data['message'] = "No se encontró el registro con ID {$id}";
            }
        } else {
            $this->data['message'] = 'ID no proporcionado';
        }

        $this->conexion->close();
    }

    public function updateProgresoIng($id) {
        $this->data = array(
            'status'  => 'error',
            'message' => 'La consulta falló'
        );

        if (isset($id)) {
            // Obtenemos el progreso actual
            $sesion = $this->conexion->query("SELECT ID_Alumno FROM sesion WHERE ID = '{$id}'");
            $row = $sesion->fetch_assoc();
            $ID_Alum = $row['ID_Alumno'];
            $est = $this->conexion->query("SELECT ID_Estadisticas FROM alumnos WHERE id = '{$ID_Alum}'");
            $row = $est->fetch_assoc();
            $ID_Estadisticas = $row['ID_Estadisticas'];
            $sql_get = "SELECT porcen_ingles FROM estadisticas WHERE id = '{$ID_Estadisticas}'";
            $result = $this->conexion->query($sql_get);

            if ($result && $row = $result->fetch_assoc()) {
                $newProgress = min($row['porcen_ingles'] + 33, 100); // Incremento del 33%, límite en 100%
                $sql_update = "UPDATE estadisticas SET porcen_ingles = $newProgress WHERE id = '{$ID_Estadisticas}'";

                if ($this->conexion->query($sql_update)) {
                    $this->data['status'] = 'success';
                    $this->data['message'] = 'Progreso actualizado al ' . $newProgress . '%';
                } else {
                    $this->data['message'] = "ERROR: No se ejecutó $sql_update. " . $this->conexion->error;
                }
            } else {
                $this->data['message'] = "No se encontró el registro con ID {$id}";
            }
        } else {
            $this->data['message'] = 'ID no proporcionado';
        }

        $this->conexion->close();
    }
}

?>