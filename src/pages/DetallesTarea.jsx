import { useDispatch, useSelector } from "react-redux";
import { getTarea } from "../store/slices/thunks";
import { useEffect, useState } from "react";
import { deleteTarea, sendSolved } from "../store/slices/thunks";
import { setSolved, setTareaID } from "../store/slices/tareaSlice";
import { useNavigate } from "react-router-dom";
import label1 from "../assets/etiqueta1.png";
import label2 from "../assets/etiqueta2.png";
import label3 from "../assets/etiqueta3.png";
import { es } from 'date-fns/locale';
import { format } from "date-fns";
/* import {utcToZonedTime} from 'date-fns-tz'; */


export const DetallesTarea = () => {
  //Constantes**********************************************************
  const { tarea } = useSelector((state) => state.tarea);
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [rayos, setRayos] = useState(0);
  const navigate = useNavigate();
  //Funciones***********************************************************

  const enviarResueltas = async () => {
    await dispatch(setSolved({ solved: Array.from(checkedItems) }));
    await dispatch(sendSolved());
    alert("Se marcó como completada.");
    /* setDatosCargados(false); */
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setCheckedItems(
        (prevCheckedItems) => new Set(prevCheckedItems.add(name))
      );
    } else {
      const newCheckedItems = new Set(checkedItems);
      newCheckedItems.delete(name);
      setCheckedItems(newCheckedItems);
    }
  };

  const borrar = (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres borrar esta tarea?"
    );
    if (confirmacion) {
      // Aquí puedes poner la lógica para borrar la tarea
      dispatch(setTareaID(id));
      dispatch(deleteTarea());
      setRayos(rayos + 1);
      alert("Se borró exitosamente.");
      navigate("/lista");
    }
  };

  const editar = (id) => {
    dispatch(setTareaID(id));
    navigate("/editar");
  };
  const aInicio = () => {
    navigate("/inicio");
  };

  const formatearFecha = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);
    const fechaFormateada = format(fecha, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
    const horaFormateada = format(fecha, "h:mm a", { locale: es });
  
    return [<div key="fecha">{fechaFormateada}</div>, <div key="hora">{horaFormateada}</div>];
}
  

  //Efectos*************************************************************
  useEffect(() => {
    dispatch(getTarea());
  }, []);

  return (
    <>
      <h1>Detalles de la Tarea</h1>
      {tarea &&
        tarea.map((elemento, index) => {
          let imagenSrc, prioridad;
          switch (elemento[2]) {
            case 1:
              imagenSrc = label1;
              prioridad = "Baja";
              break;
            case 2:
              imagenSrc = label2;
              prioridad = "Normal";
              break;
            case 3:
              imagenSrc = label3;
              prioridad = "Alta";
              break;
            default:
              break;
          }

          return (
            <div className="contenedorx" key={index}>
              <fieldset>
                <legend>Tarea</legend>
                <img src={imagenSrc} alt="" />
                <span className={elemento[3] === 1 ? "completa1" : null}>
                  {elemento[0]}
                </span>
              </fieldset>
              <fieldset>
                <legend>Prioridad</legend>
                {prioridad}
              </fieldset>
              <fieldset>
                <legend>Descripción</legend>
                {elemento[1]}
              </fieldset>
              <fieldset>
                <legend>Completada</legend>
                {elemento[3] === 0 ? (
                  <div>
                    <input
                      name={elemento[0]}
                      type="checkbox"
                      onChange={handleCheckboxChange}
                      checked={checkedItems.has(elemento[0])}
                    />
                    <span> No completada.</span>
                  </div>
                ) : (
                  <span className="completada">Tarea completada.</span>
                )}
              </fieldset>
              <fieldset>
                <legend>Fecha De Inicio</legend>
                {formatearFecha(elemento[7])}
                {/* {new Date(elemento[7]).toLocaleString("es-ES", {
                  timeZone: "UTC",
                })} */}
              </fieldset>
              <fieldset>
                <legend>Fecha Límite</legend>
                {formatearFecha(elemento[4])}
                {/* {new Date(elemento[4]).toLocaleString("es-ES", {
                  timeZone: "-06:00",
                })} */}
              </fieldset>
              <fieldset className="uper">
                <legend>Categoría</legend>
                {elemento[5]}
              </fieldset>

              <div className="botonesPar">
                <button
                  className="iz2"
                  onClick={() => {
                    enviarResueltas().then(() => dispatch(getTarea()));
                  }}
                >
                  Registrar tareas completadas
                </button>
                <button onClick={aInicio} className="der2">
                  Inicio
                </button>
              </div>
              <div className="botonesPar">
                <button className="iz1" onClick={() => editar(elemento[6])}>
                  Editar
                </button>
                <button className="der1" onClick={() => borrar(elemento[6])}>
                  Borrar
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};
