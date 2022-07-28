const Pelicula = require('../modelos/peliculasModelo');
const Personaje = require('../modelos/personajesModelo');
const Genero = require('../modelos/generosModelo');

Personaje.belongsToMany(Pelicula, { through: 'PersonajesPeliculas' })
Pelicula.belongsToMany(Personaje, { through: 'PersonajesPeliculas' })

Genero.hasMany(Pelicula)
Pelicula.belongsTo(Genero)

//Sincronizo los modelos individualmente para que me tome la foreign key
//https://stackoverflow.com/questions/65748750/sequelize-associations-not-generating-foreign-key

//Pelicula.sync({ force: true }).then(()=>Personaje.sync({ force: true }))

