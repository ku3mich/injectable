const Part = require('../lib/part');
const path = require('path');

const fileName = path.join(__dirname, 'sample', 'classes.js');

describe('part', function () {
  before(() =>
         this.part = new Part(fileName));

  it('fileName', () => 
     this.part.fileName.should.equal(fileName));
  
  it('dir', () =>
     this.part.dir.should.equal(path.join(__dirname, 'sample')));

  it('name', () =>
     this.part.name.should.equal('classes'));

  it('load, exports, keys', () =>{
    const part = this.part.load();

    part.exports
      .should.have.property('Dep');

    part.services
      .should.contain('Dep');
  });
  
  it('2nd load throws', () =>
     assert.throws(() => this.part.load()));
});
