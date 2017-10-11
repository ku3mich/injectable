const A = require('./a');
const i = require('../../../index');
class B extends A {
  constructor(opts){
	super(opts);
  }
}

B[i.Inject] = i.transientClass(module);
module.exports = B;
