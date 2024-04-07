import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay} from "date-fns";
import esES from "date-fns/locale/es";
import es from "date-fns/locale/es";
import { useSelector, useDispatch } from "react-redux";
import { setFiltro2, setTareaID } from "../store/slices/tareaSlice";
import { useNavigate } from "react-router-dom";
/* import dayjs from 'dayjs'; */

const locales = {
  'es': esES,
}

/* const events2 = [{
  title: 'Algo',
  notes: 'Nada',
  start: new Date(),
  end: addHours( new Date(),2),
  bgColor: '#fafafa'

}] */

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (day) => startOfWeek(day, { weekStartsOn: 0 }), // Semana empieza en Lunes (1)
  getDay,
  locales,
});

const formats = {
  weekdayFormat: (date) => {
    const formattedDay = format(date, "eee", { locale: es });
    return (
      formattedDay.charAt(0).toUpperCase() + formattedDay.slice(1).toLowerCase()
    );
  },
};

export const Calendario = () => {
  //Constantes************************************

  const navigate = useNavigate();
  const { events } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();
  /* const { tareas, filtro } = useSelector((state) => state.tarea); */

  //Funciones***************************************

  const aInicio = () => {
    navigate("/inicio");
  };

  const onSelect = (event) => {
    const idTarea = event.id;
    const filtroTarea = event.filter;

    dispatch(setTareaID(idTarea));
    dispatch(setFiltro2(filtroTarea));

    navigate("/detalles");
  };
  //Efectos*******************************************

  const dayPropGetter = (date) => {
    const dayOfWeek = getDay(date);
    if (dayOfWeek === 0) {
      // Domingo
      return {
        className: "custom-sunday-cell",
      };
    } else if (dayOfWeek === 6) {
      return {
        className: "custom-saturday-cell",
      };
    }
    return {};
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = "";

    if (event.prioridad === 2) {
      backgroundColor = "#0b9bff";
    } else if (event.prioridad === 1) {
      backgroundColor = "#00E8DA";
    } else if (event.prioridad === 3) {
      backgroundColor = "#11365a";
    }

    const style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.9,
      color: "white",
    };

    return {
      style,
    };
  };

  const getMessagesES = () => {
    return {
      allDay: "Todo el día",
      previous: "<",
      next: ">",
      today: "Hoy",
      month: "Mes",
      week: "Semana",
      day: "Día",
      agenda: "Tareas",
      date: "Fecha",
      time: "Hora",
      event: "Evento",
      noEventsInRange: "No hay eventos en este rango",
      showMore: (total) => `+ Ver más (${total})`,
    };
  };

  return (
    <>
      <div style={{ height: "77vh", width: "90vw" }}>
        <Calendar
          culture="es"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={getMessagesES()}
          onSelectEvent={onSelect}
          /* components={{ day: { header: CustomDayHeader } }} // Utilizamos CustomDayHeader para mostrar los días abreviados */
          formats={formats}
          dayPropGetter={dayPropGetter}
          eventPropGetter={eventStyleGetter}
        />
      </div>
      <div className="containerCalendar">
        <button className="der2" onClick={aInicio}>Inicio</button>
      </div>
      
    </>
  );
};
