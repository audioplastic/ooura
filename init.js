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

var child = require('./child.js')

exports.makewt = function(nw, ipBuffer, wBuffer) {
    let j, nwh;
    let delta, x, y;

    // setup views
    ip = new Int16Array(ipBuffer);
    w  = new Float64Array(wBuffer);

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
    ip = new Int16Array(ipBuffer);
    c  = new Float64Array(cBuffer).subarray(cOffset);

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
