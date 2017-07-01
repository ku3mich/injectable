const i = require('../../../index.js');
const A = require('./a');

class B extends A {
	constructor(opts){
		super(opts);
	}
}

module.exports = B;
