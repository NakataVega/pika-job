const app = require('../../src/app');

describe('\'idiomas\' service', () => {
  it('registered the service', () => {
    const service = app.service('idiomas');
    expect(service).toBeTruthy();
  });
});
