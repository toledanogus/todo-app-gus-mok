import { configureStore } from '@reduxjs/toolkit';
import { tareaSlice } from './slices/tareaSlice';

export const store = configureStore({
    reducer: {
        tarea: tareaSlice.reducer,
    },
});