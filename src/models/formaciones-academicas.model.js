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
      required: ['titulo_formacion','institucion','fecha_inicio'],

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
  return formacionesAcademicas;
};
