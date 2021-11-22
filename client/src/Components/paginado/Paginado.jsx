import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ pokemonsPerPage, pokemons, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(pokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul class={style.paginado}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <button class={style.btn} onClick={() => paginado(number)}>
              {number}
            </button>
          ))}
      </ul>
    </nav>
  );
}
