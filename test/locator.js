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


  it("locate files", () => {
    const files = this.locator.locateFiles('sample/**/*.js');

    files.should
      .containEql('sample/classes/dep.js')
      .property('length').greaterThan(1);
  });
});
