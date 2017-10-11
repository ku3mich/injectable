const i = require('../index');
const buildInjectCache = require('../lib/buildInjectCache');
const Q = require('./sample/classes/fake/q');

describe('build inject cache', function () {
  before( () =>{
    this.locator = new i.Locator(__dirname);
  });
  
  it('instance',  () => {
    const q = new Q();
    
    const cache = buildInjectCache(q, this.locator);
    console.log(cache, cache.props.have);
    cache.props.should.have.property('dep', '/sample/classes/dep');
  });

  it('type',  () => {
    const cache = buildInjectCache(Q, this.locator);
    cache.props.should.have.property('dep', '/sample/classes/dep');
  });
});
