const i = require('../index.js');
const c = require('./sample-classes.js');

describe('testing test classes', function (){
	before(() => {
		const container = i.createContainer();

		container.registerClass({
			A : c.A,
			B : c.B,
			Dep : c.Dep,
			C : c.C
		});

		this.a = container.resolve('A');
	});

	it("'a' resolved", () =>
	   assert(this.a));

	it("'a'.Dep set", () =>
		assert(this.a.dep instanceof c.Dep, "a.dep defined")) ;
});
