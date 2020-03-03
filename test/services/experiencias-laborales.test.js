const app = require('../../src/app');

describe('\'experiencias-laborales\' service', () => {
  it('registered the service', () => {
    const service = app.service('experiencias-laborales');
    expect(service).toBeTruthy();
  });
});
