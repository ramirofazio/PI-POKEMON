import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonsId, clearStates, getPokemons } from "../../actions";
import { Link } from "react-router-dom";
import style from "./PokeDetail.module.css";
import fondo from "../../assets/Fondo.jpeg";

export default function PokeDetail({ id }) {
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.pokemonDetail);

  useEffect(() => {
    dispatch(getPokemonsId(id));
    dispatch(clearStates());
    dispatch(getPokemons());
  }, []);

  let nuevosTypes = [];
  if (id.length > 5) {
    pokemonDetail.types?.filter((type) => nuevosTypes.push(type.name));
    //console.log("Entre!", nuevosTypes);
  }

  return (
    <div class={style.container}>
      <Link to="/home">
        <button class={style.buttonHome}>Go Home</button>
      </Link>
      <div className={style.info}>
        <div class={style.infoPrincipal}>
          <h1 class={style.name}>
            {pokemonDetail.name?.slice(0, 1).toUpperCase() +
              pokemonDetail.name?.slice(1, pokemonDetail.name?.length)}
          </h1>
          <img src={pokemonDetail.img} alt="" class={style.img} />
          <h3 class={style.types}>
            {id.length > 5
              ? nuevosTypes?.join(" _ ")
              : pokemonDetail.types?.join(" _ ")}
          </h3>
        </div>
        <div className={style.infoSecundaria}>
          <div class={style.hp}>❤️ {pokemonDetail.hp}</div>
          <div class={style.defense}>🛡 {pokemonDetail.defense}</div>
          <div class={style.height}>📏 {pokemonDetail.height / 8} M</div>
          <div class={style.weight}>⚖️ {pokemonDetail.weight / 8} kG</div>
          <div class={style.speed}>⏱️ {pokemonDetail.speed}</div>
          <div class={style.strength}>⚔️ {pokemonDetail.strength}</div>
        </div>
      </div>
      <img src={fondo} atl="" className={style.img} />
    </div>
  );
}
