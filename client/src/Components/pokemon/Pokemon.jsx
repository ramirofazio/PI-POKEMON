import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Pokemon.module.css";

export default function Pokemon({ id, name, img, types }) {
  //console.log("ENTRE A POKEMON");

  //----------------MAPEAR TYPES DE DB-------------------RAROOOOoooooO-----------
  let nuevosTypes = [];
  if (id.length > 15) {
    types.filter((type) => nuevosTypes.push(type.name));
    //console.log(nuevosTypes);
  }

  //console.log("Estoy en Pokemon", "Soy ", name + "Fijate esto-> ", types);

  return (
    <div class={style.container}>
      <NavLink className={style.navLink} to={`/details/${id}`}>
        <span class={style.title}>
          {name.slice(0, 1).toUpperCase() + name.slice(1, name.length)}
        </span>
        <img src={img} alt="" class={style.img} />
        <p class={style.types}>
          {id < 800
            ? "Types: " + types.join(", ")
            : "Types: " + nuevosTypes.join(", ")}
        </p>
      </NavLink>
    </div>
  );
}
