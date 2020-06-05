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
      required: ['id_aspirante','id_vacante'],

      properties: {
        text: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const Aspirantes = require('./aspirantes.model.js')
    const Vacantes = require('./vacantes.model.js')
    return {
      aspirante: {
        relation: Model.BelongsToOneRelation,
        modelClass: Aspirantes,
        join: {
          to: 'aspirantes.id',
          from: 'postulaciones.id_aspirante'
        }
      },
      vacante: {
        relation: Model.BelongsToOneRelation,
        modelClass: Vacantes,
        join: {
          to: 'vacantes.id',
          from: 'postulaciones.id_vacante'
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
  return postulaciones;
};
