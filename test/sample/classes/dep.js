const i = require('../../../index.js');

class Dep extends i.Injectable  {
  constructor(opts){
    super(opts);
  }
}
Dep[i.Inject] = i.transientClass(module);

module.exports = Dep;
