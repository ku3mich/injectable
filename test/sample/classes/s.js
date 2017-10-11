const i = require('../../../index');
const s = require('../symbols');

class S extends i.Injectable {
  constructor(opts){
	super(opts);
  }
}

S[i.Inject] = i.transientClass(module).tagged(s.S);
module.exports = S;
