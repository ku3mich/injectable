const Resolver = require('../lib/resolver');
const path = require('path');

describe('resolver', function () {
  before(() => {
    this.resolver = new Resolver('/some/root');
  });

  it("resolve to absolute", () => {
    this.resolver.resolve('foo.txt').get()
      .should.equal(path.resolve('/some/root/foo.txt'));

    this.resolver.resolve('/foo.txt').get()
      .should.equal(path.resolve('/some/root/foo.txt'));

    this.resolver.resolve('./foo.txt').get()
      .should.equal(path.resolve('/some/root/foo.txt'));

    this.resolver.resolve('a/../foo.txt').get()
      .should.equal(path.resolve('/some/root/foo.txt'));
  });

  it("throws if get called without resolve", ()=>
     assert.throws(()=> new Resolver().get()));
  
  it("resolve relative", () => {
    this.resolver.resolve('foo.txt').relative.get()
      .should.equal('foo.txt');

    this.resolver.resolve('a/../foo.txt').relative.get()
      .should.equal('foo.txt');
  });

  it("convert abs", () =>{
    this.resolver.convert('/some/root/foo.txt').get()
      .should.equal(path.resolve('/some/root/foo.txt'));
  });

  it("convert relative", () =>{
    this.resolver.convert('/some/root/foo.txt').relative.get()
      .should.equal('foo.txt');
  });

  it("join", () =>{
    this.resolver.resolve('foo').join('bar').relative.get()
      .should.equal(path.normalize('foo/bar'));
  });

  it("posix(actual only in Windows)", () =>{
    this.resolver.resolve('foo/bar').relative.posix.get()
      .should.equal('foo/bar');
  });
});
