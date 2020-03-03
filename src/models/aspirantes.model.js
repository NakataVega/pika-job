// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const moment = require('moment');

class aspirantes extends Model {

  static get tableName() {
    return 'aspirantes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['correo'],

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

  db.schema.hasTable('aspirantes').then(exists => {
    if (!exists) {
      db.schema.createTable('aspirantes', table => {
        table.increments('id');
        table.string('apellido_paterno');
        table.string('apellido_materno');
        table.string('nombre');
        table.string('correo');
        table.string('password');
        table.string('carrera');
        table.date('fecha_naci');
        table.string('ciudad_naci');
        table.string('estado_naci');
        table.string('pais_naci');
        table.string('ciudad_resi');
        table.string('estado_resi');
        table.string('pais_resi');
        table.string('telefono1');
        table.string('telefono2');
        table.text('descripcion');
        table.text('conocimientos');
        table.text('referencias');

        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created aspirantes table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating aspirantes table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating aspirantes table', e)); // eslint-disable-line no-console

  return aspirantes;
};
