var express = require('express');
var router = express.Router();
var usuarios = require('../controladores/usuariosControlador')
/* GET users listing. */



router.post('/register', usuarios.alta);
router.post('/login', usuarios.login);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
