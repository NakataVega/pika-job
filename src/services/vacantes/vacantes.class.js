const { Service } = require('feathers-objection');

exports.Vacantes = class Vacantes extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
