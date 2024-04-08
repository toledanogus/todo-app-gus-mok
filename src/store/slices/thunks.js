/* eslint-disable no-unused-vars */
import { addHours, parse, startOfDay, format } from "date-fns";
import { tareaApi } from "../../api/tareaApi";
import { store } from "../store";
import { setEvents } from "./calendarSlice";
import { setTareas, setTarea, setNotificacion, setCounterPendientes } from "./tareaSlice";

export const registrarEnBase = () => async (dispatch, getState) => {
  const state = getState();
  const nuevaTarea = state.tarea.nuevaTarea;

  const jsonTarea = new Object();
  jsonTarea["title"] = nuevaTarea[0];
  jsonTarea["description"] = nuevaTarea[1];
  jsonTarea["category"] = nuevaTarea[2];
  jsonTarea["priority"] = nuevaTarea[3];
  jsonTarea["startDate"] = nuevaTarea[4];
  jsonTarea["limitDate"] = nuevaTarea[5];

  const { data } = await tareaApi.post(`/registrarTarea.php`, jsonTarea);
};

export const getTareas = () => async (dispatch, getState) => {
  const state = getState();
  const filtro = state.tarea.filtro;

  const jsonFiltro = new Object();
  jsonFiltro["filter"] = filtro;

  const { data } = await tareaApi.post(`/getTareas.php`, jsonFiltro);

  dispatch(setTareas({ tareas: data }));
 
  const eventos = data.map(elemento => {
    if (elemento[3] === 0) {
    return {
      title: elemento[0],
      notes: elemento[1],
      start: new Date(elemento[4]),
      end: new Date(elemento[5]),
      id: elemento[7],
      filter: elemento[6],
      prioridad: elemento [2],
    };
  }
  });
  dispatch(setEvents({ events: eventos }));
  
};

export const getTarea = () => async (dispatch, getState) => {
  const state = getState();
  const tareaID = state.tarea.tareaID;
  const filtro = state.tarea.filtro;
  const filtro2 = state.tarea.filtro2;
  const jsonFiltro = new Object();
  jsonFiltro["tareaID"] = tareaID;
  jsonFiltro["filter"] = filtro;
  jsonFiltro["filter2"] = filtro2;

  const { data } = await tareaApi.post(`/getTareaID.php`, jsonFiltro);
  dispatch(setTarea({ tarea: data }));
};

export const deleteTarea = () => async (dispatch, getState) => {
  const state = getState();
  const tareaID = state.tarea.tareaID;
  const filtro = state.tarea.filtro;
  const filtro2 = state.tarea.filtro2;
  const jsonFiltro = new Object();
  jsonFiltro["tareaID"] = tareaID;
  jsonFiltro["filter"] = filtro;
  jsonFiltro["filter2"] = filtro2;

  const { data } = await tareaApi.post(`/borrarTarea.php`, jsonFiltro);
};

export const editTarea = () => async (dispatch, getState) => {
  const state = getState();
  const tareaID = state.tarea.tareaID;
  const tareaEditada = state.tarea.tareaEditada;
  const filtro = state.tarea.filtro;
  const filtro2 = state.tarea.filtro2;

  const jsonEditada = new Object();
  jsonEditada["tareaID"] = tareaID;
  jsonEditada["title"] = tareaEditada[0];
  jsonEditada["description"] = tareaEditada[1];
  jsonEditada["priority"] = tareaEditada[2];
  jsonEditada["startDate"] = tareaEditada[4];
  jsonEditada["fecha"] = tareaEditada[3];
  jsonEditada["filter"] = filtro;
  jsonEditada["filter2"] = filtro2;

  const { data } = await tareaApi.post(`/editarTarea.php`, jsonEditada);
};

export const sendSolved = () => async (dispatch, getState) => {
  const state = getState();
  const solved = state.tarea.solved;
  const filtro = state.tarea.filtro;
  const filtro2 = state.tarea.filtro2;
  const jsonSolved = new Object();
  jsonSolved["solved"] = solved;
  jsonSolved["filter"] = filtro;
  jsonSolved["filter2"] = filtro2;
  const { data } = await tareaApi.post(`/enviarResueltas.php`, jsonSolved);
};

export const getNotificacion = () => async (dispatch) => {
  const { data } = await tareaApi.get(`/notificacion.php`);
  dispatch(setNotificacion({ notificacion: data }));
};

export const traerPendientes = () => async (dispatch) => {
  const { data } = await tareaApi.get(`/traerPendientes.php`);
  dispatch(setCounterPendientes({ counterPendientes: data }));
}
