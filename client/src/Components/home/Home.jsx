import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getPokemons,
  getTypes,
  getPokemonsByTypes,
  getPokemonName,
  clearStates,
  createdOrDB,
  orderAZ,
  orderStrength,
  getPokemonsId,
} from "../../actions";
import Pokemons from "../pokemons/Pokemons.jsx";
import Paginado from "../paginado/Paginado.jsx";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch(); //Guardo el dispatch en la constante para poder despachar las actions donde quiera
  const types = useSelector((state) => state.types); //me guardo el array types del estado
  const pokemons = useSelector((state) => state.pokemons); //me guardo el array pokemmons del estado (tiene todos los pokemons)

  //------------------------------PAGINADO-----------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1); //Estado Local de paginado
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12); //Digo en parametros de useState cuantos personajes por pagina quiero
  const indexLastPokemon = currentPage * pokemonsPerPage; //Ultimo poke en la pagina. (Pagina 1 seria index 9)
  const indexFirstPokemon = indexLastPokemon - pokemonsPerPage; //Index del primer poke de la pagina
  const currentPokemons = pokemons.slice(indexFirstPokemon, indexLastPokemon); //Selecciono la cantidad de pokemons que quiero que se muestren con los index
  const paginado = (nroPag) => {
    setCurrentPage(nroPag);
  };

  //----------------------------LOCAL STATES---------------------------------------------------
  const [pokemonName, setPokemonName] = useState(); //ESTADO LOCAL SEARCHBAR
  const [orden, setOrden] = useState(""); //ESTADOS LOCAL ORDEN

  useEffect(() => {
    //Aca despacho las 2 actions para que cuando se monte el componente los tenga en el estado
    dispatch(getTypes());
    dispatch(getPokemons());
  }, []);

  //----------------FILTRO TYPES----------------------------------
  const handleOnChangeTypes = (e) => {
    //Funcion onChange de SelectFiltrosTypes
    //console.log(e.target.value);
    dispatch(getPokemonsByTypes(e.target.value));
  };

  //--------------BOTON HOME---------------------
  const handleOnClickHome = () => {
    dispatch(clearStates());
    setCurrentPage(1);
  };

  //-----------FILTRO API O DB-----------------------------------
  const handleOnChangeCreatedOrDB = (e) => {
    //console.log(e.target.value);
    dispatch(createdOrDB(e.target.value));
  };

  //--------------ORDENAMIENTOS-----------------------------------
  const handleOnChangeOrderStrength = (e) => {
    const result = e.target.value;
    //console.log(result);
    result === "default"
      ? dispatch(getPokemons())
      : dispatch(orderStrength(result));
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleOnChangeOrderAZ = (e) => {
    const result = e.target.value;
    //console.log(result);
    result === "default" ? dispatch(getPokemons()) : dispatch(orderAZ(result));
    setOrden(`Ordenado ${e.target.value}`);
  };

  return (
    <div class={style.container}>
      <div class={style.nav}>
        {/*-----------------NAV--------------------- */}
        <NavLink to="/">
          <button className={style.buttonLeave}>Leave</button>
        </NavLink>
        <NavLink to="/home">
          <button
            className={style.buttonHome}
            onClick={() => handleOnClickHome()}
          >
            Home
          </button>
        </NavLink>
        <div className={style.searchBar}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              //console.log(pokemon);
              const respuesta = pokemonName?.toLowerCase();
              dispatch(getPokemonName(respuesta));
              setPokemonName("");
            }}
          >
            <input
              className={style.text}
              type="text"
              placeholder="Poke Search..."
              value={pokemonName}
              onChange={(e) => setPokemonName(e.target.value)}
            />
            <input type="submit" value="Search!" class={style.submit} />
          </form>
        </div>
        <NavLink to="/create">
          <button className={style.buttonCreate}>Create</button>
        </NavLink>
        {/*-----------------------------ORDENAMIENTOS-------------------------- */}
        <div class={style.orden}>
          <p class={style.p}>Orden: </p>
          <select name="ordenAZ" onChange={(e) => handleOnChangeOrderAZ(e)}>
            <option class={style.opt} value="default">
              Default
            </option>
            <option class={style.opt} value="az">
              A - Z
            </option>
            <option class={style.opt} value="za">
              Z - A
            </option>
          </select>
          <select
            name="ordenStrength"
            onChange={(e) => handleOnChangeOrderStrength(e)}
          >
            <option class={style.opt} value="default">
              Default
            </option>
            <option class={style.opt} value="strength+-">
              ↑Attack - ↓Attack
            </option>
            <option class={style.opt} value="strength-+">
              ↓Attack - ↑Attack
            </option>
          </select>
        </div>
        {/*-----------------------------FILTROS-------------------------- */}
        <div class={style.filtros}>
          <p class={style.p}>Filtros: </p>
          <select name="types" onChange={(e) => handleOnChangeTypes(e)}>
            <option value="allTypes">All Types</option>
            {types.map((type) => {
              return (
                <option value={`${type.name}`} key={type.name}>
                  {type.name}
                </option>
              );
            })}
          </select>
          <select
            name="createdOrDB"
            onChange={(e) => handleOnChangeCreatedOrDB(e)}
          >
            <option value="allPokemons">All Pokemons</option>
            <option value="DB">Created</option>
            <option value="api">Exists</option>
          </select>
        </div>
        <div className={style.paginado}>
          <Paginado
            pokemonsPerPage={pokemonsPerPage}
            pokemons={pokemons.length}
            paginado={paginado}
          />
        </div>
      </div>
      {/*-----------------------------BODY-------------------------- */}
      <Pokemons currentPokemons={currentPokemons} />
    </div>
  );
}
