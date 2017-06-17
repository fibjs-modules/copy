const fs = require('fs');
const util = require('util');
const path = require('path');
const co = require('coroutine');
const assert = require('assert');
const mkdirp = require('@fibjs/mkdirp');
const readdir = require('@fibjs/fs-readdir-recursive');

const limit = 20;

module.exports = (src, target, processor) => {
  assert(fs.exists(src), 'the source path must exists!');
  const dirs = readdir(src).map(dir => {
    return {
      src: path.join(src, dir),
      target: path.join(target, dir),
    };
  });

  if (processor) {
    assert(util.isFunction(processor), 'the processor must be Function');
    co.parallel(dirs, dir => {
      let data = fs.readFile(dir.src);
      data = processor(data);
      const dirname = path.dirname(dir.target);
      if (!fs.exists(dirname)) {
        mkdirp(dirname);
      }
      fs.writeFile(dir.target, data);
    }, limit);
  } else {
    co.parallel(dirs, dir => {
      const dirname = path.dirname(dir.target);
      if (!fs.exists(dirname)) {
        mkdirp(dirname);
      }
      fs.copy(dir.src, dir.target);
    }, limit);
  }
};
