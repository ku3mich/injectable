const i = require('../../../index.js');

class A extends i.Injectable{
  constructor(opts){
	super(opts);
  }
}

A[i.Inject] = i.transientClass(module, {
  dep : 'Dep'
});

module.exports = A;