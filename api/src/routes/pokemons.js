const express = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../db");

const server = express();
server.use(express.json());

function showTypes(arr) {//arr = [{2},{2}]
    const types = []
    arr.map((ty) => types.push(ty.type.name))
    //console.log(types)
    return types;
}

function mapTypes(arr) {//arr = [{},{},{}]
    console.log(arr)
    return arr.map(type => {
        return {
            name: type.name,
            id: Number(type.id)
        }
    })
}

//ARRANCA RUTAS

server.get('/', async (req, res, next) => { //GET POKEMONS --> CON O SIN QUERYS NAME
    const queryName = req.query.name;
    //console.log(queryName);

    if (!queryName) {//SI NO ME PASAN QUERYNAME DEVUELVO LOS de la API + lo de la DB

        try {
            console.log("ENTRE A GET 40P API");


            //---------------------------------ESTO TARDA COMO 40 SEGUNDOS----------------------------------------
            // const pokeList = (await axios
            //     .get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40')).data.results;
            // //traigo 20 pokes [{name: name, url: +datos de ese poke}, {}, {}]
            // //console.log(pokeList)
            // let poke = [];
            // for (let p of pokeList) {
            //     poke.push(await axios.get(p.url));
            // }
            // //console.log(poke)
            // let dataHomePokes = poke.map((poke) => {
            //     //console.log(poke.data.types)
            //     return {
            //         id: poke.data.id,
            //         name: poke.data.name,
            //         img: poke.data.sprites.other.dream_world.front_default || 'https://raw.githubusercontent.com/itsjavi/pokemon-assets/master/assets/svg/pokeball.svg',
            //         types: showTypes(poke.data.types),
            //     };
            // });
            //console.log(dataHomePokes);

            //--------------------------------ESTO TARDA 3 SEGUNDOS MAX *carita de anteojitos*-------------------------
            let totalPokemonApi = [];

            let urlArr = [];//Promesas pendientes

            for (let i = 1; i <= 50; i++) {
                urlArr = [...urlArr, axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)];
            }

            await axios.all(urlArr).then(//resuelve todas las promesas
                axios.spread((...responses) => {//agarra una por una y arma cada pokemon 
                    responses.forEach((res) => {
                        result = res.data
                        pokemon = {
                            id: result.id,
                            name: result.name,
                            strength: result.stats[1].base_stat,
                            img: result.sprites.other.dream_world.front_default || 'https://raw.githubusercontent.com/itsjavi/pokemon-assets/master/assets/svg/pokeball.svg',
                            types: showTypes(result.types),
                        };
                        //console.log(pokemon.name, pokemon.strength)
                        totalPokemonApi = [...totalPokemonApi, pokemon]
                    })
                })
            )

            const pokeListDB = await Pokemon.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Type
                }
            })

            const totalPokemon = totalPokemonApi.concat(pokeListDB)

            //console.log(pokeListDB)

            return res.send(totalPokemon);
        } catch (err) {

            return res.status(404).send("No se encontro un Pokemon con ese nombre")

        }



    }; //SI ME PASAN QUERY NAME


    try {//      LOGICA PARA BUSCAR EN LA DB
        console.log("ENTRE A NAME DB");
        //console.log(queryName)
        const datosPokeDB = await Pokemon.findAll({
            where: {
                name: queryName
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            include: {
                model: Type
            }
        })



        //console.log(datosPokeDB);

        if (datosPokeDB.length < 1) { //Si la DB no devolvio nada entro 
            console.log("ENTRE A API NAME")
            //console.log(queryName)
            const poke = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${queryName}`)).data;
            //console.log(poke);
            return res.send({ //manda la info del pokemon con ese id
                id: poke.id,
                name: queryName,
                hp: poke.stats[0].base_stat,
                strength: poke.stats[1].base_stat,
                defense: poke.stats[2].base_stat,
                speed: poke.stats[5].base_stat,
                height: poke.height,
                weight: poke.weight,
                img: poke.sprites.other.dream_world.front_default || 'https://raw.githubusercontent.com/itsjavi/pokemon-assets/master/assets/svg/pokeball.svg',
                types: showTypes(poke.types)
            });

        } else {

            return res.send(datosPokeDB)

        }

    } catch (err) {

        return res.status(404).send("No se encontro un Pokemon con ese nombre")

    }

});


server.get("/:id", async (req, res, next) => { //GET POKEMONS --> CON PARAMS ID
    const paramId = req.params.id;

    //console.log(paramId);

    if (paramId < 898) {//el id es un pokemon de la API
        console.log("ENTRE A GET ID API");
        //console.log(paramId)
        try {

            const poke = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${paramId}`)).data;
            //console.log(poke)
            return res.json({ //manda la info del pokemon con ese id
                id: paramId,
                name: poke.name,
                hp: poke.stats[0].base_stat,
                strength: poke.stats[1].base_stat,
                defense: poke.stats[2].base_stat,
                speed: poke.stats[5].base_stat,
                height: poke.height,
                weight: poke.weight,
                img: poke.sprites.other.dream_world.front_default || poke.sprites.other.home.front_default,
                types: showTypes(poke.types)
            });

        } catch (err) {

            return res.status(404).send("No se encontro un Pokemon con ese ID")

        }

    } else {//el id esta en la DB

        try {
            console.log('ENTRE A GET DATABASE ID');

            let pokemon = (await Pokemon.findByPk(paramId, { //Busco la PK en la DB
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Type
                }
            })).toJSON()

            //console.log(pokemon.types)

            pokemon = { ...pokemon, types: mapTypes(pokemon.types) }
            return res.send(pokemon)

        } catch (err) {

            return res.status(404).send("No se encontro un Pokemon con ese ID")

        }

    }

});

server.post('/', async (req, res, next) => {
    console.log("ENTRE A POST POKEMON");
    const { name, hp, strength, defense, height, weight, speed, img, types } = req.body;

    try {
        const poke = await Pokemon.create({//creo un nuevo pokemon con los datos traídos
            name,
            hp,
            strength,
            defense,
            height,
            weight,
            speed,
            img,
        })

        await poke.addType(types)//agrego a la tabla intermedia el id de typo y el id del poke 

        const id = poke.id;

        let pokeTypes = (await Pokemon.findByPk(id, {
            attributes: {
                exclude: ['hp', 'strength', 'defense', 'height', 'weight', 'speed', 'img', 'createdAt', 'updatedAt']
            },
            include: {
                model: Type
            }
        })).toJSON()

        pokeTypes = { ...pokeTypes, types: mapTypes(pokeTypes.types) }

        console.log("POKE CREADO")
        return res.status(201).send(pokeTypes)

    } catch (err) {

        return res.status(404).send("No se pudo crear el Pokemon")

    }

});


module.exports = server;



/*
[
    pokemon {
        dataValues: {
            id: 'ce441b46-975b-4e96-af86-405430906f48',
            name: 'ramiro',
            hp: 99,
            strength: 50.8,
            defense: 90,
            speed: 20,
            height: 19,
            weight: 50,
            img: null,
            createdAt: 2021 - 10 - 29T18: 26: 15.607Z,
            updatedAt: 2021 - 10 - 29T18: 26: 15.607Z
        },
        _previousDataValues: {
            id: 'ce441b46-975b-4e96-af86-405430906f48',
            name: 'ramiro',
            hp: 99,
            strength: 50.8,
            defense: 90,
            speed: 20,
            height: 19,
            weight: 50,
            img: null,
            createdAt: 2021 - 10 - 29T18: 26: 15.607Z,
            updatedAt: 2021 - 10 - 29T18: 26: 15.607Z
        },
        _changed: Set {},
    _options: {
        isNewRecord: false,
        _schema: null,
        _schemaDelimiter: '',
        raw: true,
        attributes: [Array]
    },
    isNewRecord: false
  }
]

poke.pokemon

*/