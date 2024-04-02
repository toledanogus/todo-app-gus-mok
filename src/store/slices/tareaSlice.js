import { createSlice } from '@reduxjs/toolkit'

export const tareaSlice = createSlice({
name: 'tarea',
  initialState:{
    counter: 10,
    nuevaTarea:'',
    filtro:'',
    tareas: '',
    tareaID:'',
    tarea:'',
    tareaEditada:'',
    solved:'',
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
    }
  },
})
// Action creators are generated for each case reducer function
export const { setNuevaTarea, setFiltro, setTareas, setTareaID, setTarea, setTareaEditada, setSolved} = tareaSlice.actions;