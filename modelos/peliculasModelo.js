const sequelize = require('../bin/conexion')
const { Model, DataTypes } = require('sequelize');

class Pelicula extends Model {}

Pelicula.init({
  imagen: DataTypes.STRING,
  titulo: {type: DataTypes.STRING, unique: true, allowNull: false, validate: {notEmpty: true}},
  creacion: DataTypes.DATE,
  calificacion: {type: DataTypes.INTEGER, validate: {min: 1, max: 5}}
}, { sequelize, modelName: 'pelicula', timestamps: false });



module.exports= Pelicula