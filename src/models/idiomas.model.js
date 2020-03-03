// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const moment = require('moment');

class idiomas extends Model {

  static get tableName() {
    return 'idiomas';
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

  db.schema.hasTable('idiomas').then(exists => {
    if (!exists) {
      db.schema.createTable('idiomas', table => {
        table.increments('id');
        table.integer('id_user').unsigned().notNullable();
        table.foreign('id_user').references('id').inTable('aspirantes');
        table.string('idioma');
        table.float('porcentaje');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created idiomas table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating idiomas table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating idiomas table', e)); // eslint-disable-line no-console

  return idiomas;
};
