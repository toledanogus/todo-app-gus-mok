import { useEffect } from "react";
import { getTareas } from "../store/slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFiltro2, setTareaID, setTareasActive } from "../store/slices/tareaSlice";
import etiquetaImage1 from "../assets/etiqueta1.png";
import etiquetaImage2 from "../assets/etiqueta2.png";
import etiquetaImage3 from "../assets/etiqueta3.png";
import { es } from "date-fns/locale";
import { format, startOfDay, isWithinInterval } from "date-fns";

export const ListaTareas = () => {
  // Constantes
  const dispatch = useDispatch();
  const { tareas, filtro, tareasActive } = useSelector((state) => state.tarea);
  const navigate = useNavigate();

  // Funciones
  const aDetalles = (id, filtro) => {
    dispatch(setTareaID(id));
    dispatch(setFiltro2(filtro));
    navigate("/detalles");
  };

  const aInicio = () => {
    navigate("/inicio");
  };

  const aCalendario = () => {
    navigate("/calendario");
  };

  const formatearFecha = (fechaOriginal) => {
    return format(new Date(fechaOriginal), "dd-MMM", { locale: es });
  };

  const isActive = (categorias) => {
    if (tareas) {
      const nuevasTareas = tareas.map(tarea => {
        if (tarea[6] === categorias && tarea[3] === 0 ) {
          const isActive1 = isWithinInterval(startOfDay(new Date()), {
            start: startOfDay(new Date(tarea[4])),
            end: startOfDay(new Date(tarea[5]))
          });
          if (isActive1) {
            return [...tarea, "nuevoValor"];
          }else{
            return [...tarea, "nada"];
          }
        } else if(tarea[6] != categorias && tarea[3] === 0){
          const isActive1 = isWithinInterval(startOfDay(new Date()), {
            start: startOfDay(new Date(tarea[4])),
            end: startOfDay(new Date(tarea[5]))
          });
          if (isActive1) {
            return [...tarea, "nuevoValor"];
          }else{
            return [...tarea, "nada"];
          }
        }
        return tarea;
      });
      dispatch(setTareasActive({ tareasActive: nuevasTareas }));
    }
  }

  // Efectos
  useEffect(() => {
    dispatch(getTareas());
  }, []);

  useEffect(() => {
    if(tareas){
      isActive(filtro);
    }
  }, [tareas]); // Se ejecuta cuando las tareas cambian

  // Renderizado
  return (
    <>
      
      <h1 className="uper">{filtro}</h1>
      <div className="contenedorx">
        <table>
          <thead>
            <th colSpan="1">Tarea</th>
            <th>Inicio</th>
            <th>Fin</th>
          </thead>
          <tbody>
            {tareasActive && tareasActive.map((elemento, index) => {
              let imageSource = 'circulo-baja';
              if (elemento[2] === 2) {
                imageSource = 'circulo-media';
              } else if (elemento[2] === 3) {
                imageSource = 'circulo-alta';
              }
              return (
                <tr key={index}>
                  <td
                    className={elemento[8] && elemento[8]==='nuevoValor' 
                    ? 'activo' 
                    : 
                    'tituloTarea'}
                    id={`completa${elemento[3]}`}
                    onClick={() => aDetalles(elemento[7], elemento[6])}
                  ><span className={imageSource}></span>
                    {` ${elemento[0]}`}
                  </td>
                  <td className="centrado">{formatearFecha(elemento[4])}</td>
                  <td className="centrado">{formatearFecha(elemento[5])}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="contenedorx">
          <button className="calendarioLink" onClick={aCalendario}>Calendario</button>
        </div>
        <button className="aInicio" onClick={aInicio}>Inicio</button>
      </div>
    </>
  );
};
