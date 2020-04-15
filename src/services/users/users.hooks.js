const { authenticate } = require('@feathersjs/authentication').hooks;

const { BadRequest } = require('@feathersjs/errors')

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const getDataByUserType = (context) => {
  const {email, password, userType, ...data } = context.data
  context.data = { email, password }
  if (userType === 'organizacion'){
    context.params.organizacion = data;
  } else {
    context.params.aspirante = data;
  }
}

const validateUniqueEmail = async(context) => {
  const aspirante = await context.app.service('users').find({
    query: { $limit: 1, email: context.data.email },
    paginate: false
  })
  if (aspirante && aspirante.length){
    console.log(aspirante);
    throw new BadRequest('Unique Key Already Exists', {
      errors: { email: 'Ya existe un usuario con ese email registrado' }
    });
  }
}

const createUserByType = async(context) =>{
  if (context.params.aspirante){
    const aspirante = await context.app.service('aspirantes').create(context.params.aspirante);
    console.log(aspirante);
    await context.app.service('users').patch(context.result.id, { id_aspirante: aspirante.id });
    context.result.id_aspirante = aspirante.id;
  } else {
    const organizacion = await context.app.service('organizaciones').create(context.params.organizacion);
    console.log(organizacion);
    await context.app.service('users').patch(context.result.id, { id_organizacion: organizacion.id });
    context.result.id_organizacion = organizacion.id;
  }
  context.params.aspirante = null;
  context.params.organizacion = null;
}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password'), validateUniqueEmail, getDataByUserType],
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
    create: [createUserByType,protect('password')],
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
