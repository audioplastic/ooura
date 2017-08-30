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

const DIRECTION = {
    "FORWARDS": +1,
    "BACKWARDS": -1
};
exports.DIRECTION = DIRECTION;

var child = require('./child.js')

exports.rdft = function(n, dir, aBuffer, ipBuffer, wBuffer) {
    let ip = new Int16Array(ipBuffer);
    let a = new Float64Array(aBuffer);
    let w = new Float64Array(wBuffer);

    let nw = ip[0];
    let nc = ip[1];

    if (dir == DIRECTION.FORWARDS)
    {
        if (n > 4)
        {
            child.bitrv2(n, ip.buffer, 2, a.buffer);
            child.cftfsub(n, a.buffer, w.buffer);
            child.rftfsub(n, a.buffer, nc, w.buffer, nw);
        }
        else if (n == 4)
        {
            child.cftfsub(n, a.buffer, w.buffer);
        }
        let xi = a[0] - a[1];
        a[0] += a[1];
        a[1] = xi;
    }
    else
    {
        a[1] = 0.5 * (a[0] - a[1]);
        a[0] -= a[1];
        if (n > 4)
        {
            child.rftbsub(n, a.buffer, nc, w.buffer, nw);
            child.bitrv2(n, ip.buffer, 2, a.buffer);
            child.cftbsub(n, a.buffer, w.buffer);
        }
        else if (n == 4)
        {
            child.cftfsub(n, a.buffer, w.buffer);
        }
    }
}
