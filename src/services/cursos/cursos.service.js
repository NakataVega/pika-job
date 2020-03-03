// Initializes the `cursos` service on path `/cursos`
const { Cursos } = require('./cursos.class');
const createModel = require('../../models/cursos.model');
const hooks = require('./cursos.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cursos', new Cursos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cursos');

  service.hooks(hooks);
};
