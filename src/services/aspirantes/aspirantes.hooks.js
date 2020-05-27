const { authenticate } = require('@feathersjs/authentication').hooks;
const dauria = require('dauria');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      async function(context) {
        if (!context.data.imagen && context.params.file){
          const file = context.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          const imagen = await context.app.services.uploads.create({uri})
          context.data.imagen = imagen.id
        }
      }
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
