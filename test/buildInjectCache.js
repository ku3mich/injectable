const i = require('../index');
const buildInjectCache = require('../lib/buildInjectCache');
const Q = require('./sample/classes/fake/q');

describe('build inject cache', function () {
  it('correct',  () => {
    const locator = new i.Locator(__dirname);

    const q = new Q();
    
    const cache = buildInjectCache(q, locator);
    cache.should.have.property('dep', '/sample/classes/dep');
    //console.log(cache);
  });
});
