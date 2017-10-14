const i = require('../../../index');
const s = require('../symbols');

class S extends i.Injectable {
  constructor(opts){
	super(opts);
  }
}

module.expose(S)
  .transientClass()
  .tagged(s.S);

