const i = require('../index');
const path = require('path');
const Dep = require('./sample/classes/dep');
const D = require('./sample/classes/sub/d');
const A = require('./sample/classes/a');
const B = require('./sample/classes/b');
const s = require('./sample/symbols');
const S = require('./sample/classes/s');

function createContainer(){
  const locator = new i.Locator(path.join(__dirname, 'sample/classes'));
  const container = new i.Container(locator);
  
  container.on(i.events.registered, (w) => {
    const tags = w.type[i.symbols.Exposure].tags.map(q => String(q));
    console.log(`    ${w.svc} as ${w.scope} tags: [${tags}]`);
  });
  container.on(i.events.warning, w => console.log(`    WARN: ${w}`));
  container.registerParts('**/*.js');

  return container;
}

describe('locate and register', function () {
  before( () =>
          this.container = createContainer());

  it('complicated', () => {
    const c = this.container.resolve('/c');

    c.dep2.should.instanceof(Dep);
    c.d.should.instanceof(D);
    c.d.A.should.instanceof(A);
  });

  it('correct tags', () => {
    this.container.tags.should.have.property('z');
    this.container.tags.should.have.property('me');
  });
  
  it('tagged z', () => {
    const z = this.container.resolveMany('z');
    z.should.have.length(1);
    z.filter(e => e instanceof D).should.be.not.empty;
  });

  it('tagged me', () => {
    const me = this.container.resolveMany('me');
    me.should.have.length(3);
    me.filter(e => e instanceof B).should.be.not.empty;
    me.filter(e=> e instanceof D).should.be.not.empty;
    me.filter(e=> e instanceof A).should.be.not.empty;
  });

  it('tagged Symbol(S)', () => {
    const me = this.container.resolveMany(s.S);
    me.should.have.length(1);
    me.filter(e => e instanceof S).should.be.not.empty;
  });

});
