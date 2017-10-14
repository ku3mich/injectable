const i = require('../../../../index');

class D extends i.Injectable {
  constructor(opts){
	super(opts);
  }
}

module.expose(D)
  .transientClass({
    A : '../a'
  })
  .tagged('me', 'z');
