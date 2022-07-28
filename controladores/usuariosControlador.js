const sequelize = require('../bin/conexion');
const Usuario = require('../modelos/usuariosModelo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const enviarMail= require('../utils/enviarMail')

module.exports = {
    alta: async function(req, res, next) {
        try {
                    const usuario = await Usuario.create({
                    nombre: req.body.nombre,
                    email: req.body.email,
                    password: req.body.password
                });
                res.send('Usuario registrado correctamente: '+ req.body.email);
                let destinatario = req.body.email;
                enviarMail(destinatario).catch(console.error);

          } 

        catch(e) {e=>console.log(e); res.json(e.message)}
        },
        login: async function(req, res, next) {
            try {
                 const usuario = await Usuario.findOne({where: {email: req.body.email}});
                 if(!usuario) {
                     res.json({error: true, message: "Email incorrecto"})
                     return
                 } 
                 
                 if(bcrypt.compareSync(req.body.password, usuario.password)) {
                    const token = jwt.sign({userId: usuario.id}, "disney2022", {expiresIn: "1h"}) 
                    res.json({error: false, token})
                    return

                 } else {
                    res.json({error: true, message: "Password incorrecto"})
                    return
                 }


                 }

              
            catch(e) {e=>console.log(e); res.json(e.message)}
    
            }
}