// Initializes the `organizaciones` service on path `/organizaciones`
const { Organizaciones } = require('./organizaciones.class');
const createModel = require('../../models/organizaciones.model');
const hooks = require('./organizaciones.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$eager'],
    allowedEager: 'vacantes'
  };

  // Initialize our service with any options it requires
  app.use('/organizaciones', new Organizaciones(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('organizaciones');

  service.hooks(hooks);
};
