import axios from 'axios';
import swal from "sweetalert";

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_ID = 'GET_POKEMON_ID';
export const GET_POKEMON_NAME = 'GET_POKEMON_NAME';
export const GET_TYPES = 'GET_TYPES'
export const POST_POKEMON = 'POST_POKEMON';
export const GET_POKEMONS_BY_TYPES = 'GET_POKEMONS_BY_TYPES';
export const CLEAR_STATES = 'CLEAR_STATES';
export const CREATED_OR_DB = 'CREATED_OR_DB';
export const ORDER_AZ = 'ORDER_AZ';
export const ORDER_STRENGTH = 'ORDER_STRENGTH';


export function getPokemons() {
    console.log('Buscando Pokemons...')
    return function (dispatch) {


        axios.get('http://localhost:3001/pokemons').then((res) => {
            return dispatch({
                type: GET_POKEMONS,
                payload: res.data//Arreglo con pokemons del BackEnd
            })
        }).catch((e) => console.log(e))

    }
}

export function getPokemonsId(id) {
    return async function (dispatch) {

        const pokeId = (await axios.get(`http://localhost:3001/pokemons/${id}`)).data;

        return dispatch({
            type: GET_POKEMON_ID,
            payload: pokeId//Arreglo con detalles del poke id]
        })
    }
}

export function getPokemonName(name) {
    return async function (dispatch) {
        try {
            //console.log(name)
            const pokeName = (await axios.get(`http://localhost:3001/pokemons/?name=${name}`)).data;
            return dispatch({
                type: GET_POKEMON_NAME,
                payload: pokeName //Arreglo con detalle del poke Name
            })
        } catch {
            swal('Poke search fail!', "", "error")
        }
    }
}

export function getTypes() {
    return async function (dispatch) {
        const types = (await axios.get('http://localhost:3001/types')).data;

        return dispatch({
            type: GET_TYPES,
            payload: types, //Arreglo con types
        })
    }
}

export function postPokemon({ name, hp, strength, defense, speed, height, weight, img, types }) {//Destructuring del objeto que te pasan
    //Crear poke en la DB

    //img === "" ? img = "https://i.pinimg.com/originals/84/7b/e7/847be709c5ce344245b6503cacb706ee.png" : null;
    return async function () {
        axios.post('http://localhost:3001/pokemons', {
            name: name,
            hp: hp,
            strength: strength,
            defense: defense,
            speed: speed,
            height: height,
            weight: weight,
            img: img,
            types: types
        })
    }
}

export function getPokemonsByTypes(type) {
    return function (dispatch) {
        //console.log(type)
        return dispatch({
            type: GET_POKEMONS_BY_TYPES,
            payload: type,
        })
    }
}

export function clearStates() {
    return function (dispatch) {
        return dispatch({
            type: CLEAR_STATES,
        })
    }
}

export function createdOrDB(value) {
    return function (dispatch) {
        //console.log('Estoy en actions', value)
        return dispatch({
            type: CREATED_OR_DB,
            payload: value
        })
    }
}

export function orderAZ(order) {
    //console.log('Entre a actions AZ ', value)
    return function (dispatch) {
        return dispatch({
            type: ORDER_AZ,
            payload: order,
        })
    }
}

export function orderStrength(value) {
    //console.log('Entre a actions Strength ', value)
    return function (dispatch) {
        return dispatch({
            type: ORDER_STRENGTH,
            payload: value,
        })
    }
}