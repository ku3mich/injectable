const Base = require('@ku3mich/base').Object;
const Resolver = require('./resolver');
const glob = require('glob');

class Locator extends Base {
  constructor (root){
	super();
	this.root = root;
  }

  get resolver(){
	return new Resolver(this.root);
  }

  locateFiles(pattern){
    const f = glob.sync(pattern,{
      root : this.root,
      cwd : this.root
    });

    return f;
  }
}

module.exports = Locator;
