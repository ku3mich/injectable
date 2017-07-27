const i = require('../../../../index');

class D extends i.Injectable {
  constructor(opts){
	super(opts);
  }
}

D[i.Inject] = i.transientClass({
  A : '../a'
});

module.exports = D;
