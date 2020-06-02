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
      required: [],

      properties: {
        text: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const Vacantes = require('./vacantes.model.js')
    return {
      vacantes: {
        relation: Model.HasManyRelation,
        modelClass: Vacantes,
        join: {
          from: 'organizaciones.id',
          to: 'vacantes.id_organizacion'
        }
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
  return organizaciones;
};
