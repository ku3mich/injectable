const A = require('./a');

class B extends A {
  constructor(opts){
	super(opts);
  }
}

module.expose(B)
  .transientClass();

