const Base = require('@ku3mich/base').Object;
const Resolver = require('./resolver');
const glob = require('glob');
const LocatorError = require('./locatorError.js');
const Part = require('./part');

class Locator extends Base {
  constructor (root){
	super();
	this.root = root;
    this.parts = {
    };
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

  loadPart(filePath){
    if (this.modules[filePath])
      throw new LocatorError(`part: ${filePath} already loaded`);

    this.parts[filePath] = Part.load(filePath);
  }
}

module.exports = Locator;
