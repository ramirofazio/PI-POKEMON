import React from "react";
import Pokemon from "../pokemon/Pokemon";
import { useSelector } from "react-redux";
import style from "./Pokemons.module.css";

export default function Pokemons({ currentPokemons }) {
  const pokemonBuscado = useSelector((state) => state.pokemonsBuscados);

  //console.log(pokemons[0]?.types);
  //console.log("Estoy en Pokemons ", pokemons);

  return (
    <div class={style.container}>
      {
        //(console.log("ENTRE AL MAP")

        pokemonBuscado ? (
          //console.log(pokemonBuscado),
          <div class={style.body_container}>
            {pokemonBuscado[0] ? ( //------SI ES DE LA DB MANDA ESTO
              <Pokemon
                id={pokemonBuscado[0].id}
                name={pokemonBuscado[0].name}
                img={pokemonBuscado[0].img}
                types={pokemonBuscado[0].types}
              />
            ) : pokemonBuscado.id ? (
              //console.log("ENTRE A POKEMON API"),
              //-------------------------SI ES DE LA API MANDA ESTO
              <Pokemon
                id={pokemonBuscado.id}
                name={pokemonBuscado.name}
                img={pokemonBuscado.img}
                types={pokemonBuscado.types}
              />
            ) : null}
          </div>
        ) : (
          <div class={style.body_home}>
            {!pokemonBuscado &&
              currentPokemons.map((poke) => {
                return (
                  <div class={style.cards}>
                    <Pokemon
                      id={poke.id}
                      name={poke.name}
                      img={poke.img}
                      types={poke.types}
                    />
                  </div>
                );
              })}
          </div>
        )
      }
    </div>
  );
}
