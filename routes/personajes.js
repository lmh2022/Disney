var express = require('express');
var router = express.Router();
var personajes = require('../controladores/personajesControlador')

/* GET home page. */

router.post('/', personajes.alta);
router.put('/', personajes.modificacion);
router.delete('/:id', personajes.baja);
router.get('/:id', personajes.detalle);
router.get('/', personajes.listado);


module.exports = router;
