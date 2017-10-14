const i = require('../../../index.js');

class Dep extends i.Injectable  {
  constructor(opts){
    super(opts);
  }
}

module.expose(Dep)
  .transientClass();
