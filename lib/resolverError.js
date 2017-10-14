const base = require('@ku3mich/base');

class ResolverError extends base.RethrownError {
  constructor (msg){
	super(msg);
  }
}

module.exports = ResolverError;
