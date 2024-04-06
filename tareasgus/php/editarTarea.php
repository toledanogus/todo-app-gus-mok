<?php
require 'conection.php';

$json_data = file_get_contents("php://input");
$x = json_decode($json_data);

if ($x->filter === 'todas' && $x->filter2 === 'juntos' || $x->filter === 'juntos') {
    $respuesta = mysqli_query($conn, "UPDATE tareasjuntos SET titulo = '".$x->title."', descripcion = '".$x->description."', prioridad = '".$x->priority."', fechalimite = '".$x->fecha."', fechaInicio = '".$x->startDate."' WHERE id = '".$x->tareaID."'");

if ($respuesta) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($conn)]);
}
}else{
    $respuesta = mysqli_query($conn, "UPDATE tareasgus SET titulo = '".$x->title."', descripcion = '".$x->description."', prioridad = '".$x->priority."', fechalimite = '".$x->fecha."', fechaInicio = '".$x->startDate."' WHERE id = '".$x->tareaID."'");

if ($respuesta) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($conn)]);
}
    }
?>
