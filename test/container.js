const i = require('../index.js');
const c = require('./sample/classes');

function registerContainer(services){
  const locator = new i.Locator(__dirname);
  let container = new i.Container(locator);
  container.register(services);
  return container;
}

const sampleServices = {
  A : c.A,
  B : c.B,
  Dep : c.Dep,
  C : c.C
};

describe('container resolve', function (){
  before(() =>
		 this.container = registerContainer(sampleServices));

  it("'A' resolves to [A]", () =>
	 assert(this.container.resolve('A') instanceof c.A));

  it("A.Dep is set to instance of Dep", () => {
	let a = this.container.resolve('A');
	assert(a.dep instanceof c.Dep);
  });
});

describe('registration errors', function () {
  const tryRegister = type =>
          registerContainer({
            [type.toString()] : type
          });

  it('throws if no Inject', () => {
	class Q extends i.Injectable {
	}

	assert.throws( () =>
				   tryRegister(Q));
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
