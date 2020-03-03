const { Service } = require('feathers-objection');

exports.Cursos = class Cursos extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
