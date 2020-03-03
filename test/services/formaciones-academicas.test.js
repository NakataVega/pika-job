const app = require('../../src/app');

describe('\'formaciones-academicas\' service', () => {
  it('registered the service', () => {
    const service = app.service('formaciones-academicas');
    expect(service).toBeTruthy();
  });
});
