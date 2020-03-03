const { Service } = require('feathers-objection');

exports.FormacionesAcademicas = class FormacionesAcademicas extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
