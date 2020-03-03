const { Service } = require('feathers-objection');

exports.Organizaciones = class Organizaciones extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
