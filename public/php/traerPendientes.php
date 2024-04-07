<?php
require 'conection.php';
   
$respuesta = mysqli_query($conn, "(SELECT id, titulo, categoria FROM tareasgus WHERE completada = 0) UNION ALL (SELECT id, titulo, categoria FROM tareasjuntos WHERE completada = 0) ORDER BY categoria DESC");

if (!$respuesta || mysqli_num_rows($respuesta) == 0) {
    $row = 0;
} else {
    $row = mysqli_fetch_all($respuesta);
}

echo json_encode ($row, JSON_NUMERIC_CHECK);
?>