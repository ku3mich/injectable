const i = require('../index.js');

class Dep  {
	constructor(opts){
	}
}

class A extends i.Injectable{
	constructor(opts){
		super(opts);
	}
}

A[i.Inject] = {
	dep : 'Dep'
};

class B extends A {
	constructor(opts){
		super(opts);
	}
}


class C extends i.Injectable {
	constructor(opts){
	}
}

C[i.Inject] = {
	dep2 : 'Dep'
};

module.exports = {
	Dep, A, B, C
};
