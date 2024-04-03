import { useDispatch, useSelector } from "react-redux";
import { editTarea, getTarea } from "../store/slices/thunks";
import { useEffect, useRef, useState } from "react";
import { setTareaEditada } from "../store/slices/tareaSlice";
import { useNavigate } from "react-router-dom";

export const EditarTarea = () => {
  //Constantes***************************************************************
  const { tarea } = useSelector((state) => state.tarea);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [fecha, setFecha] = useState("");
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const [firstTouch, setFirstTouch] = useState(true);
  const [secondTouch, setSecondTouch] = useState(true);

  //Funciones***************************************************************
  const onHandleChangePriority = (event) => {
    setPriority(event.target.value);
  };
  const onHandleChangeFecha = (event) => {
    setFecha(event.target.value);
  };
  const onHandleChangeTitulo = ({ target }) => {
    setTitle(target.value);
  };
  const onHandleChangeDescription = ({ target }) => {
    setDescription(target.value);
  };

  const enviarEditada = () => {
    if (title && description && priority && fecha) {
      dispatch(
        setTareaEditada({ tareaEditada: [title, description, priority, fecha] })
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
      setFecha(tarea[0][4]);
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
              value={title !== null ? title : elemento[0] || ''}
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
                  event.target.setSelectionRange(touchPosition, touchPosition);
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
                    event.target.setSelectionRange(touchPosition, touchPosition);
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
            <fieldset key={index}>
              <legend>Fecha Límite</legend>
              <input
                type="date"
                value={fecha || elemento[4]}
                onChange={onHandleChangeFecha}
                onClick={(event) => event.target.select()}
              />
            </fieldset>
          ))}

        <button className="registrar" onClick={enviarEditada}>
          Guardar Cambios
        </button>
        <button onClick={aInicio} className="aInicio">
          Inicio
        </button>
      </div>
    </>
  );
};
