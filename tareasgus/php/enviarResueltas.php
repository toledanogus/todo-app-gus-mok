<?php
require 'conection.php';

$json_data = file_get_contents("php://input");
$x = json_decode($json_data);

if ($x->filter === 'juntos') {
    if ($x && isset($x->solved) && is_array($x->solved)) {
        foreach ($x->solved as $concepto) {
            // Realiza la consulta SQL para actualizar el campo pagado a 1 para el concepto específico
            $query = "UPDATE tareasjuntos SET completada = 1 WHERE titulo = ?";
    
            // Prepara la sentencia
            $stmt = mysqli_prepare($conn, $query);
    
            // Verifica si la preparación de la consulta fue exitosa
            if ($stmt) {
                // Liga parámetros a la consulta
                mysqli_stmt_bind_param($stmt, "s", $concepto);
    
                // Ejecuta la consulta para cada concepto
                mysqli_stmt_execute($stmt);
    
                // Verifica si la consulta se ejecutó correctamente
                if (mysqli_stmt_errno($stmt) !== 0) {
                    echo "Error al actualizar el concepto: " . $concepto . "\n";
                    echo "Error: " . mysqli_stmt_error($stmt) . "\n";
                }
    
                // Cierra la sentencia
                mysqli_stmt_close($stmt);
            } else {
                echo "Error al preparar la consulta\n";
            }
        }
    
        echo "Actualización exitosa";
    } else {
        echo "Error en la decodificación JSON o datos no válidos\n";
    }
}else{
    if ($x && isset($x->solved) && is_array($x->solved)) {
    foreach ($x->solved as $concepto) {
        // Realiza la consulta SQL para actualizar el campo pagado a 1 para el concepto específico
        $query = "UPDATE tareasgus SET completada = 1 WHERE titulo = ?";

        // Prepara la sentencia
        $stmt = mysqli_prepare($conn, $query);

        // Verifica si la preparación de la consulta fue exitosa
        if ($stmt) {
            // Liga parámetros a la consulta
            mysqli_stmt_bind_param($stmt, "s", $concepto);

            // Ejecuta la consulta para cada concepto
            mysqli_stmt_execute($stmt);

            // Verifica si la consulta se ejecutó correctamente
            if (mysqli_stmt_errno($stmt) !== 0) {
                echo "Error al actualizar el concepto: " . $concepto . "\n";
                echo "Error: " . mysqli_stmt_error($stmt) . "\n";
            }

            // Cierra la sentencia
            mysqli_stmt_close($stmt);
        } else {
            echo "Error al preparar la consulta\n";
        }
    }

    echo "Actualización exitosa";
} else {
    echo "Error en la decodificación JSON o datos no válidos\n";
}
}



?>
