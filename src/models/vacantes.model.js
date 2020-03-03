// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const moment = require('moment');

class vacantes extends Model {

  static get tableName() {
    return 'vacantes';
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

  db.schema.hasTable('vacantes').then(exists => {
    if (!exists) {
      db.schema.createTable('vacantes', table => {
        table.increments('id');
        table.integer('id_organizacion').unsigned().notNullable();
        table.foreign('id_organizacion').references('id').inTable('organizaciones');
        table.integer('activo');
        table.string('nombre_vacante');
        table.text('horario');
        table.float('sueldo');
        table.text('descripcion');
        table.string('escolaridad');
        table.text('requisitos0');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created vacantes table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating vacantes table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating vacantes table', e)); // eslint-disable-line no-console

  return vacantes;
};
