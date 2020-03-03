const { Service } = require('feathers-objection');

exports.Postulaciones = class Postulaciones extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
