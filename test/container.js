const i = require('../index.js');
const c = require('./common.js');

describe('container resolve', function (){
	before(() =>
		   this.container = c.registerContainer(c.sampleServices));

	it("'A' resolves to [A]", () =>
	   assert(this.container.resolve('A') instanceof c.A));

	it("A.Dep is set to instance of Dep", () => {
		let a = this.container.resolve('A');
		assert(a.dep instanceof c.Dep);
	});
});

describe('registration errors', function () {
	const tryRegister = type =>  c.registerContainer({  [type.toString()] : type });

	it('throws if no Inject', () => {
		class Q extends i.Injectable {
		}

		assert.throws( () =>
					   tryRegister(Q));
	});
	
	it('throws if Inject is not [Registration]', () => {
		class Q extends i.Injectable {
		}
		Q[i.Inject] = {};
		
		assert.throws( () =>
					   tryRegister(Q));
	});
});
