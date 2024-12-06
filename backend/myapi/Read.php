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
                $this->data['id'] = $row['ID'];  // Aquí deberías asignar el ID del usuario correctamente
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
            // SE REALIZA LA QUERY DE BÚSQUEDA Y AL MISMO TIEMPO SE VALIDA SI HUBO RESULTADOS
            if ( $result = $this->conexion->query("SELECT actividad, respuesta FROM material WHERE materia = '{$jsonOBJ->materia}' AND tipo_material = '{$jsonOBJ->tipo_material}'") ) {
                // Verificar si se encontró un usuario
                if ($result->num_rows > 0) {
                    // Si se encuentran resultados, almacenar los datos en el array $data
                    $data = [];
                    while ($row = $result->fetch_assoc()) {
                        $this->data[$row['actividad']] = $row['respuesta'];  // Guardamos cada fila de la consulta en el arreglo de datos
                    }
    
                    // Procesar las respuestas proporcionadas por el usuario
                $respuestas_correctas_usuario = 0;
                foreach ($jsonOBJ->respuestas as $pregunta => $respuesta_usuario){
                    if (isset($data[$pregunta]) && trim(strtolower($respuesta_usuario)) == trim(strtolower($data[$pregunta]))) {
                        $respuestas_correctas_usuario++;
                    }                    
                }
    
                // Construir el mensaje basado en el resultado
                $this->data['status'] = 'success';
                $this->data['message'] = "Respuestas correctas: $respuestas_correctas_usuario de " . count($data);
    
                } else {
                    // Si no se encontraron respuestas correctas en la base de datos
                    $this->data['status'] = 'error';
                    $this->data['message'] = 'No se encontraron preguntas para esta materia y tipo de material.';
                }
    
                $result->free();
    
            } else {
                // Manejar errores en la consulta
                $this->data['status'] = 'error';
                $this->data['message'] = 'Error en la consulta: ' . $this->conexion->error;
            }
    
            $this->conexion->close();
        }

    public function listAlumn($id) {
        if (isset($id)){
            // SE REALIZA LA QUERY DE BÚSQUEDA Y AL MISMO TIEMPO SE VALIDA SI HUBO RESULTADOS
            $alumno = $this->conexion->query("SELECT ID_Alumno FROM sesiones WHERE ID = {$id} AND eliminado = 0");
            if($alumno){
                $query = "
                    SELECT
                        a.ID,
                        a.nombre,
                        a.apellido_paterno,
                        a.apellido_materno,
                        a.grado,
                        a.fecha_nacimiento,
                        b.porcen_español,
                        b.porcen_matematicas,
                        b.porcen_ingles
                    FROM
                        alumnos a
                    LEFT JOIN
                        estadisticas b
                    WHERE
                        a.ID = {$alumno} AND a.ID_Estadisticas = b.ID AND a.eliminado = 0

                        ";
            };
            if ($result = $this->conexion->query($query)) {
                $this->data = [];

                while ($row = $result->fetch_assoc()) {
                    $this->data = [
                        'perfil' => [
                            'nombre' => $row['nombre'],
                            'apodo' => $row['apodo'],
                            'grado' => $row['grado'],
                            'fecha_nacimiento' => $row['fecha_nacimiento'],
                        ],
                        'progreso' => [
                            'Español' => $row['porcen_español'],
                            'Matemáticas' => $row['porcen_matematicas'],
                            'Inglés' => $row['porcen_ingles']
                        ]
                    ];
                }
                $result->free();
            } else {
                die('Query Error: '.mysqli_error($this->conexion));
            }
        }
        $this->conexion->close();
    }

    public function listTutor($id) {
        if (isset($id)) {
            // Consultar el ID del tutor a partir del ID de sesión
            $tutor = $this->conexion->query("SELECT ID_Tutor FROM sesiones WHERE ID = {$id} AND eliminado = 0");
            
            if ($tutor && $tutor->num_rows > 0) {
                $tutor_id = $tutor->fetch_assoc()['ID_Tutor'];
                
                // Consulta principal para obtener la información del tutor
                $query = "
                    SELECT 
                        nombre,
                        apellido_paterno,
                        apellido_materno,
                        email,
                        fecha_nacimiento
                    FROM tutores
                    WHERE ID = {$tutor_id} AND eliminado = 0
                ";
    
                if ($result = $this->conexion->query($query)) {
                    $this->data = [];
    
                    // Construir los datos del tutor
                    while ($row = $result->fetch_assoc()) {
                        $this->data = [
                            'perfil' => [
                                'nombre' => $row['nombre'],
                                'apellido_paterno' => $row['apellido_paterno'],
                                'apellido_materno' => $row['apellido_materno'],
                                'email' => $row['email'],
                                'fecha_nacimiento' => $row['fecha_nacimiento']
                            ]
                        ];
                    }
                    $result->free();
                } else {
                    die('Query Error: ' . mysqli_error($this->conexion));
                }
            } else {
                die('No se encontró un tutor asociado a esta sesión.');
            }
        }
        $this->conexion->close();
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

    public function logout(){
        // Verifica si la sesión está activa antes de destruirla
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    
        // Elimina las variables de sesión
        session_unset();
    
        // Destruye la sesión
        session_destroy();
    }

}

?>