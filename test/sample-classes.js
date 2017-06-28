const i = require('../index.js');

class Dep  {
	constructor(opts){
	}
}
Dep[i.Inject] = i.transientClass();

class A extends i.Injectable{
	constructor(opts){
		super(opts);
	}
}

A[i.Inject] = i.transientClass({
	dep : 'Dep'
});

class B extends A {
	constructor(opts){
		super(opts);
	}
}


class C extends i.Injectable {
	constructor(opts){
	}
}
C[i.Inject] = i.transientClass({
	dep2 : 'Dep'
});

module.exports = {
	Dep,
	A,
	B,
	C
};
