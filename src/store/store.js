import { configureStore } from '@reduxjs/toolkit';
import { tareaSlice } from './slices/tareaSlice';
import { calendarSlice } from './slices/calendarSlice';


export const store = configureStore({
    reducer: {
        tarea: tareaSlice.reducer,
        calendar: calendarSlice.reducer
    },
});