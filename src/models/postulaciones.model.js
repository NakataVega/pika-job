// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const moment = require('moment');

class postulaciones extends Model {

  static get tableName() {
    return 'postulaciones';
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

  db.schema.hasTable('postulaciones').then(exists => {
    if (!exists) {
      db.schema.createTable('postulaciones', table => {
        table.increments('id');
        table.integer('id_aspirante').unsigned().notNullable();
        table.foreign('id_aspirante').references('id').inTable('aspirantes');
        table.integer('id_vacante').unsigned().notNullable();
        table.foreign('id_vacante').references('id').inTable('vacantes');
        table.date('fecha_postu');
        table.integer('status');
        table.text('nota');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created postulaciones table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating postulaciones table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating postulaciones table', e)); // eslint-disable-line no-console

  return postulaciones;
};
