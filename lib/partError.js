const base = require('@ku3mich/base');

class PartError extends base.RethrownError {
  constructor(msg){
    super(msg);
  }
}

module.exports = PartError;
