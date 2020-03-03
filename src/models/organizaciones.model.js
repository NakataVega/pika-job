// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const moment = require('moment');

class organizaciones extends Model {

  static get tableName() {
    return 'organizaciones';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text'],

      properties: {
        text: { type: 'string' }
      }
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  $beforeUpdate() {
    this.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
  }
}

module.exports = function (app) {
  const db = app.get('knex');

  db.schema.hasTable('organizaciones').then(exists => {
    if (!exists) {
      db.schema.createTable('organizaciones', table => {
        table.increments('id');
        table.string('nombre_orga');
        table.string('rfc');
        table.text('domicilio');
        table.text('descripcion');
        table.string('nombre_reclutador');
        table.string('correo_reclutador');
        table.string('password');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created organizaciones table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating organizaciones table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating organizaciones table', e)); // eslint-disable-line no-console

  return organizaciones;
};
