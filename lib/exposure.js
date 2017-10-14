const s = require('./symbols');
const b = require('@ku3mich/base');
const path = require('path');

class Exposure extends b.Object{
  constructor (prototype, module) {
    super();
    
    this.prototype = prototype;
    this.module = module;
    this.tags = [];
    
    for (let scope of Object.keys(s.scopes)){
      (sc => this[sc + 'Class'] = function (deps){
        this.scope = s.scopes[sc];
        this.regType = s.types.class;
        this.deps = deps || {};
        this.dirname = path.dirname(this.module.filename);

        this.module.exports = prototype;
        prototype[s.symbols.Exposure] = this;
        
        return this;
      })(scope);
    }
  }

  tagged(/* tags args*/) {
    Array.prototype.push.apply(this.tags, arguments);
    return this;
  }
}

module.constructor.prototype.expose = function(prototype){
  return new Exposure(prototype, this);
};

module.exports = Exposure;
