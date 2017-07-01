const i = require('../../../index.js');

class C extends i.Injectable {
	constructor(opts){
	}
}
C[i.Inject] = i.transientClass({
	dep2 : 'Dep'
});

module.exports = C;
