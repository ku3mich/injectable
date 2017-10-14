const i = require('../../../index.js');

class A extends i.Injectable{
  constructor(opts){
	super(opts);
  }
}

module.expose(A)
  .transientClass({
    dep : './dep'
  })
  .tagged('me');
