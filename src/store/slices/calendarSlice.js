import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';


/* const tempEvent = {
    title: "Amar a Yan",
    notes: "Todos los días",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#FFFFFF",
    user:{
        _id:'123',
        name: 'Gustavo'
    }
    
} */

export const calendarSlice = createSlice({
name: 'calendar',
  initialState:{
    events: [],
    activeEvent: null,
  },
  reducers: {

    setEvents: (state, action) => {
        state.events = action.payload.events;
    }
  },
})
// Action creators are generated for each case reducer function
export const { setEvents} = calendarSlice.actions