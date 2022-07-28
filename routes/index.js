var express = require('express');
var router = express.Router();
const sequelize=require('../bin/conexion');

(async()=>{await sequelize.sync({ force: false });})();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Alkemy' });
});

module.exports = router;
