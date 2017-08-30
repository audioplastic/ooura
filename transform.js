var DIRECTION = {
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
