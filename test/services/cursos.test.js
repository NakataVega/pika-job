const app = require('../../src/app');

describe('\'cursos\' service', () => {
  it('registered the service', () => {
    const service = app.service('cursos');
    expect(service).toBeTruthy();
  });
});
