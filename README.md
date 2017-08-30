Ooura FFT javascript port
===============================

This is a dependency-free straight port of Takuya Ooura's C/Fortran FFT implementation. I wanted a 1D FFT implementation in Javascript that I can trust for audio work, and the Ooura implementation is a very portable and resonable performant FFT implementation that lends itself well to a porting project.

The js implementation has been tested using the for power-of-2 FFT sizes  against trusted reference values down to a double precision tolerance of 1e-12.

To test yourself, run `npm install` after cloning to install jasmine (test runner), then run `npm test`.

Usage
-----

This implementation performs in place single sided FFT and inverse-FFT on double precision javascript `TypedArray`. Usage is straightforward - remember to pass underlying array buffers.

```js
var Ooura = require('ooura.js');

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

The C/Fortran versions are bundled in the ooura-original directory (as permitted by the original software license).


ISC license
-----------
Copyright (c) 2017 Nick Clark

Permission to use, copy, modify, and distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.