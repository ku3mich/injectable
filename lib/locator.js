const Base = require('@ku3mich/base').Object;
const Resolver = require('./resolver');

class Locator extends Base {
  constructor (root){
	super();
	this.root = root;
  }

  resolve(path){
	const resolver = new Resolver(this.root);
	return resolver.resolve(path);
  }
}

module.exports = Locator;
