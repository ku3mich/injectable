const path = require('path');
const PartError = require('./partError');

class Part {
  constructor(fileName){
    this.fileName = fileName;
    this.dir = path.dirname(fileName);
    this.name = path.basename(fileName).replace(/\.js$/, '');
  }

  load() {
    if (this.exports)
      throw new PartError(`${this.modulename} already loaded`);
    
    this.exports = require(this.fileName);
    this.services = Object.keys(this.exports);
    
    return this;
  }

  static load(filePath) {
    return new Part(filePath).load();
  }
}

module.exports = Part;
