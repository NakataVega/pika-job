// Initializes the `aspirantes` service on path `/aspirantes`
const { Aspirantes } = require('./aspirantes.class');
const createModel = require('../../models/aspirantes.model');
const hooks = require('./aspirantes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/aspirantes', new Aspirantes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('aspirantes');

  service.hooks(hooks);
};
