const l = require('../lib/locator.js');
const p = require('path');

describe('locator', function () {
	before(() => {
		this.locator = new l.Locator(__dirname);
		this.file = p.basename(__filename);
	});

	it("resolve is resolver", () =>
	   assert(this.locator.resolve(this.file) instanceof l.Resolver));

	it("resolve absolute", () =>
	   assert.equal(this.locator.resolve(this.file).result, __filename));

	it("resolve relative", () =>
	   assert.equal(this.locator.resolve(this.file).relative.result, this.file));
});
