const users = require('./users/users.service.js');
const aspirantes = require('./aspirantes/aspirantes.service.js');
const organizaciones = require('./organizaciones/organizaciones.service.js');
const experienciasLaborales = require('./experiencias-laborales/experiencias-laborales.service.js');
const formacionesAcademicas = require('./formaciones-academicas/formaciones-academicas.service.js');
const idiomas = require('./idiomas/idiomas.service.js');
const cursos = require('./cursos/cursos.service.js');
const vacantes = require('./vacantes/vacantes.service.js');
const postulaciones = require('./postulaciones/postulaciones.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(aspirantes);
  app.configure(organizaciones);
  app.configure(experienciasLaborales);
  app.configure(formacionesAcademicas);
  app.configure(idiomas);
  app.configure(cursos);
  app.configure(vacantes);
  app.configure(postulaciones);
};
