// Initializes the `formaciones-academicas` service on path `/formaciones-academicas`
const { FormacionesAcademicas } = require('./formaciones-academicas.class');
const createModel = require('../../models/formaciones-academicas.model');
const hooks = require('./formaciones-academicas.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/formaciones-academicas', new FormacionesAcademicas(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('formaciones-academicas');

  service.hooks(hooks);
};
