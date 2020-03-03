const { Service } = require('feathers-objection');

exports.ExperienciasLaborales = class ExperienciasLaborales extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
