/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { editTarea, getTarea } from "../store/slices/thunks";
import { useEffect, useRef, useState } from "react";
import { setTareaEditada } from "../store/slices/tareaSlice";
import { useNavigate } from "react-router-dom";
import { format, addHours } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

registerLocale( 'es', es );

export const EditarTarea = () => {
  //Constantes***************************************************************
  const { tarea } = useSelector((state) => state.tarea);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [fecha, setFecha] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const [firstTouch, setFirstTouch] = useState(true);
  const [secondTouch, setSecondTouch] = useState(true);
  const [fechaMostrar1, setFechaMostrar1] = useState('');
  const [fechaMostrar2, setFechaMostrar2] = useState('');

  //Funciones***************************************************************
  const onHandleChangePriority = (event) => {
    setPriority(event.target.value);
  };
  
  const onHandleChangeFechaInicio = (event) => {
    const nuevaFecha = addHours(new Date(event), -6);
    setFechaMostrar1(event);
    setFechaInicio(nuevaFecha);
  };
  const onHandleChangeFecha = (event) => {
    const nuevaFecha= addHours(new Date(event), -6)
    setFechaMostrar2(event);
    setFecha(nuevaFecha);
  };

  const onHandleChangeTitulo = ({ target }) => {
    setTitle(target.value);
  };
  const onHandleChangeDescription = ({ target }) => {
    setDescription(target.value);
  };

  const enviarEditada = () => {
    if (title && description && priority && fecha && fechaInicio) {
      dispatch(
        setTareaEditada({ tareaEditada: [title, description, priority, fecha, fechaInicio] })
      );
      dispatch(editTarea());
      alert("Se modificó exitosamente.");
      navigate("/detalles");
    } else {
      alert("Ningún campo puede estar vacío");
    }
  };

  const aInicio = () => {
    navigate("/inicio");
  };

  const handleInputFocus = (event) => {
    // Evitar que el teclado se abra automáticamente al tocar el campo de entrada
    event.preventDefault();
    
    // Abrir manualmente el DatePicker al tocar el campo de entrada
    event.currentTarget.blur(); // Quitar el foco del campo de entrada
  };

  //Efectos***************************************************************
  useEffect(() => {
    dispatch(getTarea());
    /* setRayos(rayos+1); */
  }, []);
  /* useEffect(() => {
    sliceTostate();
  }, [rayos]); */

  useEffect(() => {
    if (tarea && tarea.length > 0) {
      setTitle(tarea[0][0]);
      setDescription(tarea[0][1]);
      setPriority(tarea[0][2]);
      setFechaInicio(addHours(new Date(tarea[0][7]), -6));
      setFechaMostrar1(new Date(tarea[0][7]));
      setFecha(addHours(new Date(tarea[0][4]), -6));
      setFechaMostrar2(new Date(tarea[0][4]));
    }
  }, [tarea]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [description]);
  

  return (
    <>
      <h1>Editar Tarea</h1>
      <div className="contenedorcomplejo">
        {tarea &&
          tarea.map((elemento, index) => (
            <fieldset key={index}>
              <legend>Tarea</legend>
              <input
                type="text"
                value={title !== null ? title : elemento[0] || ""}
                onChange={onHandleChangeTitulo}
                onTouchStart={(event) => {
                  if (firstTouch) {
                    event.target.select();
                    setFirstTouch(false);
                    setSecondTouch(true);
                  } else {
                    // Obtenemos la posición del toque
                    const touchPosition = event.target.selectionStart;
                    // Establecemos el foco en el input
                    event.target.focus();
                    // Establecemos la posición del cursor
                    event.target.setSelectionRange(
                      touchPosition,
                      touchPosition
                    );
                  }
                }}
              />
            </fieldset>
          ))}
        {tarea &&
          tarea.map((elemento, index) => (
            <fieldset key={index}>
              <legend>Descripción</legend>
              <textarea
                className="textareacompleja"
                ref={textareaRef}
                value={description != null ? description : elemento[1] || ""}
                onChange={onHandleChangeDescription}
                onTouchStart={(event) => {
                  if (secondTouch) {
                    event.target.select();
                    setSecondTouch(false);
                    setFirstTouch(true);
                  } else {
                    // Obtenemos la posición del toque
                    const touchPosition = event.target.selectionStart;
                    // Establecemos el foco en el input
                    event.target.focus();
                    // Establecemos la posición del cursor
                    event.target.setSelectionRange(
                      touchPosition,
                      touchPosition
                    );
                  }
                }}
                style={{ overflow: "hidden", resize: "none", height: "auto" }}
              ></textarea>
            </fieldset>
          ))}

        {tarea &&
          tarea.map((elemento, index) => (
            <fieldset key={index}>
              <legend>Prioridad</legend>
              <select
                value={priority || elemento[2]}
                onChange={onHandleChangePriority}
              >
                <option value="">Elige una:</option>
                <option value="3">Alta</option>
                <option value="2">Normal</option>
                <option value="1">Baja</option>
              </select>
            </fieldset>
          ))}

        {tarea &&
          tarea.map((elemento, index) => (
            <fieldset className="centrado" key={index}>
              <legend>Fecha de Inicio</legend>
              <DatePicker
                selected={fechaMostrar1}
                /* onSelect={fechaInicio} */ //when day is clicked
                onChange={onHandleChangeFechaInicio}
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
              {/* <input
                type="datetime-local"
                step="3600"
                value={fechaInicio || format(new Date(elemento[7]), "yyyy-MM-ddThh:mm")}
                onChange={onHandleChangeFechaInicio}
                onClick={(event) => event.target.select()}
              /> */}
            </fieldset>
          ))}

        {tarea &&
          tarea.map((elemento, index) => (
            <fieldset className="centrado" key={index}>
              <legend>Fecha Límite</legend>
              <DatePicker
                minDate={fechaInicio}
                selected={fechaMostrar2}
                /* onSelect={() => {}}  *///when day is clicked
                onChange={onHandleChangeFecha}
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
              {/* <input
                type="datetime-local"
                step="3600"
                maxLength="16"
                value={fecha || format(new Date(elemento[4]), "yyyy-MM-ddThh:mm")}
                onChange={onHandleChangeFecha}
                onClick={(event) => event.target.select()}
              /> */}
            </fieldset>
          ))}

        <button className="registrar" onClick={enviarEditada}>
          Guardar Cambios
        </button>
        <button onClick={aInicio} className="aInicio">
          Inicio
        </button>
      </div>
      {/* <p>Fecha Inicio: {fechaInicio && JSON.stringify(fechaInicio)}</p>
      <p>Fecha: {fecha && JSON.stringify(fecha)}</p> */}
    </>
  );
};
