const i = require('../index');
const path = require('path');
const Dep = require('./sample/classes/dep');
const D = require('./sample/classes/sub/d');
const A = require('./sample/classes/a');
const B = require('./sample/classes/b.js');

function createContainer(){
  const locator = new i.Locator(path.join(__dirname, 'sample/classes'));
  const container = new i.Container(locator);

  return container;
}

describe('locate and register', function () {
  before( () => {
    this.container = createContainer();
    this.container.on('registered', w => console.log(`    ${w.svc} as ${w.scope} tags: [${w.type[i.Inject].tags}]`));
    
    this.container.registerParts('**/*.js');
  });

  it('complicated', () =>{
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
    z.some(e => e instanceof D).should.be.ok();
  });

  it('tagged me', () => {
    const me = this.container.resolveMany('me');
    me.should.have.length(3);
    me.some(e=> e instanceof B).should.be.ok();
    me.some(e=> e instanceof D).should.be.ok();
    me.some(e=> e instanceof A).should.be.ok();
  });
});
