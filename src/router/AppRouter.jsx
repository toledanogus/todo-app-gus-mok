import { Navigate, Route, Routes } from "react-router-dom";
import { DetallesTarea } from "../pages/DetallesTarea";
import { EditarTarea } from "../pages/EditarTarea";
import { InicioPage } from "../pages/InicioPage";
import { ListaTareas } from "../pages/ListaTareas";
import { NuevaTareaPage } from "../pages/NuevaTareaPage";
import { Calendario } from "../pages/Calendario";



export const AppRouter = () => {
  return (
    <Routes>
        <Route path="inicio" element={<InicioPage />} />
        <Route path="lista" element={<ListaTareas />} />
        <Route path="nueva" element={<NuevaTareaPage />} />
        <Route path="detalles" element={<DetallesTarea />} />
        <Route path="editar" element={<EditarTarea />} />
        <Route path="calendario" element={<Calendario />} />
        <Route path="/" element={<Navigate to= "inicio" />} />
    </Routes>
  )
}
