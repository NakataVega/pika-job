// Initializes the `vacantes` service on path `/vacantes`
const { Vacantes } = require('./vacantes.class');
const createModel = require('../../models/vacantes.model');
const hooks = require('./vacantes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/vacantes', new Vacantes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('vacantes');

  service.hooks(hooks);
};
