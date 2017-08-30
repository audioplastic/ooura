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

exports.makect = function(nc, ipBuffer, cBuffer, cOffset) {
    let j, nch;
    let delta;

    // setup views
    ip = new Float32Array(ipBuffer);
    c  = new Float32Array(cBuffer).subarray(cOffset);

    ip[1] = nc;
    if (nc > 1) {
        nch = nc >> 1;
        delta = Math.atan(1.0) / nch;
        c[0] = Math.cos(delta * nch);
        c[nch] = 0.5 * c[0];
        for (j = 1; j < nch; j++) {
            c[j] = 0.5 * Math.cos(delta * j);
            c[nc - j] = 0.5 * Math.sin(delta * j);
        }
    }
}
