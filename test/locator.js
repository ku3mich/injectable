const {
  Locator,
  Resolver
} = require('../index');

const path = require('path');

describe('locator', function () {
  before(() => {
	this.locator = new Locator(__dirname);
	this.file = path.basename(__filename);
  });

  it("resolve is resolver", () =>
	 assert(this.locator.resolve(this.file) instanceof Resolver));

  it("resolve absolute", () =>
	 assert.equal(this.locator.resolve(this.file).result, __filename));

  it("resolve relative", () =>
	 assert.equal(this.locator.resolve(this.file).relative.result, this.file));
});
