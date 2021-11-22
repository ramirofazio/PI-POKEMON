import {
    CLEAR_STATES,
    GET_POKEMONS,
    GET_POKEMON_ID,
    GET_POKEMON_NAME,
    GET_TYPES,
    POST_POKEMON,
    GET_POKEMONS_BY_TYPES,
    CREATED_OR_DB,
    ORDER_AZ,
    ORDER_STRENGTH,
} from "../actions";

//----------ESTADO INICIAL------------------
let initialState = {
    pokemons: [],
    allPokemons: [],
    pokemonDetail: [],
    types: [],
    pokemonsBuscados: null,
}

//-----------------------REDUCER--------------------------
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POKEMONS:
            console.log('Pokemones Cargados!')
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
            }
        case GET_POKEMON_ID:
            return {
                ...state,
                pokemonDetail: action.payload,
            }
        case GET_POKEMON_NAME:
            //console.log('Estoy en reducer: ', action.payload)    
            let poke = action.payload;
            //console.log(poke)
            return {
                ...state,
                pokemonsBuscados: poke
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload,
            }
        case GET_POKEMONS_BY_TYPES:
            let type = action.payload;
            //console.log("Estoy en reducer " + type)
            let allPokemons = state.allPokemons;

            const mapTypes = (types, id) => {
                //console.log(types, id)
                if (id.length > 5) {//BASE DE DATOS
                    let respuesta = types.map((obj) => obj.name)
                    return respuesta.includes(type)
                }
                return types.includes(type);
            }

            let pokesByTypes = type === 'allTypes' ?
                allPokemons :
                allPokemons.filter((poke) => mapTypes(poke.types, poke.id))
            //console.log(pokesByTypes)

            return {
                ...state,
                pokemons: pokesByTypes,
            }
        case CLEAR_STATES:
            console.log('Pokemons Re-Loaded')
            return {
                ...state,
                pokemonDetail: [],
                pokemonsBuscados: null,
                //pokemons: state.allPokemons,
                pokemons: Object.assign([], state.allPokemons)
            }
        case CREATED_OR_DB:
            //console.log('Estoy en reducer', action.payload)
            if (action.payload === 'allPokemons') {
                //console.log('ESTOY EN FILTRO ALLPOKES')

                return {
                    ...state,
                    pokemons: state.allPokemons
                }
            }
            if (action.payload === 'api') {
                //console.log('ESTOY EN FILTRO API')

                const allPokes = state.allPokemons;
                const respuesta = allPokes.filter((poke) => poke.id < 800)
                return {
                    ...state,
                    pokemons: respuesta,
                }
            }
            if (action.payload === 'DB') {
                //console.log('ESTOY EN FILTRO DB')

                const allPokes = state.allPokemons;
                const respuesta = allPokes.filter((poke) => poke.id.length > 15)
                //console.log(respuesta)
                return {
                    ...state,
                    pokemons: respuesta,
                }
            }
        case ORDER_AZ:

            let arrayOrder = action.payload === 'az' ? state.pokemons.sort((a, b) => {
                if (a.name > b.name) return 1;
                else if (b.name > a.name) return -1;
                else return 0;
            }) :
                state.pokemons.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    else if (b.name > a.name) return 1;
                    else return 0;
                })
            return {
                ...state,
                pokemons: arrayOrder
            }


        case ORDER_STRENGTH:
            //console.log(action.payload)
            let arrayStrengthOrder = action.payload === 'strength+-' ? state.pokemons.sort((a, b) => {
                if (a.strength < b.strength) return 1;
                else if (b.strength < a.strength) return -1;
                else return 0;
            }) :
                state.pokemons.sort((a, b) => {
                    if (a.strength < b.strength) return -1;
                    else if (b.strength < a.strength) return 1;
                    else return 0;
                })
            return {
                ...state,
                pokemons: arrayStrengthOrder,
            }
        default:
            return state;
    }
}

export default rootReducer;