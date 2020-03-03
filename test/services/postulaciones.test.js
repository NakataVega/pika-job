const app = require('../../src/app');

describe('\'postulaciones\' service', () => {
  it('registered the service', () => {
    const service = app.service('postulaciones');
    expect(service).toBeTruthy();
  });
});
