const sequelize = require('../bin/conexion');
const Pelicula = require('../modelos/peliculasModelo');
const Personaje = require('../modelos/personajesModelo');
const Genero = require('../modelos/generosModelo');

const { Op } = require("sequelize");

module.exports = {
    alta: async function(req, res, next) {
        try {
                const pelicula = await Pelicula.create({
                    imagen: req.body.imagen,
                    titulo: req.body.titulo,
                    creacion: req.body.creacion,
                    calificacion: req.body.calificacion
                 });

               let genero = await Genero.findOrCreate({where: {nombre: req.body.genero}})  
               pelicula.setGenero(genero[0])

               console.log(pelicula.toJSON());
               res.send('id: '+pelicula.id);    
          } 

        catch(e) {e=>console.log(e); res.json(e.message)}

        }
    ,
    listado: async function(req, res, next) {
        try {
            opciones={where: {titulo: {[Op.not]: null}}};
           // if(Object.keys(req.query).length) {opciones.where={}}
            if(req.query.name) {opciones.where.titulo=req.query.name}
            if(req.query.genre) {opciones.where.generoId=req.query.genre}
            if(req.query.order) {opciones.order=[['creacion', req.query.order]]}
            opciones.include= Genero;
            console.log(opciones)
           const lista = await Pelicula.findAll({attributes: ['imagen', 'titulo','creacion'], opciones})
           
            res.json(lista)
        } 
        catch (e) {e=>console.log(e); res.json(e.message)}
    },
    baja: async function(req, res, next) {
        try {
            await Pelicula.destroy({ where: { id: req.params.id } });
            res.send('Se ha eliminado el registro con id: '+req.params.id);  
        } 
        catch (e) {e=>console.log(e); res.json(e.message)}
    },
    modificacion: async function(req, res, next) {
        try {
            await Pelicula.update({
                imagen: req.body.imagen,
                titulo: req.body.titulo,
                creacion: req.body.creacion,
                calificacion: req.body.calificacion
             },{where: {id:req.body.id}});
            res.send('Se ha modificado el registro');  
        } 
        catch (e) {e=>console.log(e); res.json(e.message)}
    },
    detalle: async function(req, res, next) {
        try {
            const det = await Pelicula.findAll({
                where: {id: req.params.id},
                include: {model: Personaje, through: {attributes:[]}}
            })
            res.json(det)
        } 
        catch (e) {e=>console.log(e); res.json(e.message)}
    }
}