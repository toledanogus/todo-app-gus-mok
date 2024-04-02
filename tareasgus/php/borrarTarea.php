<?php
require 'conection.php';

$json_data = file_get_contents("php://input");
$x = json_decode($json_data);

if ($x->filter === 'juntos') {
   $respuesta = mysqli_query($conn, "DELETE FROM tareasjuntos WHERE id = '".$x->tareaID."'");

if ($respuesta) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($conn)]);
}
}else{
    $respuesta = mysqli_query($conn, "DELETE FROM tareasgus WHERE id = '".$x->tareaID."'");

if ($respuesta) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($conn)]);
}
}
?>