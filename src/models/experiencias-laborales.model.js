// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const moment = require('moment');

class experienciasLaborales extends Model {

  static get tableName() {
    return 'experiencias_laborales';
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

  db.schema.hasTable('experiencias_laborales').then(exists => {
    if (!exists) {
      db.schema.createTable('experiencias_laborales', table => {
        table.increments('id');
        table.integer('id_user').unsigned().notNullable();
        table.foreign('id_user').references('id').inTable('aspirantes');
        table.string('titulo_expe');
        table.string('organizacion');
        table.date('fecha_inicio');
        table.date('fecha_fin');
        table.text('actividades');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created experiencias_laborales table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating experiencias_laborales table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating experiencias_laborales table', e)); // eslint-disable-line no-console

  return experienciasLaborales;
};
