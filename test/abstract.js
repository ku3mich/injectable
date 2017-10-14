const i = require('../index');
describe('abstract', function () {
  it('tests abstract registration', () => {
    class A extends i.Injectable {
    }
    A[i.Inject] = i.abstractClass(module);
    const container = new i.Container(new i.Locator(__dirname));
    const regstn = container.getRegistration(A);
    regstn.scope.should.be.equal(i.scopes.abstract);
  });
});
