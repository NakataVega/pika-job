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
      required: ['nombre_vacante'],

      properties: {
        text: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const Organizaciones = require('./organizaciones.model.js')
    return {
      organizacion: {
        relation: Model.BelongsToOneRelation,
        modelClass: Organizaciones,
        join: {
          to: 'organizaciones.id',
          from: 'vacantes.id_organizacion'
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
  return vacantes;
};
