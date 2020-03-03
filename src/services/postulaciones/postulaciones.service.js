// Initializes the `postulaciones` service on path `/postulaciones`
const { Postulaciones } = require('./postulaciones.class');
const createModel = require('../../models/postulaciones.model');
const hooks = require('./postulaciones.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/postulaciones', new Postulaciones(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('postulaciones');

  service.hooks(hooks);
};
