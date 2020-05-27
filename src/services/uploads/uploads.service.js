const { Uploads } = require('./uploads.class');
const hooks = require('./uploads.hooks');

const blobService = require('feathers-blob');

const fs = require('fs-blob-store');

const multer = require('multer');
const multipartMiddleware = multer();

const blobStorage = fs('./uploads');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  app.use('/uploads',
    multipartMiddleware.single('uri'),

    function(req,res,next){
        req.feathers.file = req.file;
        next();
        console.log(req.file);
    },
    blobService({Model: blobStorage})
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('uploads');

  service.hooks(hooks);
};
