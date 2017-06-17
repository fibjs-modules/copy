const copy = require('../');
const test = require('test');
const path = require('path');
const assert = require('assert');
const fs = require('fs');
const rmdirr = require('@fibjs/rmdirr');
const readdir = require('@fibjs/fs-readdir-recursive');

test.setup();

describe("copy", () => {
  const tmp = path.join(__dirname, './tmp');
  const src = path.join(__dirname, './fixtures/files');

  afterEach(() => rmdirr(tmp));

  it('basic copy', () => {
    copy(src, tmp);

    const dirs = readdir(tmp);
    dirs.forEach(dir => {
      const a = path.basename(dir).split('.')[0];
      const b = fs.readFile(path.join(tmp, dir)).toString();
      assert.equal(a, b);
    });
  });

  it('processor', () => {
    copy(src, tmp, data => {
      data = data.toString();
      data = +data;
      data++;
      return new Buffer(data + '');
    });

    const dirs = readdir(tmp);
    dirs.forEach(dir => {
      const a = parseInt(path.basename(dir).split('.')[0]) + 1;
      const b = fs.readFile(path.join(tmp, dir)).toString();
      assert.equal(a, b);
    });
  });

  it('throws', () => {
    assert.throws(() => copy('123', '234'));
    assert.throws(() => copy(src, tmp, 'throws'));
  });
});

process.exit(test.run(console.DEBUG));
