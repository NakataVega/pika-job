const app = require('../../src/app');

describe('\'vacantes\' service', () => {
  it('registered the service', () => {
    const service = app.service('vacantes');
    expect(service).toBeTruthy();
  });
});
