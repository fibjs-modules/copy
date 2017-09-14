# @fibjs/copy

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![appveyor build status][appveyor-image]][appveyor-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@fibjs/copy.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fibjs/copy
[travis-image]: https://img.shields.io/travis/fibjs-modules/copy.svg?style=flat-square
[travis-url]: https://travis-ci.org/fibjs-modules/copy
[appveyor-image]: https://ci.appveyor.com/api/projects/status/hnsvto46bnirhx1v/branch/master?svg=true
[appveyor-url]: https://ci.appveyor.com/project/ngot/copy
[codecov-image]: https://img.shields.io/codecov/c/github/fibjs-modules/copy.svg?style=flat-square
[codecov-url]: https://codecov.io/github/fibjs-modules/copy?branch=master
[david-image]: https://img.shields.io/david/fibjs-modules/copy.svg?style=flat-square
[david-url]: https://david-dm.org/fibjs-modules/copy
[snyk-image]: https://snyk.io/test/npm/@fibjs/copy/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/@fibjs/copy
[download-image]: https://img.shields.io/npm/dm/@fibjs/copy.svg?style=flat-square
[download-url]: https://npmjs.org/package/@fibjs/copy

copy file or directory recursively asynchronously.

## Install

```bash
$ npm i @fibjs/copy --save
```

## Usage

```js
const copy = require('@fibjs/copy');

copy('path to source', 'path to target');

copy('path to source', 'path to target', data => {
  // process the file buffer before write to the target
  return data.toString() + 'foo';
});

copy('path to source', 'path to target', (data, dir) => {
  if (dir.src.endsWith('xxx')) {
    // ignore this path
    return false;
  }
  return data;
});

copy('path to source', 'path to target', () => {
  // doing nothing
  return true;
});
```

## Questions & Suggestions

Please open an issue [here](https://github.com/fibjs-modules/copy/issues).

## License

[MIT](LICENSE)