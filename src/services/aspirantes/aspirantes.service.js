// Initializes the `aspirantes` service on path `/aspirantes`
const { Aspirantes } = require('./aspirantes.class');
const createModel = require('../../models/aspirantes.model');
const hooks = require('./aspirantes.hooks');

const multer = require('multer');
const multipartMiddleware = multer();

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/aspirantes', multipartMiddleware.single('imagen'), function(req,res,next){
      req.feathers.file = req.file;
      next();
    },
    new Aspirantes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('aspirantes');

  service.hooks(hooks);
};
