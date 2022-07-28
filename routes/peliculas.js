var express = require('express');
var router = express.Router();
var peliculas = require('../controladores/peliculasControlador')

/* GET home page. */

router.post('/', peliculas.alta);
router.put('/', peliculas.modificacion);
router.delete('/:id', peliculas.baja);
router.get('/:id', peliculas.detalle);
router.get('/', peliculas.listado);


module.exports = router;
