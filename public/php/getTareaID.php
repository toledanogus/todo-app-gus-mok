<?php
require 'conection.php';

$json_data = file_get_contents("php://input");
$x = json_decode($json_data);

/* mysqli_query($conn, "INSERT INTO tareasgus (titulo, descripcion, prioridad, categoria, completada, fechalimite) VALUES ('".$x->title."', '".$x->description."', '".$x->priority."', '".$x->category."', 0, '".$x->limitDate."')"); */

if ($x->filter === 'juntos') {
    $respuesta = mysqli_query($conn, "SELECT titulo, descripcion, prioridad, completada, fechalimite, categoria, id, fechaInicio FROM tareasjuntos WHERE id = '".$x->tareaID."'");
    mysqli_query($conn, "UPDATE tareasjuntos SET notificaciongus = 0 WHERE id = '".$x->tareaID."'");
}elseif($x->filter === 'todas' && $x->filter2 === 'juntos'){
    $respuesta = mysqli_query($conn, "SELECT titulo, descripcion, prioridad, completada, fechalimite, categoria, id, fechaInicio FROM tareasjuntos WHERE id = '".$x->tareaID."'");
    mysqli_query($conn, "UPDATE tareasjuntos SET notificaciongus = 0 WHERE id = '".$x->tareaID."'");
}else{
    $respuesta = mysqli_query($conn, "SELECT titulo, descripcion, prioridad, completada, fechalimite, categoria, id, fechaInicio FROM tareasgus WHERE id = '".$x->tareaID."'");
}

$row = mysqli_fetch_all($respuesta);
//echo $row;
echo json_encode ($row, JSON_NUMERIC_CHECK);
?>