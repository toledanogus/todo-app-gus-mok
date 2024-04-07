@echo off
cd C:\Users\G10xpg\Desktop\DocumentosEscritorio\programacion\todo-app-gus

rem Comprueba si la carpeta "tareasgus" existe
if exist "tareasgus" (
    rem Comprime la carpeta en un archivo ZIP
    powershell Compress-Archive -Path ".\tareasgus" -DestinationPath ".\tareasgus.zip" -Force
    echo Carpeta comprimida correctamente.
) else (
    echo La carpeta "tareasgus" no existe.
)

exit
