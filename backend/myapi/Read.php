<?php
namespace EDUPLAY\MYAPI;

use EDUPLAY\MYAPI\DataBase;
require_once __DIR__ . '/DataBase.php';
class Read extends DataBase {

    public function __construct($db) {
        parent::__construct($db, 'root', 'Buap123');
    }


    public function encontrarUsuario($jsonOBJ) {
        // Realiza la consulta para obtener los resultados
    if ($result = $this->conexion->query("SELECT * FROM sesiones WHERE usuario = '{$jsonOBJ->email}'")) {
        // Verificar si se encontró algún usuario
        if ($result->num_rows > 0) {
            // Obtener la primera fila del resultado
            $row = $result->fetch_assoc();  // Guardamos la primera fila de la consulta en $row
            
            // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
            if (password_verify($jsonOBJ->password, $row['contrasena'])) {
                // Si la contraseña es correcta, devuelve la información del usuario
                $this->data['status'] = 'success';
                $this->data['message'] = 'Usuario encontrado';
                $this->data['id'] = $row['ID'];
            } else {
                // Si la contraseña no es válida
                $this->data['status'] = 'error';
                $this->data['message'] = 'Usuario o contraseña incorrectos.';
            }
        } else {
            // Si no se encuentra el usuario
            $this->data['status'] = 'error';
            $this->data['message'] = 'Usuario o contraseña incorrectos.';
        }

        // Liberar el resultado
        $result->free();
    } else {
        // Si ocurre un error al ejecutar la consulta
        die('Query Error: ' . mysqli_error($this->conexion));
    }

    // Cerrar la conexión
    $this->conexion->close();
}


    public function verifResp($jsonOBJ) {
        // Validar que existan las propiedades requeridas en el JSON
        if (!isset($jsonOBJ->materia, $jsonOBJ->tipo_material, $jsonOBJ->respuestas)) {
            $this->data['status'] = 'error';
            $this->data['message'] = 'Datos incompletos. Verifique materia, tipo_material y respuestas.';
            return;
        }

        // Validar respuestas enviadas (opcional, por seguridad)
        foreach ($jsonOBJ->respuestas as $pregunta => $respuesta) {
            if (!in_array(strtoupper($respuesta), ['A', 'B', 'C', 'D'])) {
                $this->data['status'] = 'error';
                $this->data['message'] = "Respuesta inválida en $pregunta. Solo se permiten A, B, C o D.";
                return;
            }
        }

        // Obtener las respuestas correctas de la base de datos
        $query = "
            SELECT actividad, respuesta 
            FROM material 
            WHERE materia = '{$jsonOBJ->materia}' 
            AND tipo_material = '{$jsonOBJ->tipo_material}'
        ";

        if ($result = $this->conexion->query($query)) {
            if ($result->num_rows > 0) {
                // Procesar las respuestas correctas de la base de datos
                $respuestas_correctas = [];
                while ($row = $result->fetch_assoc()) {
                    $respuestas_correctas[$row['actividad']] = strtolower(trim($row['respuesta']));
                }

                $result->free();

                // Validar respuestas del usuario
                $respuestas_correctas_usuario = 0;
                foreach ($jsonOBJ->respuestas as $pregunta => $respuesta_usuario) {
                    if (
                        isset($respuestas_correctas[$pregunta]) &&
                        strtolower(trim($respuesta_usuario)) === $respuestas_correctas[$pregunta]
                    ) {
                        $respuestas_correctas_usuario++;
                    }
                }

                // Devolver resultado
                $this->data['status'] = 'success';
                $this->data['message'] = "Respuestas correctas: $respuestas_correctas_usuario de " . count($respuestas_correctas);
            } else {
                $this->data['status'] = 'error';
                $this->data['message'] = 'No se encontraron preguntas para esta materia y tipo de material.';
            }
        } else {
            $this->data['status'] = 'error';
            $this->data['message'] = 'Error en la consulta: ' . $this->conexion->error;
        }
    }


        public function listAlumn($id) {
            if (isset($id) && is_numeric($id)) {  // Verifica que el ID sea un número
                // Consulta para obtener el ID del alumno
                $alumno = $this->conexion->query("SELECT ID_Alumno FROM sesiones WHERE ID = {$id} AND eliminado = 0");
        
                if ($alumno && $alumno->num_rows > 0) {
                    $row = $alumno->fetch_assoc();
                    $alumnoId = $row['ID_Alumno'];  // Obtenemos el ID del alumno de la sesión
        
                    // Consulta para obtener los datos del alumno y su progreso
                    $query = "
                        SELECT
                            a.ID,
                            a.nombres,
                            a.apellidos,
                            a.apodo,
                            a.grado_curso,
                            a.fecha_nacimiento,
                            b.porcen_español,
                            b.porcen_matematicas,
                            b.porcen_ingles
                        FROM
                            alumnos a
                        LEFT JOIN
                            estadisticas b
                        ON
                            a.ID_Estadisticas = b.ID
                        WHERE
                            a.ID = {$alumnoId} AND a.eliminado = 0
                    ";
        
                    if ($result = $this->conexion->query($query)) {
                        $this->data = [];
                        
                        while ($row = $result->fetch_assoc()) {
                            $this->data = [
                                'perfil' => [
                                    'nombre' => $row['nombres'],
                                    'nombre_com' => $row['nombres'].' '.$row['apellidos'],
                                    'apellidos' => $row['apellidos'],
                                    'apodo' => $row['apodo'],  // Asegúrate de que este campo exista en tu base de datos
                                    'grado' => $row['grado_curso'],
                                    'fecha_nacimiento' => $row['fecha_nacimiento'],
                                ],
                                'progreso' => [
                                    'Espanol' => $row['porcen_español'],
                                    'Matematicas' => $row['porcen_matematicas'],
                                    'Ingles' => $row['porcen_ingles']
                                ]
                            ];
                        }
                        $result->free();
                    } else {
                        die('Query Error: ' . $this->conexion->error);  // Manejo de error de consulta
                    }
                } else {
                    die('Error: No se encontró el alumno en la sesión');
                }
            } else {
                die('Error: ID inválido');
            }
        }
                

        public function listTutor($id) {
            // Verifica que el ID sea válido
            if (isset($id) && is_numeric($id)) {
                // Consulta para obtener el ID del tutor a partir de la sesión
                $tutorQuery = $this->conexion->query("SELECT ID_Tutor FROM sesiones WHERE ID = {$id} AND eliminado = 0");
                
                if ($tutorQuery && $tutorQuery->num_rows > 0) {
                    $row = $tutorQuery->fetch_assoc();
                    $tutorId = $row['ID_Tutor']; // Obtener el ID del tutor asociado a la sesión
        
                    // Consulta para obtener los datos del tutor
                    $query = "
                        SELECT
                            a.ID,
                            a.nombres,
                            a.apellidos,
                            b.usuario,
                            a.fecha_nacimiento
                        FROM
                            tutores a
                        LEFT JOIN
                            sesiones b
                        ON
                            b.ID_Tutor = a.ID
                        WHERE
                            a.ID = {$tutorId} AND a.eliminado = 0
                    ";
        
                    if ($result = $this->conexion->query($query)) {
                        $this->data = []; // Inicializa el array para almacenar los datos del tutor
        
                        while ($row = $result->fetch_assoc()) {
                            $this->data = [
                                'perfil' => [
                                    'nombres' => $row['nombres'],
                                    'apellidos'=>$row['apellidos'],
                                    'email' => $row['usuario'],
                                    'fecha_nacimiento' => $row['fecha_nacimiento'],
                                ]
                            ];
                        }
                        $result->free();
                    } else {
                        die('Query Error: ' . $this->conexion->error); // Manejo de error en la consulta
                    }
                } else {
                    die('Error: No se encontró el tutor asociado a esta sesión.');
                }
            } else {
                die('Error: ID inválido.');
            }
            
            // Cierra la conexión antes de finalizar
            $this->conexion->close();
            
            // Retorna los datos como JSON
            return json_encode($this->data);
        }
        
    

    public function listRetos($id) {
        // SE VERIFICA HABER RECIBIDO EL ID
        if( isset($search) ) {
            // SE REALIZA LA QUERY DE BÚSQUEDA Y AL MISMO TIEMPO SE VALIDA SI HUBO RESULTADOS
            $alumno = $this->conexion->query("SELECT ID_Alumno FROM sesiones WHERE ID = {$id}");
            if ( $result = $this->conexion->query("SELECT * FROM alumnos WHERE id = $alumno AND eliminado = 0") ) {
                // SE OBTIENEN LOS RESULTADOS
                $rows = $result->fetch_all(MYSQLI_ASSOC);

                if(!is_null($rows)) {
                    // SE CODIFICAN A UTF-8 LOS DATOS Y SE MAPEAN AL ARREGLO DE RESPUESTA
                    foreach($rows as $num => $row) {
                        foreach($row as $key => $value) {
                            $this->data[$num][$key] = $value;
                        }
                    }
                }
                $result->free();
            } else {
                die('Query Error: '.mysqli_error($this->conexion));
            }
            $this->conexion->close();
        }
    }

    public function verifiCorreo() {
        if(isset($_POST['email'])) {
            $correo = $_POST['name'];
            $json = array();
    
            // SE REALIZA LA QUERY DE BÚSQUEDA Y AL MISMO TIEMPO SE VALIDA SI HUBO RESULTADOS
            $sql = "SELECT * FROM productos WHERE usuario = '{$correo}' and eliminado = 0";
            if ( $result = $this->conexion->query($sql) ) {
                // SE OBTIENEN LOS RESULTADOS
                $rows = $result->fetch_all(MYSQLI_ASSOC);
    
                if(!is_null($rows)) {
                    // SE CODIFICAN A UTF-8 LOS DATOS Y SE MAPEAN AL ARREGLO DE RESPUESTA
                    foreach($rows as $num => $row) {
                        foreach($row as $key => $value) {
                            $data[$num][$key] = utf8_encode($value);
                        }
                    }
                }
                $result->free();
            } else {
                die('Query Error: '.mysqli_error($this->conexion));
            }
            $this->conexion->close();
        }
    }

    public function validClave($id, $clave) {
        
        // Inicializar el array de respuesta con un estado de error
        $this->data = array(
            'status' => 'error',
            'message' => 'Clave incorrecta'
        );
    
        // Verificar que el ID esté presente en el objeto JSON
        if (isset($id) && is_numeric($id)) {
            // Realizar la consulta para obtener los datos de la sesión
            $query = "SELECT * FROM sesiones WHERE ID = '{$id}'";
            
            // Ejecutar la consulta
            if ($result = $this->conexion->query($query)) {
                // Verificar si se encontraron resultados
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();  // Obtener la primera fila de resultados
    
                    // Obtener la clave almacenada en la base de datos
                    $claveGuardada = $row['clave'];
    
                    // Verificar si la clave proporcionada coincide con la almacenada
                    if ($clave == $claveGuardada) {
                        // Si las claves coinciden, retornar éxito
                        $this->data['status'] = 'success';
                        $this->data['message'] = 'Clave correcta';
                    } else {
                        // Si las claves no coinciden, retornar mensaje de error
                        $this->data['message'] = 'Clave incorrecta';
                    }
    
                } else {
                    // Si no se encuentra el ID en la base de datos
                    $this->data['message'] = 'ID no encontrado o eliminado.';
                }
    
                // Liberar el resultado de la consulta
                $result->free();
            } else {
                // Si hubo un error en la consulta
                $this->data['message'] = 'Error en la consulta: ' . $this->conexion->error;
            }
        } else {
            // Si no se recibió un ID válido en el objeto JSON
            $this->data['message'] = 'ID no proporcionado';
        }
    
        // Cerrar la conexión a la base de datos
        $this->conexion->close();
    
        // Retornar el resultado como JSON
        return json_encode($this->data);
    }
    
    
    
}

?>