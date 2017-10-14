const base = require('@ku3mich/base');

class LocatorError extends base.RethrownError {
  constructor (msg){
	super(msg);
  }
}

module.exports = LocatorError;
