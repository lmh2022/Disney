const sequelize = require('../bin/conexion')
const { Model, DataTypes } = require('sequelize');

class Personaje extends Model {}

Personaje.init({
  imagen: DataTypes.STRING,
  nombre: {type: DataTypes.STRING, unique: true, allowNull: false, validate: {notEmpty: true}},
  edad: DataTypes.INTEGER,
  peso: DataTypes.DECIMAL,
  historia: DataTypes.TEXT
}, { sequelize, modelName: 'personaje', timestamps: false });


module.exports= Personaje