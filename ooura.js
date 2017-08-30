var child = require('./child.js')

class Ooura {
    constructor(size) {
        this.size = size;
        let ip = new Float32Array( 2 + Math.sqrt(size) );
        let w = new Float32Array(size/2);
        let buffer = new Float32Array(size);

        const nw = size/4;

        // === makewt ===
        let j, nwh;
        let delta, x, y;

        ip[0] = nw;
        ip[1] = 1;
        if (nw > 2) {
            nwh = nw >> 1; //TODO: CHECK!
            delta = Math.atan(1.0) / nwh;
            w[0] = 1;
            w[1] = 0;
            w[nwh] = (  Math.cos(delta*nwh)  )
            w[nwh + 1] = w[nwh];

            if (nwh > 2) {
                for (let j = 2; j < nwh; j += 2) {
                    x = Math.cos(delta * j);
                    y = Math.sin(delta * j);
                    w[j] = x;
                    w[j + 1] = y;
                    w[nw - j] = y;
                    w[nw - j + 1] = x;
                }
                child.bitrv2(nw, ip.buffer, 2, w.buffer);
            }
        }
        // pointerTest(buffer.buffer);
        this.ip = new Float32Array( ip.buffer );
        this.w = new Float32Array( w.buffer );
        this.buffer = new Float32Array( buffer.buffer );
    }
}
module.exports = Ooura;
