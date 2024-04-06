/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNuevaTarea } from "../store/slices/tareaSlice";
import { registrarEnBase } from "../store/slices/thunks";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { addHours, format } from "date-fns";
import { useEffect } from "react";

registerLocale( 'es', es );


export const NuevaTareaPage = () => {
  //Constantes**************************************************
  const navigate = useNavigate();
  const [selection, setSelection] = useState("");
  const [selection2, setSelection2] = useState("");
  const [fechaInicio, setFechaInicio] = useState(addHours(new Date(), -6));
  const [selection3, setSelection3] = useState(addHours(new Date(), -6));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const [fechaMostrar1, setFechaMostrar1] = useState(new Date());
  const [fechaMostrar2, setFechaMostrar2] = useState(new Date());
  
  /* const [formValues, setFormValues] = useState({
    start: new Date(),
});
 */
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
    const nuevaFecha = addHours(new Date(event), -6);
    setFechaMostrar1(event);
    setFechaInicio(nuevaFecha);
  };

  const onHandleChange4 = (event) => {
    const nuevaFecha= addHours(new Date(event), -6)
    setFechaMostrar2(event);
    setSelection3(nuevaFecha);
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
      selection3 != "" &&
      fechaInicio != ""
    ) {
      dispatch(
        setNuevaTarea({
          nuevaTarea: [
            title,
            description,
            selection,
            selection2,
            fechaInicio,
            selection3,
          ],
        })
      );
      dispatch(registrarEnBase());
      setTitle("");
      setDescription("");
      setSelection("");
      setSelection2("");
      setSelection3("");
      setFechaInicio("");
      alert("¡Registro exitoso!");
    } else {
      alert("Ningún campo puede estar vacío");
    }
  };

  const handleInputFocus = (event) => {
    // Evitar que el teclado se abra automáticamente al tocar el campo de entrada
    event.preventDefault();
    
    // Abrir manualmente el DatePicker al tocar el campo de entrada
    event.currentTarget.blur(); // Quitar el foco del campo de entrada
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
                <option value="alumnos">Alumnos</option>
                <option value="padres">Padres</option>
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
              <label>Fecha Inicio:</label>
              <DatePicker
                selected={fechaMostrar1}
                onSelect={handleInputFocus} //when day is clicked
                onChange={onHandleChange3}
                /* dateFormat="Pp" */
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeSelect
                locale="es"
                timeCaption="Hora"
                calendarStartDay={0}
                timeFormat="h:mm aa"
                onFocus={handleInputFocus}
                onInputClick={handleInputFocus}
              />
            </li>
            <li className="tarea">
              <label>Fecha límite:</label>
              <DatePicker
                minDate={fechaInicio}
                selected={fechaMostrar2}
                /* onSelect={() => {}}  *///when day is clicked
                onSelect={handleInputFocus}
                onChange={onHandleChange4}
                dateFormat="dd/MM/yyyy h:mm aa"
                /* dateFormat="Pp" */
                showTimeSelect
                locale="es"
                timeCaption="Hora"
                calendarStartDay={0}
                timeFormat="h:mm aa"
                onFocus={handleInputFocus}
                onInputClick={handleInputFocus}
                
              />
            </li>
            {/* <li>
              <label>Prueba</label>
              <input type="datetime-local" name="test" id="test" />
            </li> */}
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
      <p>Nueva tarea: {nuevaTarea}</p> */}
      {/* <p>Fecha: {fechaInicio && JSON.stringify(fechaInicio)}</p>
      <p>Fecha: {selection3 && JSON.stringify(selection3)}</p> */}
    </>
  );
};
