// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const moment = require('moment');

class cursos extends Model {

  static get tableName() {
    return 'cursos';
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

  db.schema.hasTable('cursos').then(exists => {
    if (!exists) {
      db.schema.createTable('cursos', table => {
        table.increments('id');
        table.integer('id_user').unsigned().notNullable();
        table.foreign('id_user').references('id').inTable('aspirantes');
        table.string('nombre_curso');
        table.string('institucion');
        table.date('fecha_inicio');
        table.date('fecha_fin');
        table.integer('duracion');
        table.string('descripcion');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created cursos table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating cursos table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating cursos table', e)); // eslint-disable-line no-console

  return cursos;
};
