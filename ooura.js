var init = require('./init.js')
var trans = require('./transform.js')
const assert = require('assert');

class Ooura {
    constructor( size, info = {"type":"real", "radix":4} ) {
        assert(  Ooura.isPowerOf2(size) );

        this.real = (info.type === "real");
        this.size = size;
        this.ip = new Int16Array( 2 + Math.sqrt(size) );
        this.w = new Float64Array(size/2);
        this.internal = new Float64Array(size);

        init.makewt(size/4, this.ip.buffer, this.w.buffer);

        // perform additional modification if real
        if (info.type == "real") {
            init.makect(size/4, this.ip.buffer, this.w.buffer, size/4)
        }
    }

    // returns complex vector size given one dimensional scalar size
    static vectorSize(scalarSize) {
        assert(  Ooura.isPowerOf2(scalarSize) );
        return (scalarSize / 2) + 1;
    }

    // inverse fucntion of vector size
    static scalarSize(vectorSize) {
        const result =  (vectorSize - 1) * 2;
        assert(  Ooura.isPowerOf2(result) );
        return result;
    }

    static isPowerOf2(n) {
        if (typeof n !== 'number') {return false}
        return n && (n & (n - 1)) === 0;
    }

    getScalarSize() {
        return this.size;
    }

    getVectorSize() {
        return Ooura.vectorSize(this.size);
    }

    // Helper factory functions returning correct array and data size for a
    // given fft setup;
    scalarArrayFactory() {
        return new Float64Array(this.getScalarSize());
    }

    vectorArrayFactory() {
        return new Float64Array(this.getVectorSize());
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

    // Below: No-nonsense thin wrappers around the interleaved in-place data
    // representation with no scaling, for maximum throughput.
    fftInPlace(dataBuffer) {
        if(this.real) {
            trans.rdft(this.size, trans.DIRECTION.FORWARDS, dataBuffer, this.ip.buffer, this.w.buffer);
        }else{ // complex
            trans.cdft(this.size, trans.DIRECTION.FORWARDS, dataBuffer, this.ip.buffer, this.w.buffer);
        }
    }
    
    ifftInPlace(dataBuffer) {
        if(this.real) {
            trans.rdft(this.size, trans.DIRECTION.BACKWARDS, dataBuffer, this.ip.buffer, this.w.buffer);
        }else{ // complex
            trans.cdft(this.size, trans.DIRECTION.BACKWARDS, dataBuffer, this.ip.buffer, this.w.buffer);
        }
    }
}
module.exports = Ooura;
