const i = require('../index');
const c = require('./common');

describe('registration errors', function () {
	const tryRegister = type =>  c.registerContainer({  [type.toString()] : type });

	it('throws if no Inject', () => {
		class Q extends i.Injectable {
		}

		assert.throws( () =>
					   tryRegister(Q));
	});
	
	it('throws if Inject is not [Registration]', () => {
		class Q extends i.Injectable {
		}
		Q[i.Inject] = {};
		
		assert.throws( () =>
					   tryRegister(Q));
	});
});
