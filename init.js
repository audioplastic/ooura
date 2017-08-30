var child = require('./child.js')

exports.makewt = function(nw, ipBuffer, wBuffer) {
    let j, nwh;
    let delta, x, y;

    // setup views
    ip = new Float32Array(ipBuffer);
    w  = new Float32Array(wBuffer);

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
}
