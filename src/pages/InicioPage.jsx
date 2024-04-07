import { useDispatch, useSelector } from "react-redux";
import { setFiltro } from "../store/slices/tareaSlice";
import { useNavigate } from "react-router-dom";
import l1 from "../assets/iconos2/1.png";
import l2 from "../assets/iconos2/2.png";
import l3 from "../assets/iconos2/3.png";
import l4 from "../assets/iconos2/4.png";
import l5 from "../assets/iconos2/5.png";
import l6 from "../assets/iconos2/6.png";
import l7 from "../assets/iconos2/7.png";
import l8 from "../assets/iconos2/8.png";
import l9 from "../assets/iconos2/9.png";
import l10 from "../assets/iconos2/10.png";
import l11 from "../assets/iconos2/11.png";
import l12 from "../assets/iconos2/12.png";
import l13 from "../assets/iconos2/13.png";
import l14 from "../assets/iconos2/14.png";
import l15 from "../assets/iconos2/15.png";
import l16 from "../assets/iconos2/16.png";
import l17 from "../assets/iconos2/17.png";
import l18 from "../assets/iconos2/18.png";
import l19 from "../assets/iconos2/19.png";
import l20 from "../assets/iconos2/20.png";
import l21 from "../assets/iconos2/21.png";
import l22 from "../assets/iconos2/22.png";
import l23 from "../assets/iconos2/23.png";
import l24 from "../assets/iconos2/24.png";
import { useEffect, useState } from "react";
import {
  getNotificacion,
  getTareas,
  traerPendientes,
} from "../store/slices/thunks";
import { compareAsc, startOfDay, parseISO, isWithinInterval } from "date-fns";


export const InicioPage = () => {
  //Constantes**********************************************
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notificacion, counterPendientes } = useSelector(
    (state) => state.tarea
  );
  const [categoriasRender, setCategoriasRender] = useState([
    "escuela",
    "casa",
    "personal",
    "salud",
    "diversion",
    "alumnos",
    "padres",
    "juntos",
  ]);

  const filtros = [
    { tipo: "todas", icono: l7, texto: "Todas" },
    { tipo: "escuela", icono: l5, texto: "Escuela" },
    { tipo: "casa", icono: l21, texto: "Casa" },
    { tipo: "personal", icono: l2, texto: "Personal" },
    { tipo: "salud", icono: l20, texto: "Salud" },
    { tipo: "diversion", icono: l11, texto: "Diversión" },
    { tipo: "alumnos", icono: l14, texto: "Alumnos" },
    { tipo: "padres", icono: l24, texto: "Padres" },
    { tipo: "juntos", icono: l23, texto: "YG" }
  ];

  //Funciones***********************************************
  const aNuevaTarea = () => {
    navigate("/nueva");
  };

  const aListaDeTareas = (nuevoFiltro) => {
    dispatch(setFiltro(nuevoFiltro));
    navigate("/lista");
  };

  const aCalendario = () => {
    dispatch(setFiltro("todas"));
    dispatch(getTareas());
    navigate("/calendario");
  };

  const contadorP = (counterPendientes, categoria) => {
    let contador = 0;
    for (let i = 0; i < counterPendientes.length; i++) {
      for (let j = 0; j < counterPendientes[i].length; j++) {
        if (counterPendientes[i][j] === categoria) {
          contador++;
        }
      }
    }
    return contador;
  };

  /* const fechaParaComparar = (fecha) => {
    const fechaObjeto = parseISO(fecha);
    const fechaInicioDia = startOfDay(fechaObjeto);
    return fechaInicioDia;
  } */

const pendientesHoy = (pendientes, categoria) => {
  let counter=0;
if (categoria === 'todas') {
  const fechasTodas = pendientes.map(subarray => [subarray[3], subarray[4]]);

  fechasTodas.map((elemento)=>{
    const isActive = isWithinInterval(startOfDay(new Date()), {
      start: startOfDay(new Date(elemento[1])),
      end: startOfDay(new Date(elemento[0]))
    });
    if (isActive) {
      counter = counter+1;
    }
  })
  return counter;
}else{
  const subarraysCasa = pendientes.filter(subarray => subarray[2] === categoria);
  const fechasDeCasa = subarraysCasa.map(subarray => [subarray[3], subarray[4]]);
 
fechasDeCasa.map((elemento)=>{
  const isActive = isWithinInterval(startOfDay(new Date()), {
    start: startOfDay(new Date(elemento[1])),
    end: startOfDay(new Date(elemento[0]))
  });
  if (isActive) {
    counter = counter+1;
  }
})
return counter;
}
}
  

  //Efectos*************************************************
  useEffect(() => {
    dispatch(getNotificacion());
  }, []);

  useEffect(() => {
    dispatch(traerPendientes());
  }, []);

  useEffect(() => {}, [counterPendientes]);

  return (
    <>
      <h1 className="tituloInicio">Gestión de Pendientes</h1>

      <div className="containerInicio">



        <div
          className="todas"
          colSpan="4"
          onClick={() => {
            const nuevoFiltro = "todas";
            aListaDeTareas(nuevoFiltro);
          }}
        >
          <div className="circuloCounter">{counterPendientes && counterPendientes.length}</div>
          <div className="icono">
            <img className="iconito" src={l7} alt="" />
          </div>
          Todas
          {counterPendientes && pendientesHoy(counterPendientes, 'todas' )!= 0 ?
          <div className="circulo-hoy">
            {pendientesHoy(counterPendientes, 'todas' )}
          </div>: null} 
        </div>
        

        <div
          className="escuela"
          colSpan="4"
          onClick={() => {
            const nuevoFiltro = "escuela";
            aListaDeTareas(nuevoFiltro);
          }}
        >
          {counterPendientes && contadorP(counterPendientes, 'escuela') != 0 ? <div className="circuloCounter">{counterPendientes &&
          contadorP(counterPendientes, 'escuela')}
        </div> : null}
          <div className="icono">
            <img className="iconito" src={l5} alt="" />
          </div>
          Escuela
          {counterPendientes && pendientesHoy(counterPendientes, 'escuela' )!= 0 ?
          <div className="circulo-hoy">
            {pendientesHoy(counterPendientes, 'escuela' )}
          </div>: null} 
        </div>
        <div
          className="casa"
          colSpan="4"
          onClick={() => {
            const nuevoFiltro = "casa";
            aListaDeTareas(nuevoFiltro);
          }}
        >
          {counterPendientes && contadorP(counterPendientes, 'casa') != 0 ? <div className="circuloCounter">{counterPendientes &&
          contadorP(counterPendientes, 'casa')}
        </div> : null}
          <div className="icono">
            <img className="iconito" src={l21} alt="" />
          </div>
          Casa
          {counterPendientes && pendientesHoy(counterPendientes, 'casa' )!= 0 ?
          <div className="circulo-hoy">
            {pendientesHoy(counterPendientes, 'casa' )}
          </div>: null} 
        </div>
      </div>
      {/* linea siguiente *************************************/}
      <div className="containerInicio">
        <div
          className="personal"
          colSpan="4"
          onClick={() => {
            const nuevoFiltro = "personal";
            aListaDeTareas(nuevoFiltro);
          }}
        >
          {counterPendientes && contadorP(counterPendientes, 'personal') != 0 ? <div className="circuloCounter">{counterPendientes &&
          contadorP(counterPendientes, 'personal')}
        </div> : null}
          <div className="icono">
            <img className="iconito" src={l2} alt="" />
          </div>
          Personal
          {counterPendientes && pendientesHoy(counterPendientes, 'personal' )!= 0 ?
          <div className="circulo-hoy">
            {pendientesHoy(counterPendientes, 'personal' )}
          </div>: null} 
        </div>

        <div
          className="salud"
          onClick={() => {
            const nuevoFiltro = "salud";
            aListaDeTareas(nuevoFiltro);
          }}
        >
          {counterPendientes && contadorP(counterPendientes, 'salud') != 0 ? <div className="circuloCounter">{counterPendientes &&
          contadorP(counterPendientes, 'salud')}
        </div> : null}
          <div className="icono">
            <img className="iconito" src={l20} alt="" />
          </div>
          Salud
          {counterPendientes && pendientesHoy(counterPendientes, 'salud' )!= 0 ?
          <div className="circulo-hoy">
            {pendientesHoy(counterPendientes, 'salud' )}
          </div>: null} 
        </div>
        <div
          className="diversion"
          onClick={() => {
            const nuevoFiltro = "diversion";
            aListaDeTareas(nuevoFiltro);
          }}
        >
          {counterPendientes && contadorP(counterPendientes, 'diversion') != 0 ? <div className="circuloCounter">{counterPendientes &&
          contadorP(counterPendientes, 'diversion')}
        </div> : null}
          <div className="icono">
            <img className="iconito" src={l11} alt="" />
          </div>
          Diversión
          {counterPendientes && pendientesHoy(counterPendientes, 'diversion' )!= 0 ?
          <div className="circulo-hoy">
            {pendientesHoy(counterPendientes, 'diversion' )}
          </div>: null} 
        </div>
      </div>
      {/* linea siguiente *************************************/}
      <div className="containerInicio">
        <div
          className="alumnos"
          onClick={() => {
            const nuevoFiltro = "alumnos";
            aListaDeTareas(nuevoFiltro);
          }}
        >
          {counterPendientes && contadorP(counterPendientes, 'alumnos') != 0 ? <div className="circuloCounter">{counterPendientes &&
          contadorP(counterPendientes, 'alumnos')}
        </div> : null}
          <div className="icono">
            <img className="iconito" src={l14} alt="" />
          </div>
          Alumnos
          {counterPendientes && pendientesHoy(counterPendientes, 'alumnos' )!= 0 ?
          <div className="circulo-hoy">
            {pendientesHoy(counterPendientes, 'alumnos' )}
          </div>: null} 
        </div>
        <div
          className="padres"
          onClick={() => {
            const nuevoFiltro = "padres";
            aListaDeTareas(nuevoFiltro);
          }}
        >
          {counterPendientes && contadorP(counterPendientes, 'padres') != 0 ? <div className="circuloCounter">{counterPendientes &&
          contadorP(counterPendientes, 'padres')}
        </div> : null}
          <div className="icono">
            <img className="iconito" src={l24} alt="" />
          </div>
          Padres
          {counterPendientes && pendientesHoy(counterPendientes, 'padres' )!= 0 ?
          <div className="circulo-hoy">
            {pendientesHoy(counterPendientes, 'padres' )}
          </div>: null} 
        </div>
        <div
          className="juntos"
          onClick={() => {
            const nuevoFiltro = "juntos";
            aListaDeTareas(nuevoFiltro);
          }}
        >
          {counterPendientes && contadorP(counterPendientes, 'juntos') != 0 ? <div className="circuloCounter">{counterPendientes &&
          contadorP(counterPendientes, 'juntos')}
        </div> : null}
          <div className="icono">
            <img className="iconito" src={l23} alt="" />
          </div>
          YG
          {counterPendientes && pendientesHoy(counterPendientes, 'juntos' )!= 0 ?
          <div className="circulo-hoy">
            {pendientesHoy(counterPendientes, 'juntos' )}
          </div>: null} 
        </div>
      </div>
      <div className="containerInicio">
        <button className="nuevaTarea" onClick={aNuevaTarea}>
          Nueva Tarea
        </button>
      </div>
      <div>
        {notificacion && notificacion[0][0] === 1 ? (
          <div className="circulo-rojo"></div>
        ) : null}
      </div>
      <div className="contenedorx">
        <button onClick={aCalendario} className="gusPersonal">
          Calendario General
        </button>
      </div>
      
        {/* <div>{counterPendientes &&
              JSON.stringify(startOfDay(new Date()))
        }</div>
        <div>{counterPendientes &&
              JSON.stringify(startOfDay(new Date(counterPendientes[0][3])))
        }</div>
        <div>{counterPendientes &&
          compareAsc(startOfDay(new Date()),startOfDay(new Date(counterPendientes[0][3])))
        }</div> */}
    </>
  );
};
