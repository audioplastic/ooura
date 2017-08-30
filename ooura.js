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

    fft(dataBuffer, reBuffer, imBuffer) {
        let data = new Float64Array(dataBuffer);
        this.buffer.set(data);
        // this.buffer[0] = 100

        trans.rdft(this.size, trans.DIRECTION.FORWARDS, this.buffer.buffer, this.ip.buffer, this.w.buffer)

        // post cleanup
        let im = new Float64Array(imBuffer);
        let re = new Float64Array(reBuffer);

        re[this.size/2] = -im[0];
        im[0] = 0.0;
        im[this.size/2] = 0.0;
    }

    ifft() {

    }
}
module.exports = Ooura;
