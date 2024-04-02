import { tareaApi } from '../../api/tareaApi';
import {store} from '../store';
import { setTareas, setTarea } from './tareaSlice';

export const registrarEnBase = () => async (dispatch, getState) => {
    const state = getState();
    const nuevaTarea = state.tarea.nuevaTarea;

    const jsonTarea = new Object();
    jsonTarea['title'] = nuevaTarea[0];
    jsonTarea['description'] = nuevaTarea[1];
    jsonTarea['category'] = nuevaTarea[2];
    jsonTarea['priority'] = nuevaTarea[3];
    jsonTarea['limitDate'] = nuevaTarea[4];

    const {data} = await tareaApi.post (`/registrarTarea.php`, jsonTarea);
};

export const getTareas = () => async (dispatch, getState) => {
    const state = getState();
    const filtro = state.tarea.filtro;

    const jsonFiltro = new Object();
    jsonFiltro['filter'] = filtro;

    const {data} = await tareaApi.post (`/getTareas.php`, jsonFiltro);
    dispatch(setTareas({tareas: data}));

};

export const getTarea = () => async (dispatch, getState) => {
    const state = getState();
    const tareaID = state.tarea.tareaID;
    const filtro = state.tarea.filtro;
    const jsonFiltro = new Object();
    jsonFiltro['tareaID'] = tareaID;
    jsonFiltro['filter'] = filtro;

    const {data} = await tareaApi.post (`/getTareaID.php`, jsonFiltro);
    dispatch(setTarea({tarea: data}));

};

export const deleteTarea = () => async (dispatch, getState) => {
    const state = getState();
    const tareaID = state.tarea.tareaID;
    const filtro = state.tarea.filtro;

    const jsonFiltro = new Object();
    jsonFiltro['tareaID'] = tareaID;
    jsonFiltro['filter'] = filtro;

    const {data} = await tareaApi.post (`/borrarTarea.php`, jsonFiltro);
    
};

export const editTarea = () => async (dispatch, getState) => {
    const state = getState();
    const tareaID = state.tarea.tareaID;
    const tareaEditada = state.tarea.tareaEditada;
    const filtro = state.tarea.filtro;

    const jsonEditada = new Object();
    jsonEditada['tareaID'] = tareaID;
    jsonEditada['title'] = tareaEditada[0];
    jsonEditada['description'] = tareaEditada[1];
    jsonEditada['priority'] = tareaEditada[2];
    jsonEditada['fecha'] = tareaEditada[3];
    jsonEditada['filter'] = filtro;

    const {data} = await tareaApi.post (`/editarTarea.php`, jsonEditada);
};

export const sendSolved = () => async (dispatch, getState) => {
    const state = getState();
    const solved = state.tarea.solved;
    const filtro = state.tarea.filtro;

    const jsonSolved = new Object();
    jsonSolved['solved'] = solved;
    jsonSolved['filter'] = filtro;
    const {data} = await tareaApi.post (`/enviarResueltas.php`, jsonSolved);
    
};
