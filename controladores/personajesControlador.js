const sequelize = require('../bin/conexion');
const Personaje = require('../modelos/personajesModelo');
const Pelicula = require('../modelos/peliculasModelo');
const { Op } = require("sequelize");

module.exports = {
    alta: async function(req, res, next) {
        try {
                    const personaje = await Personaje.create({
                    imagen: req.body.imagen,
                    nombre: req.body.nombre,
                    edad: req.body.edad,
                    peso: req.body.peso,
                    historia: req.body.historia
                });

                let pelicula=[]
                for (p in req.body.peliculas) {
                    pelicula[p] = await Pelicula.findOrCreate({where: {titulo: req.body.peliculas[p]}})
                }

                for (i in pelicula) {
                    personaje.addPelicula(pelicula[i][0])
                }
                

                console.log(personaje.toJSON());
                res.send('id: '+personaje.id);    
          } 

        catch(e) {e=>console.log(e); res.json(e.message)}

        },
    listado: async function(req, res, next) {
        try {
            filtro={}; filtroPeliculas={}
            if(req.query.name) {filtro.nombre=req.query.name}
            if(req.query.age) {filtro.edad=req.query.age}
            if(req.query.weight) {filtro.peso=req.query.weight}
            if(req.query.movies) {filtroPeliculas={id: req.query.movies}}

            const lista = await Personaje.findAll({attributes: ['imagen', 'nombre'], where: filtro
            })
            res.json(lista)
        } 
        catch (e) {e=>console.log(e); res.json(e.message)}
    },
    baja: async function(req, res, next) {
        try {
            await Personaje.destroy({ where: { id: req.params.id } });
            res.send('Se ha eliminado el registro con id: '+req.params.id);  
        } 
        catch (e) {e=>console.log(e)}
    },
    modificacion: async function(req, res, next) {
        try {
            await Personaje.update({
                imagen: req.body.imagen,
                nombre: req.body.nombre,
                edad: req.body.edad,
                peso: req.body.peso,
                historia: req.body.historia},
                {where: {id:req.body.id}}
            );
            res.send('Se ha modificado el registro');  
        } 
        catch (e) {e=>console.log(e); res.json(e.message)}
    },
    detalle: async function(req, res, next) {
        try {
            const det = await Personaje.findOne({
                where: {id: req.params.id}, 
                include: {model: Pelicula, through: {attributes:[]}}
            })
            res.json(det)
        } 
        catch (e) {e=>console.log(e); res.json(e.message)}
    }
}