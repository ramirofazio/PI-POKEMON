import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getPokemons } from "../../actions";
import { useDispatch } from "react-redux";
import style from "./Landing.module.css";
import "normalize.css";
import pikachu from "../../assets/pikachu.png";
import pokemon from "../../assets/pokemon.png";
import fondo from "../../assets/fondo.png";

export default function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    //cargo los pokes en el estado cuando se monta el componente
    dispatch(getPokemons());
  }, []);

  return (
    <div class={style.container}>
      <div className={style.info}>
        <img src={pokemon} className={style.logo} />
        <NavLink to="/home" class={style.button}>
          GO!
        </NavLink>
      </div>
      <img src={fondo} alt="" className={style.fondo} />
    </div>
  );
}
