// Initializes the `idiomas` service on path `/idiomas`
const { Idiomas } = require('./idiomas.class');
const createModel = require('../../models/idiomas.model');
const hooks = require('./idiomas.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/idiomas', new Idiomas(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('idiomas');

  service.hooks(hooks);
};
