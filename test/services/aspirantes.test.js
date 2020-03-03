const app = require('../../src/app');

describe('\'aspirantes\' service', () => {
  it('registered the service', () => {
    const service = app.service('aspirantes');
    expect(service).toBeTruthy();
  });
});
