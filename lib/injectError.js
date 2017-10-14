const base = require('@ku3mich/base');

class InjectError extends base.RethrownError {
	constructor(message){
		super(message);
	}
}

module.exports = InjectError;
