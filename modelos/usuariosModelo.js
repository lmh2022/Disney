const sequelize = require('../bin/conexion')
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class Usuario extends Model {}

Usuario.init({
  nombre: {type: DataTypes.STRING, unique: true, allowNull: false},
  email: {type: DataTypes.STRING, unique: true, allowNull: false, validate: {isEmail:true}},
  password: {type: DataTypes.STRING, allowNull: false}
}, { sequelize, modelName: 'usuario', timestamps: false });

Usuario.beforeCreate(async (user, options) => {
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  user.password = hashedPassword;
});


module.exports= Usuario