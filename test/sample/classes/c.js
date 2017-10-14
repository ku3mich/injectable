const i = require('../../../index.js');

class C extends i.Injectable {
  constructor(opts){
    super(opts);
  }
}

module.expose(C)
  .transientClass({
    dep2 : './dep',
    d : './sub/d'
  });
