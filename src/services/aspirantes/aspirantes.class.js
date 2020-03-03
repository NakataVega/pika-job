const { Service } = require('feathers-objection');

exports.Aspirantes = class Aspirantes extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
