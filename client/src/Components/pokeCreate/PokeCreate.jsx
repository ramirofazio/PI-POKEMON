import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, clearStates, postPokemon } from "../../actions";
import { Link } from "react-router-dom";
import style from "./PokeCreate.module.css";
import fondo from "../../assets/create.jpg";
import swal from "sweetalert";

export default function PokeCreate() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types); //selecciono state.types en types
  const pokemons = useSelector((state) => state.pokemons);

  //--------------------CREO ESTADO LOCAL----------------------------
  const [newPoke, setNewPoke] = useState({
    name: "",
    hp: 1,
    strength: 1,
    defense: 1,
    speed: 1,
    height: 1,
    weight: 1,
    img: "http://1.bp.blogspot.com/-fBRhv06zzvM/Uj_PUZkcY0I/AAAAAAAACTc/uexDvoP6pLM/s1600/Sad_Face_Pikachu_is_Sad_by_ChibiIlliterate1.png",
    types: [],
  });

  //------------------USE EFFECT--------------------------
  useEffect(() => {
    dispatch(getTypes()); //Me traigo los types para poder usarlos
  }, []);

  //---------------HANDLE BUTTON HOME-----------------
  const handleOnClickHome = () => {
    dispatch(clearStates());
  };

  const showTypes = (num) => {
    const respuesta = types.map((type) =>
      type.id === parseInt(num, 10) ? type.name : null
    );
    console.log(newPoke.types);
    return respuesta;
  };

  const deleteType = (id) => {
    const index = newPoke.types.indexOf(id);
    newPoke.types.splice(index, 1);
    setNewPoke({
      ...newPoke,
    });
  };

  const validation = () => {
    if (!newPoke.name) return true;
    if (!newPoke.types.length) return true;
  };

  // [{ id: 1, name: normal } {}{}{}]

  return (
    <div class={style.container}>
      {/*---------BUTTON HOME-------------------- */}
      <Link to="/home">
        <button
          class={style.buttonHome}
          onClick={() => {
            handleOnClickHome();
          }}
        >
          Home
        </button>
      </Link>
      {/*-----------INPUT CREAT------------------------ */}
      <div class={style.formContainer}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(newPoke);
            dispatch(postPokemon(newPoke));
            setNewPoke({
              name: "",
              hp: "",
              strength: "",
              defense: "",
              speed: "",
              height: "",
              weight: "",
              img: "",
              types: [],
            }); //Borro los campos
            swal("Pokemon Succesfully Created!", "", "success");
          }}
        >
          <div className={style.input}>
            <input
              className={style.inp}
              type="text"
              placeholder="Name..."
              value={newPoke.name}
              onChange={(e) => {
                const res = e.target.value.toLowerCase();
                setNewPoke({
                  ...newPoke,
                  name: res,
                });
              }}
            />
          </div>
          <div className={style.input}>
            <input
              className={style.inp}
              type="number"
              placeholder="Life..."
              onChange={(e) => {
                const res = e.target.value;
                res <= 100 && res >= 0
                  ? setNewPoke({
                      ...newPoke,
                      hp: res,
                    })
                  : swal("Select a number from 1-100", "", "error");
              }}
            />
          </div>

          <div className={style.input}>
            <input
              className={style.inp}
              type="number"
              placeholder="Attack..."
              onChange={(e) => {
                const res = e.target.value;
                res <= 100 && res >= 0
                  ? setNewPoke({
                      ...newPoke,
                      strength: res,
                    })
                  : swal("Select a number from 1-100", "", "error");
              }}
            />
          </div>

          <div className={style.input}>
            <input
              className={style.inp}
              type="number"
              placeholder="Defense..."
              onChange={(e) => {
                const res = e.target.value;
                res <= 100 && res >= 0
                  ? setNewPoke({
                      ...newPoke,
                      defense: res,
                    })
                  : swal("Select a number from 1-100", "", "error");
              }}
            />
          </div>

          <div className={style.input}>
            <input
              className={style.inp}
              type="number"
              placeholder="Speed..."
              onChange={(e) => {
                const res = e.target.value;
                res <= 100 && res >= 0
                  ? setNewPoke({
                      ...newPoke,
                      speed: res,
                    })
                  : swal("Select a number from 1-100", "", "error");
              }}
            />
          </div>

          <div className={style.input}>
            <input
              className={style.inp}
              type="number"
              placeholder="Height..."
              onChange={(e) => {
                const res = e.target.value;
                res <= 100 && res >= 0
                  ? setNewPoke({
                      ...newPoke,
                      height: res,
                    })
                  : swal("Select a number from 1-100", "", "error");
              }}
            />
          </div>

          <div className={style.input}>
            <input
              className={style.inp}
              type="number"
              placeholder="Weight..."
              onChange={(e) => {
                const res = e.target.value;
                res <= 100 && res >= 0
                  ? setNewPoke({
                      ...newPoke,
                      weight: res,
                    })
                  : swal("Select a number from 1-100", "", "error");
              }}
            />
          </div>

          <div className={style.input}>
            {" "}
            <input
              className={style.inp}
              type="url"
              placeholder="Image URL..."
              attern="https://.*"
              onChange={(e) => {
                const res = e.target.value;
                setNewPoke({
                  ...newPoke,
                  img: res,
                });
              }}
            />
          </div>
          {/*---------------------------ARRANCAN SELECTOR TYPES--------------------------------- */}
          <div className={style.types}>
            <select
              disabled={newPoke.types.length === 2 ? true : false}
              name="Types1"
              className={style.select}
              onChange={(e) => {
                let type = e.target.value;
                newPoke.types.includes(type) === false
                  ? newPoke.types.length !== 2
                    ? setNewPoke({
                        ...newPoke,
                        types: [...newPoke.types, type],
                      })
                    : swal("You can only select 2 types!", "", "error")
                  : swal("Select a different Type!", "", "error");
              }}
            >
              <option>Type 1</option>
              {types.map((type, index) => {
                return (
                  <option
                    className={style.option}
                    id={index + 1}
                    value={index + 1}
                  >
                    {type.name}
                  </option>
                );
              })}
            </select>
            <select
              disabled={newPoke.types.length === 2 ? true : false}
              name="Types2"
              className={style.select}
              onChange={(e) => {
                let type = e.target.value;
                newPoke.types.includes(type) === false
                  ? newPoke.types.length !== 2
                    ? setNewPoke({
                        ...newPoke,
                        types: [...newPoke.types, type],
                      })
                    : swal("You can only select 2 types!", "", "error")
                  : swal("Select a different Type!", "", "error");
              }}
            >
              <option>Type 2</option>
              {types.map((type, index) => {
                return (
                  <option
                    className={style.option}
                    id={index + 1}
                    value={index + 1}
                  >
                    {type.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={style.submitButton}>
            <input
              disabled={validation()}
              type="submit"
              value="Add To PokeFamily!"
              className={style.inpSubmit}
            />
          </div>
        </form>
      </div>
      <div className={style.containerTypesMuestra}>
        {newPoke.types?.length > 0
          ? newPoke.types.map((type) => {
              return (
                <div className={style.typeMuestra}>
                  <button
                    value={type}
                    onClick={(e) => deleteType(e.target.value)}
                  >
                    X
                  </button>
                  <h3>{showTypes(type)}</h3>
                </div>
              );
            })
          : null}
        <h1 className={style.h1}>Types Selected:</h1>
      </div>
      <img src={fondo} alt="" className={style.fondo} />
    </div>
  );
}

/*<div>
          {input.temperament.length > 0 &&
            input.temperament.map((t) => {
              return <p>{t}</p>;
            })}
        </div>{" "}*/
