<?php
require 'conection.php';

$json_data = file_get_contents("php://input");
$x = json_decode($json_data);

if ($x->category === 'juntos') {
    mysqli_query($conn, "INSERT INTO tareasjuntos (titulo, descripcion, prioridad, categoria, completada, fechaInicio, fechalimite, notificaciongus, notificacionyan) VALUES ('".$x->title."', '".$x->description."', '".$x->priority."', '".$x->category."', 0, '".$x->startDate."','".$x->limitDate."',1, 1)");
    $respuesta = mysqli_query($conn, "SELECT notificacion FROM tareasjuntos WHERE notificacion = 1");
}else{
    mysqli_query($conn, "INSERT INTO tareasgus (titulo, descripcion, prioridad, categoria, completada, fechaInicio, fechalimite) VALUES ('".$x->title."', '".$x->description."', '".$x->priority."', '".$x->category."', 0, '".$x->startDate."', '".$x->limitDate."')");
    $respuesta = mysqli_query($conn, "SELECT notificacion FROM tareasgus WHERE notificacion = 1");
}





$row = mysqli_fetch_all($respuesta);
//echo $row;
echo json_encode ($row, JSON_NUMERIC_CHECK);
?>