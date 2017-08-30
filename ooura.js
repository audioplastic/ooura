var init = require('./init.js')

class Ooura {
    constructor(size) {
        this.size = size;
        this.ip = new Int16Array( 2 + Math.sqrt(size) );
        this.w = new Float64Array(size/2);
        this.buffer = new Float64Array(size);

        init.makewt(size/4, this.ip.buffer, this.w.buffer);
        init.makect(size/4, this.ip.buffer, this.w.buffer, size/4)
    }

    fft() {

    }

    ifft() {

    }
}
module.exports = Ooura;
