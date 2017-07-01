const i = require('../../../index.js');

class Dep  {
	constructor(opts){
	}
}
Dep[i.Inject] = i.transientClass();

module.exports = Dep;
