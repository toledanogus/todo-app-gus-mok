import { createSlice } from '@reduxjs/toolkit'

export const tareaSlice = createSlice({
name: 'tarea',
  initialState:{
    counter: 10,
    nuevaTarea:'',
    filtro:'',
    filtro2:'',
    tareas: '',
    tareaID:'',
    tarea:'',
    tareaEditada:'',
    solved:'',
    notificacion:0,
    counterPendientes:'',
    tareasActive:'',
  },
  reducers: {
    setNuevaTarea: (state, action) => {
      state.nuevaTarea = action.payload.nuevaTarea;
    },
    setFiltro: (state, action) => {
      state.filtro = action.payload;
    },
    setTareas: (state, action) => {
      state.tareas = action.payload.tareas;
    },
    setTareaID: (state, action) => {
      state.tareaID = action.payload;
    },
    setTarea:(state, action) => {
      state.tarea = action.payload.tarea;
    },
    setTareaEditada:(state, action) => {
      state.tareaEditada = action.payload.tareaEditada;
    },
    setSolved: (state, action) => {
      state.solved = action.payload.solved;
    },
    setFiltro2: (state, action) => {
      state.filtro2 = action.payload;
    },
    setNotificacion: (state, action) => {
      state.notificacion = action.payload.notificacion;
    },
    setCounterPendientes: (state, action) => {
      state.counterPendientes = action.payload.counterPendientes;
    },
    setTareasActive: (state, action) => {
      state.tareasActive = action.payload.tareasActive;
    },
  }
})
// Action creators are generated for each case reducer function
export const { setNuevaTarea, setFiltro, setTareas, setTareaID, setTarea, setTareaEditada, setSolved, setFiltro2, setNotificacion, setCounterPendientes, setTareasActive} = tareaSlice.actions;