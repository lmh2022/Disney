const sequelize = require('../bin/conexion')
const { Model, DataTypes } = require('sequelize');

class Genero extends Model {}

Genero.init({
  nombre: {type: DataTypes.STRING, unique: false, allowNull: false, validate: {notEmpty: true}},
  imagen: DataTypes.STRING,
}, { sequelize, modelName: 'genero', timestamps: false });



module.exports= Genero