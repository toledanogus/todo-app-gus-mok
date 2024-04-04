<?php
require 'conection.php';

$json_data = file_get_contents("php://input");
$x = json_decode($json_data);

/* mysqli_query($conn, "INSERT INTO tareasgus (titulo, descripcion, prioridad, categoria, completada, fechalimite) VALUES ('".$x->title."', '".$x->description."', '".$x->priority."', '".$x->category."', 0, '".$x->limitDate."')"); */

if ($x->filter === 'todas') {
    /* $respuesta = mysqli_query($conn, "SELECT titulo, descripcion, prioridad, completada, fechalimite, categoria, id FROM tareasgus ORDER BY prioridad DESC"); */
    $respuesta = mysqli_query($conn, "(SELECT titulo, descripcion, prioridad, completada, STR_TO_DATE(fechalimite, '%Y-%m-%d') AS fechalimite, categoria, id FROM tareasgus) UNION ALL (SELECT titulo, descripcion, prioridad, completada, STR_TO_DATE(fechalimite, '%Y-%m-%d') AS fechalimite, categoria, id FROM tareasjuntos) ORDER BY completada ASC, fechalimite ASC, prioridad DESC");

}elseif ($x->filter === 'juntos'){
    $respuesta = mysqli_query($conn, "SELECT titulo, descripcion, prioridad, completada, STR_TO_DATE(fechalimite, '%Y-%m-%d') AS fechalimite, categoria, id FROM tareasjuntos WHERE categoria = '".$x->filter."' ORDER BY completada ASC, fechalimite ASC, prioridad DESC");
}else{
    $respuesta = mysqli_query($conn, "SELECT titulo, descripcion, prioridad, completada, STR_TO_DATE(fechalimite, '%Y-%m-%d') AS fechalimite, categoria, id FROM tareasgus WHERE categoria = '".$x->filter."' ORDER BY completada ASC, fechalimite ASC, prioridad DESC");
}


$row = mysqli_fetch_all($respuesta);
//echo $row;
echo json_encode ($row, JSON_NUMERIC_CHECK);
?>