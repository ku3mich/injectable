const i = require('../index.js');
const c = require('./common.js');

describe('resolve', function (){
	before(() =>
		   this.container = c.registerContainer(c.sampleServices));

	it("'A' resolves to [A]", () =>
	   assert(this.container.resolve('A') instanceof c.A));

	it("A.Dep is set to instance of Dep", () => {
		let a = this.container.resolve('A');
		assert(a.dep instanceof c.Dep);
	});
});

