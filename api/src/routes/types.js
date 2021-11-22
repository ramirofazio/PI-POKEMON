const express = require("express");
const { Type } = require("../db");

const server = express();

server.get('/', async (req, res, next) => {
    console.log("ENTRE A TYPES")

    try {

        const types = await Type.findAll({//traigo los tipos de la base de datos para validar que se crearon bien 
            attributes: ['name', 'id'],
        })

        //console.log(respuesta)z

        return res.send(types)//respondo los datos

    } catch (err) {

        return res.status(500).send('Error: ', err)

    }

})

module.exports = server;