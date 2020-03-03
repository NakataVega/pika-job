const { Service } = require('feathers-objection');

exports.Idiomas = class Idiomas extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
