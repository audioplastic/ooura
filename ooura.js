var init = require('./init.js')
var trans = require('./transform.js')

class Ooura {
    constructor(size) {
        this.size = size;
        this.ip = new Int16Array( 2 + Math.sqrt(size) );
        this.w = new Float64Array(size/2);
        this.buffer = new Float64Array(size);

        init.makewt(size/4, this.ip.buffer, this.w.buffer);
        init.makect(size/4, this.ip.buffer, this.w.buffer, size/4)
    }

    static complexSize(n) {
        return (n / 2) + 1;
    }

    static realSize(n) {
        return (n - 1) * 2;
    }

    getRealSize() {
        return this.size;
    }

    getComplexSize() {
        return Ooura.complexSize(this.size);
    }

    fft(dataBuffer, reBuffer, imBuffer) {
        let data = new Float64Array(dataBuffer);
        this.buffer.set(data);

        trans.rdft(this.size, trans.DIRECTION.FORWARDS, this.buffer.buffer, this.ip.buffer, this.w.buffer)

        let im = new Float64Array(imBuffer);
        let re = new Float64Array(reBuffer);

        //de-interleave data
        let nn = 0;
        let mm = 0;
        while (nn != this.size) {
            re[nn] = this.buffer[mm++];
            im[nn++] = -this.buffer[mm++];
        }

        // post cleanup
        re[this.size/2] = -im[0];
        im[0] = 0.0;
        im[this.size/2] = 0.0;
    }

    ifft() {

    }
}
module.exports = Ooura;
