const i = require('../../../../index');

class D extends i.Injectable {
  constructor(opts){
	super(opts);
  }
}

D[i.Inject] = i.transientClass(module, {
  A : '../a'
}).tagged('me', 'z');

module.exports = D;
