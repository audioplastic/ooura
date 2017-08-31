Ooura FFT javascript port
===============================

```
> npm install ooura
```

|  | Master | Develop |
| :---    | :---   | :---    |
| Circle CI  |  [![Circle Status](https://circleci.com/gh/audioplastic/ooura/tree/master.png?circle-token=63d6565456f01dec4f3c77d14bef5a1ce4e7143a)](https://circleci.com/gh/audioplastic/ooura) | [![Circle Status](https://circleci.com/gh/audioplastic/ooura/tree/develop.png?circle-token=63d6565456f01dec4f3c77d14bef5a1ce4e7143a)](https://circleci.com/gh/audioplastic/ooura) |
| Coveralls | [![Coverage Status](https://coveralls.io/repos/github/audioplastic/ooura/badge.svg?branch=master)](https://coveralls.io/github/audioplastic/ooura?branch=master) | [![Coverage Status](https://coveralls.io/repos/github/audioplastic/ooura/badge.svg?branch=develop)](https://coveralls.io/github/audioplastic/ooura?branch=develop) |

This is a dependency-free straight port of Takuya Ooura's [C/Fortran FFT implementation](http://www.kurims.kyoto-u.ac.jp/~ooura/fft.html). I wanted a 1D FFT implementation in Javascript that I can trust for audio work, and the Ooura implementation is a very portable and resonable performant FFT implementation that lends itself well to a porting project.

The js implementation has been tested using the for power-of-2 FFT sizes against trusted reference values down to a double precision tolerance of 1e-8. To test yourself, clone the repository from github and run `npm install` to install (just to install the test runner), then run `npm test`.

Usage
-----

This implementation performs in place single sided FFT and inverse-FFT on double precision javascript `TypedArray`. Usage is straightforward.

```js
var Ooura = require('ooura');

// Set up an input signal of zise 8;
let input = new Float64Array([1,2,3,4,1,2,3,4])
const nfft = input.length;
let output = new Float64Array(nfft);

//helper to get single sided complex size
const nclx = Ooura.complexSize(nfft);
let re = new Float64Array(nclx);
let im = new Float64Array(nclx);

//initialise an fft of fixed length
let oo = new Ooura(nfft);

//do some FFTing in both directions
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
