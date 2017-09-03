Ooura FFT [![npm version](https://badge.fury.io/js/ooura.svg)](https://badge.fury.io/js/ooura)
===============================

Ultra fast 1D real/complex FFT with simple interface.

| Branch | Master | Develop |
| :---    | :---   | :---    |
| Circle CI <img src="http://www.taskcoach.org/images/linux.png" height="20px;"/> |  [![Circle Status](https://circleci.com/gh/audioplastic/ooura/tree/master.png?circle-token=63d6565456f01dec4f3c77d14bef5a1ce4e7143a)](https://circleci.com/gh/audioplastic/ooura) | [![Circle Status](https://circleci.com/gh/audioplastic/ooura/tree/develop.png?circle-token=63d6565456f01dec4f3c77d14bef5a1ce4e7143a)](https://circleci.com/gh/audioplastic/ooura) |
| Appveyor <img src="https://psiphon.ca/images/windows-logo.png" height="20px;"/> | [![Build status](https://ci.appveyor.com/api/projects/status/2f31v1etdumb9jkp/branch/master?svg=true)](https://ci.appveyor.com/project/audioplastic/ooura/branch/master)| [![Build status](https://ci.appveyor.com/api/projects/status/2f31v1etdumb9jkp/branch/develop?svg=true)](https://ci.appveyor.com/project/audioplastic/ooura/branch/develop) |
| Travis <img src="https://s3-us-west-1.amazonaws.com/sweeper-production-brand-logo/apple.png" height="20px;"/> | [![Build Status](https://travis-ci.org/audioplastic/ooura.svg?branch=master)](https://travis-ci.org/audioplastic/ooura) | [![Build Status](https://travis-ci.org/audioplastic/ooura.svg?branch=develop)](https://travis-ci.org/audioplastic/ooura) |
| Coveralls | [![Coverage Status](https://coveralls.io/repos/github/audioplastic/ooura/badge.svg?branch=master)](https://coveralls.io/github/audioplastic/ooura?branch=master) | [![Coverage Status](https://coveralls.io/repos/github/audioplastic/ooura/badge.svg?branch=develop)](https://coveralls.io/github/audioplastic/ooura?branch=develop) |

This is a dependency-free Javascript version of Takuya Ooura's FFT algorithms derived from the [C/Fortran FFT implementation](http://www.kurims.kyoto-u.ac.jp/~ooura/fft.html). I wanted a fast 1D FFT implementation in Javascript that I can trust for audio work, and the Ooura implementation is a very portable and reasonable performant FFT implementation that lends itself well to a porting.

### Performance
![latest performance](https://github.com/audioplastic/fft-js-benchmark/raw/master/img/3-9-2017.png)

For a wide range of useful FFT sizes, ooura has higher throughput than other Node FFT packages tested. There is still plenty of scope for optimisation road-mapped for future releases (radix-8, split radix). For details on benchmarking, see [this](https://github.com/audioplastic/fft-js-benchmark) dedicated repository.

### Correctness
This implementation has been tested using power-of-2 FFT sizes against trusted reference values (however, I accept no responsibility if this trashes your app, or for any other damages). To test yourself, clone the repository from GitHub and run `npm install` to install (just to install the test runner), then run `npm test`.

### Usage
This implementation performs in place single sided real FFT and inverse-FFT on double precision javascript `TypedArray`. Below is an example of typical extraction of the split-complex spectrum, and back conversion to real array. Faster in-place interleaved FFT operations are also available for both real and complex transforms, which are documented in the [benchmarking](https://github.com/audioplastic/fft-js-benchmark).

```js
var ooura = require('ooura');

// Set up an input signal of size 8;
let input = new Float64Array([1,2,3,4,1,2,3,4]);

// Set up the fft object and use a helper to generate an output array
// of correct length and type.
let oo = new ooura(input.length, {"type":"real", "radix":4});
let output = oo.scalarArrayFactory();

//helper to get single sided complex arrays
let re = oo.vectorArrayFactory();
let im = oo.vectorArrayFactory();

//do some FFTing in both directions (using the built in helper functions to get senseful I/O)
//note: reference underlying array buffers for in-place processing
oo.fft(input.buffer, re.buffer, im.buffer);   //populates re and im from input
oo.ifft(output.buffer, re.buffer, im.buffer); //populates output from re and im

// look at the results and intermediate representation
console.log("ip = " + input);
console.log("re = " + re);
console.log("im = " + im);
console.log("op = " + output);
```

This yeilds the following output to the console . .

```
ip = 1,2,3,4,1,2,3,4
re = 20,0,-4,0,-4
im = 0,0,4,0,0
op = 1,2,3,4,1,2,3,4
```
