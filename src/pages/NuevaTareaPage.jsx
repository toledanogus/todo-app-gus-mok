import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNuevaTarea } from "../store/slices/tareaSlice";
import { registrarEnBase } from "../store/slices/thunks";

export const NuevaTareaPage = () => {
  //Constantes**************************************************
  const navigate = useNavigate();
  const [selection, setSelection] = useState("");
  const [selection2, setSelection2] = useState("");
  const [selection3, setSelection3] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  //Funciones******************************************************
  const aInicio = () => {
    navigate("/inicio");
  };
  const onHandleChange = (event) => {
    setSelection(event.target.value);
  };
  const onHandleChange2 = (event) => {
    setSelection2(event.target.value);
  };
  const onHandleChange3 = (event) => {
    setSelection3(event.target.value);
  };
  const onHandleChangeTitulo = ({ target }) => {
    setTitle(target.value);
  };
  const onHandleChangeDescription = ({ target }) => {
    setDescription(target.value);
  };
  const registrarNuevaTarea = () => {
    if (
      title != "" &&
      description != "" &&
      selection != "" &&
      selection2 != "" &&
      selection3 != ""
    ) {
      dispatch(
        setNuevaTarea({
          nuevaTarea: [title, description, selection, selection2, selection3],
        })
      );
      dispatch(registrarEnBase());
      setTitle("");
      setDescription("");
      setSelection("");
      setSelection2("");
      setSelection3("");
      alert("¡Registro exitoso!");
    } else {
      alert("Ningún campo puede estar vacío");
    }
  };

  //Efectos********************************************************

  return (
    <>
      <h1>Nueva Tarea</h1>
      <div className="contenedorx">
        <div className="lista-tareas">
          <ul>
            <li className="tarea">
              <label>Título:</label>{" "}
              <input
                type="text"
                value={title}
                onChange={onHandleChangeTitulo}
              />
            </li>
            <li className="tarea">
              <label>Descripción:</label>
              <textarea
                type="text"
                value={description}
                onChange={onHandleChangeDescription}
              />
            </li>
            <li className="tarea">
              <label>Categoría:</label>
              <select value={selection} onChange={onHandleChange}>
                <option value="">Elige una:</option>
                <option value="escuela">Escuela</option>
                <option value="casa">Casa</option>
                <option value="personal">Personal</option>
                <option value="salud">Salud</option>
                <option value="diversion">Diversión</option>
                <option value="juntos">Juntos</option>
              </select>
            </li>
            <li className="tarea">
              <label>Prioridad:</label>

              <select value={selection2} onChange={onHandleChange2}>
                <option value="">Elige una:</option>
                <option value="3">Alta</option>
                <option value="2">Normal</option>
                <option value="1">Baja</option>
              </select>
            </li>
            <li className="tarea">
              <label>Fecha límite:</label>
              <input type="date" value={selection3} onChange={onHandleChange3} />
            </li>
          </ul>
        </div>
        <div className="contenedorx">
          <button className="registrar" onClick={registrarNuevaTarea}>
            Registrar
          </button>
          <button className="aInicio" onClick={aInicio}>
            Ir a Inicio
          </button>
        </div>
      </div>
      {/* <p>Categoría: {selection}</p>
      <p>Prioridad: {selection2}</p>
      
      <p>Título: {title}</p>
      <p>Descripción: {description}</p>
      <p>Nueva tarea: {nuevaTarea}</p> */}<p>Fecha: {selection3}</p>
    </>
  );
};
