const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const getAspirantData = (context) => {
  const {email, password, ...aspirante } = context.data
  context.data = { email, password }
  context.params.aspirante = aspirante
}

const createAspirant = async(context) =>{
  const aspirante = await context.app.service('aspirantes').create(context.params.aspirante)
  console.log(aspirante)
  await context.app.service('users').patch(context.result.id, { id_aspirante: aspirante.id })
}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password'), getAspirantData],
    update: [ hashPassword('password'),  authenticate('jwt') ],
    patch: [ hashPassword('password'),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [createAspirant,protect('password')],
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
