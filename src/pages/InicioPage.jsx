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
import { useEffect } from "react";
import { getNotificacion, getTareas } from "../store/slices/thunks";

export const InicioPage = () => {
  //Constantes**********************************************
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notificacion } = useSelector((state) => state.tarea);

  //Funciones***********************************************
  const aNuevaTarea = () => {
    navigate("/nueva");
  };

  const aListaDeTareas = (nuevoFiltro) => {
    dispatch(setFiltro(nuevoFiltro));
    navigate("/lista");
  };

  const aCalendario = () => {
    dispatch(setFiltro('todas'));
    dispatch(getTareas());
    navigate("/calendario");
  };

  //Efectos*************************************************
  useEffect(() => {
    dispatch(getNotificacion());
  }, []);

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
          <div className="icono">
            <img className="iconito" src={l7} alt="" />
          </div>
          Todas
        </div>

        <div
          className="escuela"
          colSpan="4"
          onClick={() => {
            const nuevoFiltro = "escuela";
            aListaDeTareas(nuevoFiltro);
          }}
        >
          <div className="icono">
            <img className="iconito" src={l5} alt="" />
          </div>
          Escuela
        </div>
        <div
          className="casa"
          colSpan="4"
          onClick={() => {
            const nuevoFiltro = "casa";
            aListaDeTareas(nuevoFiltro);
          }}
        >
          <div className="icono">
            <img className="iconito" src={l21} alt="" />
          </div>
          Casa
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
          <div className="icono">
            <img className="iconito" src={l2} alt="" />
          </div>
          Personal
        </div>

        <div
          className="salud"
          onClick={() => {
            const nuevoFiltro = "salud";
            aListaDeTareas(nuevoFiltro);
          }}
        >
          <div className="icono">
            <img className="iconito" src={l20} alt="" />
          </div>
          Salud
        </div>
        <div
          className="diversion"
          onClick={() => {
            const nuevoFiltro = "diversion";
            aListaDeTareas(nuevoFiltro);
          }}
        >
          <div className="icono">
            <img className="iconito" src={l11} alt="" />
          </div>
          Diversión
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
          <div className="icono">
            <img className="iconito" src={l14} alt="" />
          </div>
          Alumnos
        </div>
        <div
          className="padres"
          onClick={() => {
            const nuevoFiltro = "padres";
            aListaDeTareas(nuevoFiltro);
          }}
        >
          <div className="icono">
            <img className="iconito" src={l24} alt="" />
          </div>
          Padres
        </div>
        <div
          className="juntos"
          onClick={() => {
            const nuevoFiltro = "juntos";
            aListaDeTareas(nuevoFiltro);
          }}
        >
          <div className="icono">
            <img className="iconito" src={l23} alt="" />
          </div>
          YG
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
    </>
  );
};
