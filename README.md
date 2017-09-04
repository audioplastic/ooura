Ooura FFT [![npm version](https://badge.fury.io/js/ooura.svg)](https://badge.fury.io/js/ooura)
===============================

Ultra fast 1D real/complex FFT with simple interface.

| Branch | Master | Develop |
| :---    | :---   | :---    |
| Circle CI <img src="http://www.taskcoach.org/images/linux.png" height="20px;"/> |  [![Circle Status](https://circleci.com/gh/audioplastic/ooura/tree/master.png?circle-token=63d6565456f01dec4f3c77d14bef5a1ce4e7143a)](https://circleci.com/gh/audioplastic/ooura) | [![Circle Status](https://circleci.com/gh/audioplastic/ooura/tree/develop.png?circle-token=63d6565456f01dec4f3c77d14bef5a1ce4e7143a)](https://circleci.com/gh/audioplastic/ooura) |
| Appveyor <img src="https://psiphon.ca/images/windows-logo.png" height="20px;"/> | [![Build status](https://ci.appveyor.com/api/projects/status/2f31v1etdumb9jkp/branch/master?svg=true)](https://ci.appveyor.com/project/audioplastic/ooura/branch/master)| [![Build status](https://ci.appveyor.com/api/projects/status/2f31v1etdumb9jkp/branch/develop?svg=true)](https://ci.appveyor.com/project/audioplastic/ooura/branch/develop) |
| Travis <img src="https://s3-us-west-1.amazonaws.com/sweeper-production-brand-logo/apple.png" height="20px;"/> | [![Build Status](https://travis-ci.org/audioplastic/ooura.svg?branch=master)](https://travis-ci.org/audioplastic/ooura) | [![Build Status](https://travis-ci.org/audioplastic/ooura.svg?branch=develop)](https://travis-ci.org/audioplastic/ooura) |
| Coveralls | [![Coverage Status](https://coveralls.io/repos/github/audioplastic/ooura/badge.svg?branch=master)](https://coveralls.io/github/audioplastic/ooura?branch=master) | [![Coverage Status](https://coveralls.io/repos/github/audioplastic/ooura/badge.svg?branch=develop)](https://coveralls.io/github/audioplastic/ooura?branch=develop) |

This is a dependency-free Javascript version of Takuya Ooura's FFT algorithms derived from the [C/Fortran FFT implementation](http://www.kurims.kyoto-u.ac.jp/~ooura/fft.html). I wanted a fast 1D FFT implementation in Javascript, and the Ooura implementation is a very portable and performant FFT implementation that lends itself well to a porting.

### Performance
![latest performance](https://github.com/audioplastic/fft-js-benchmark/raw/master/img/3-9-2017.png)

For a wide range of useful FFT sizes, ooura has higher throughput than other Node FFT packages tested. There is still plenty of scope for optimisation road-mapped for future releases (radix-8, split radix). For details on benchmarking, see [this](https://github.com/audioplastic/fft-js-benchmark) dedicated repository.

### Correctness
This implementation has been tested using power-of-2 FFT sizes against trusted reference values (however, I accept no responsibility if this trashes your app, or for any other damages). To test yourself, clone the repository from GitHub and run `npm install` to install (just to install the test runner), then run `npm test`.

### Usage: Real [![XO code style](https://img.shields.io/badge/try_me-RunKit-orange.svg)](https://runkit.com/audioplastic/ooura-real)
This implementation performs real FFT and inverse-FFT using double precision javascript `TypedArray`. Below is an example of typical extraction of the split-complex spectrum, and back conversion to real array.

```js
var ooura = require('ooura');

// Set up an input signal of size 8;
let input = new Float64Array([1,2,3,4,1,2,3,4]);

// Set up the FFT object and use a helper to generate an output array
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

### Usage: complex [![XO code style](https://img.shields.io/badge/try_me-RunKit-orange.svg)](https://runkit.com/audioplastic/ooura-complex)
Complex FFT is also possible with this package. Simply initialise the FFT object specifying a complex type FFT.

```js
var ooura = require('ooura');

// Set up an input signal real and imag components
let reInput = new Float64Array([1,2,3,4]);
let imInput = new Float64Array([2,3,4,5]);

// Set up the fft object and the empty arrays for transform results
let oo = new ooura(reInput.length*2, {"type":"complex", "radix":4});
let reOutput = new Float64Array(oo.size/2);
let imOutput = new Float64Array(oo.size/2);
let reBack = new Float64Array(oo.size/2);
let imBack = new Float64Array(oo.size/2);

//do some FFTing in both directions
//note: reference underlying array buffers for in-place processing
oo.fft(reInput.buffer, imInput.buffer, reOutput.buffer, imOutput.buffer);   //populates re and im from input
oo.ifft(reOutput.buffer, imOutput.buffer, reBack.buffer, imBack.buffer); //populates output from re and im

// look at the results and intermediate representation
console.log("real input = " + reInput);
console.log("imag input = " + imInput);

console.log("re transformed = " + reOutput);
console.log("im transformed = " + imOutput);

console.log("re inverse transformed = " + reBack);
console.log("im inverse transformed = " + imBack);
```

### Usage: in-place (real/complex) [![XO code style](https://img.shields.io/badge/try_me-RunKit-orange.svg)](https://runkit.com/audioplastic/ooura-in-place)
For the ultimate throughput, there are thin wrapper functions around the underlying FFT implementation that performs operations in place on interleaved complex or real buffers. The following example shows the complex FFT forwards and back, outputting the state of the data at each step to the console.

```js
var ooura = require('ooura');
const nfft = 32;
let oo = new ooura(nfft, {"type":"complex", "radix":4} );
let data = Float64Array.from(Array(nfft), (e,i)=>i+1);
console.log(data);
oo.fftInPlace(data.buffer);
console.log(data);
oo.ifftInPlace(data.buffer);
console.log(data); // Notice the fast in-place methods do not scale the output
console.log(data.map(x=>x*2/oo.size)); // ... but that is simple to do manually
```

### Coding Style [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
The codebase is linted during testing using [XO](https://github.com/sindresorhus/xo), but with 2 overrides:
1) `no-mixed-operators` is disabled. Conventional [XO](https://github.com/sindresorhus/xo) linting requires only one type of arithmetic operator per command unless each operator is explicitly separated using parentheses. For DSP code, this causes a lot of unnecessary verbosity. If you're an engineer with a grasp of the basic order of operations (BODMAS), then redundant parentheses are bad style.
2) `one-var` is disabled. I understand the reasoning for this rule, but this code is ported from C, where a common idiom is to declare all variables at the top of each function. Disabling this rule allows the JS and C versions of the code to be more easily comparable.

The spec folder is also excluded from XO linting as part of `npm test` due to errors raised in relation to the way that the Jasmine test framework operates. It is still recommended to manually run `xo --fix spec/*` after modifying unit tests to maintain a level of consistency.
q
