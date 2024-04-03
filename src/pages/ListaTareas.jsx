import { useEffect } from "react";
import { getTareas } from "../store/slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFiltro, setTareaID } from "../store/slices/tareaSlice";
import etiquetaImage1 from "../assets/etiqueta1.png";
import etiquetaImage2 from "../assets/etiqueta2.png";
import etiquetaImage3 from "../assets/etiqueta3.png";

export const ListaTareas = () => {
  //constantes********************************************************
  const dispatch = useDispatch();
  const { tareas, filtro } = useSelector((state) => state.tarea);
  const navigate = useNavigate();

  //Funciones*********************************************************
  const aDetalles = (id, filtro) => {
    dispatch(setTareaID(id));
    dispatch(setFiltro(filtro));
    navigate("/detalles");
  };

  const aInicio = () => {
    navigate("/inicio");
  };

  //Efectos***********************************************************
  useEffect(() => {
    dispatch(getTareas());
  }, []);

  return (
    <>
      <h1>Lista de Tareas</h1>
      <h2 className="uper">{`${filtro}`}</h2>
      <div className="contenedorx">
        <table>
          <thead>
            {/* <th className="vacio"></th> */}
            <th colSpan="2">Tarea</th>
            <th>Completada</th>
          </thead>

          <tbody>
            {tareas &&
              tareas.map((elemento, index) => {
                let imageSource;

                if (elemento[2] === 1) {
                  imageSource = etiquetaImage1;
                } else if (elemento[2] === 2) {
                  imageSource = etiquetaImage2;
                } else if (elemento[2] === 3) {
                  imageSource = etiquetaImage3;
                } else {
                  // Default image source if none of the conditions match
                  imageSource = etiquetaImage1;
                }

                return (
                  <tr key={index}>
                    <td>
                      <img src={imageSource} alt="" />
                    </td>
                    <td
                      className="tituloTarea"
                      id={`completa${elemento[3]}`}
                      onClick={() => aDetalles(elemento[6],elemento[5])}
                    >
                      {elemento[0]}
                    </td>
                    <td className="centrado">
                      {elemento[3] ? (
                        <span className="arrow">✓</span>
                      ) : (
                        <span className="equis">x</span>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="contenedorx">
          <button className="aInicio" onClick={aInicio}>
            Inicio
          </button>
        </div>
      </div>
    </>
  );
};
