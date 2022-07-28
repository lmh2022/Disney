const sequelize = require('../bin/conexion');
const Genero = require('../modelos/generosModelo');
const { Op } = require("sequelize");

module.exports = {
    alta: async function(req, res, next) {
        try {
                    const genero = await Genero.create({
                    nombre: req.body.nombre,
                    imagen: req.body.imagen
                });

                console.log(genero.toJSON());
                res.send('id: '+genero.id);    
          } 

        catch(e) {e=>console.log(e); res.json(e.message)}

        },
    listado: async function(req, res, next) {
        try {
            const lista = await Genero.findAll()
            res.json(lista)
        } 
        catch (e) {e=>console.log(e); res.json(e.message)}
    },
    baja: async function(req, res, next) {
        try {
            await Genero.destroy({ where: { id: req.params.id } });
            res.send('Se ha eliminado el registro con id: '+req.params.id);  
        } 
        catch (e) {e=>console.log(e); res.json(e.message)}
    },
    modificacion: async function(req, res, next) {
        try {
            await Genero.update({
                nombre: req.body.nombre,
                imagen: req.body.imagen
            },{where: {id: req.body.id}});
            res.send('Se ha modificado el registro');  
        } 
        catch (e) {e=>console.log(e); res.json(e.message)}
    }
}