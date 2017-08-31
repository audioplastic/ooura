/*
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
*/

var init = require('./init.js')
var trans = require('./transform.js')
const assert = require('assert');

class Ooura {
    constructor(size) {
        assert(  Ooura.isPowerOf2(size) );

        this.size = size;
        this.ip = new Int16Array( 2 + Math.sqrt(size) );
        this.w = new Float64Array(size/2);
        this.internal = new Float64Array(size);

        init.makewt(size/4, this.ip.buffer, this.w.buffer);
        init.makect(size/4, this.ip.buffer, this.w.buffer, size/4)
    }

    static complexSize(n) {
        assert(  Ooura.isPowerOf2(n) );
        return (n / 2) + 1;
    }

    static realSize(n) {
        const result =  (n - 1) * 2;
        assert(  Ooura.isPowerOf2(result) );
        return result;
    }

    static isPowerOf2(n) {
        if (typeof n !== 'number') {return false}
        return n && (n & (n - 1)) === 0;
    }

    getRealSize() {
        return this.size;
    }

    getComplexSize() {
        return Ooura.complexSize(this.size);
    }

    fft(dataBuffer, reBuffer, imBuffer) {
        let data = new Float64Array(dataBuffer);
        this.internal.set(data);

        trans.rdft(this.size, trans.DIRECTION.FORWARDS, this.internal.buffer, this.ip.buffer, this.w.buffer);

        let im = new Float64Array(imBuffer);
        let re = new Float64Array(reBuffer);

        //de-interleave data
        let nn = 0;
        let mm = 0;
        while (nn != this.size) {
            re[nn] = this.internal[mm++];
            im[nn++] = -this.internal[mm++];
        }

        // post cleanup
        re[this.size/2] = -im[0];
        im[0] = 0.0;
        im[this.size/2] = 0.0;
    }

    ifft(dataBuffer, reBuffer, imBuffer) {
        let im = new Float64Array(imBuffer);
        let re = new Float64Array(reBuffer);

        //pack complex into buffer
        let nn = 0;
        let mm = 0;
        while (nn != this.size) {
            this.internal[mm++]=re[nn];
            this.internal[mm++]=-im[nn++];
        }
        this.internal[1] = re[this.size / 2];

        trans.rdft(this.size, trans.DIRECTION.BACKWARDS, this.internal.buffer, this.ip.buffer, this.w.buffer);

        let data = new Float64Array(dataBuffer);
        data.set(  this.internal.map(x => x * 2/this.size)  );
    }
}
module.exports = Ooura;
