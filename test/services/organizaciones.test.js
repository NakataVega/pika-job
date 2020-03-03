const app = require('../../src/app');

describe('\'organizaciones\' service', () => {
  it('registered the service', () => {
    const service = app.service('organizaciones');
    expect(service).toBeTruthy();
  });
});
