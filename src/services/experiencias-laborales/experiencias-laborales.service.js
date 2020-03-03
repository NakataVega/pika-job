// Initializes the `experiencias-laborales` service on path `/experiencias-laborales`
const { ExperienciasLaborales } = require('./experiencias-laborales.class');
const createModel = require('../../models/experiencias-laborales.model');
const hooks = require('./experiencias-laborales.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/experiencias-laborales', new ExperienciasLaborales(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('experiencias-laborales');

  service.hooks(hooks);
};
