const i = require('../../../index.js');

class C extends i.Injectable {
  constructor(opts){
    super(opts);
  }
}
C[i.Inject] = i.transientClass(module, {
  dep2 : './dep',
  d : './sub/d'
});

module.exports = C;
