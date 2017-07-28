const A = require('./a');
//const i = require('../../../index');
class B extends A {
  constructor(opts){
	super(opts);
  }
}

module.exports = B;
