const i = require('../index.js');
const c = require('./sample/classes');

function registerContainer(services){
  const locator = new i.Locator(__dirname+'/sample/classes');
  const container = new i.Container(locator);
  container.register(services);

  return container;
}

const sampleServices = {
  '/a' : c.A,
  '/dep' : c.Dep,
  '/c' : c.C
};

describe('container resolve', function (){
  before(() =>
		 this.container = registerContainer(sampleServices));

  it("'/a' resolves to [A]", () =>
	 assert(this.container.resolve('/a') instanceof c.A));

  it("A.Dep is set to instance of Dep", () => {
	const a = this.container.resolve('/a');
	assert(a.dep instanceof c.Dep);
  });
});

describe('registration errors', function () {
  const tryRegister = type =>
          registerContainer({
            [type.toString()] : type
          });

  it('throws if Q.[Inject] is not [Registration]', () => {
	class Q extends i.Injectable {
	}
	Q[i.Inject] = {};
	
	assert.throws( () =>  tryRegister(Q));
  });

  it('throws if Q is not [Injectable]', () => {
	class Q {
	}
	Q[i.Inject] = i.transientClass(module);
	
	assert.throws( () =>  tryRegister(Q));
  });

  it('throws if module not specified in registration', () => {
	class Q {
	}
	
	assert.throws(() => Q[i.Inject] = i.transientClass(/*module*/));
  });
  
});
