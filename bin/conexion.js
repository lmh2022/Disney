const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/disney.sqlite'
  });

 // (async()=>{await sequelize.sync({ force: false });})();

module.exports= sequelize;