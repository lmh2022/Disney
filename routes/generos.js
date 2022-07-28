var express = require('express');
var router = express.Router();
var generos = require('../controladores/generosControlador')

/* GET home page. */
router.post('/', generos.alta);
router.put('/', generos.modificacion);
router.delete('/:id', generos.baja);
router.get('/', generos.listado);

module.exports = router;
