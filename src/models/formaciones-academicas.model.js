// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const moment = require('moment');

class formacionesAcademicas extends Model {

  static get tableName() {
    return 'formaciones_academicas';
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

  db.schema.hasTable('formaciones_academicas').then(exists => {
    if (!exists) {
      db.schema.createTable('formaciones_academicas', table => {
        table.increments('id');
        table.integer('id_user').unsigned().notNullable();
        table.foreign('id_user').references('id').inTable('aspirantes');
        table.string('titulo_formacion');
        table.string('institucion');
        table.date('fecha_inicio');
        table.date('fecha_fin');
        table.integer('certificado');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created formaciones_academicas table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating formaciones_academicas table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating formaciones_academicas table', e)); // eslint-disable-line no-console

  return formacionesAcademicas;
};
