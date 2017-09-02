const DIRECTION = {
    "FORWARDS": +1,
    "BACKWARDS": -1
};
exports.DIRECTION = DIRECTION;

var child = require('./child.js')

exports.rdft = function(n, dir, aBuffer, ipBuffer, wBuffer) {
    let ip = new Int16Array(ipBuffer);
    let a = new Float64Array(aBuffer);
    let nw = ip[0];
    let nc = ip[1];

    if (dir == DIRECTION.FORWARDS)
    {
        if (n > 4)
        {
            child.bitrv2(n, ipBuffer, 2, aBuffer);
            child.cftfsub(n, aBuffer, wBuffer);
            child.rftfsub(n, aBuffer, nc, wBuffer, nw);
        }
        else if (n == 4)
        {
            child.cftfsub(n, aBuffer, wBuffer);
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
            child.rftbsub(n, aBuffer, nc, wBuffer, nw);
            child.bitrv2(n, ipBuffer, 2, aBuffer);
            child.cftbsub(n, aBuffer, wBuffer);
        }
        else if (n == 4)
        {
            child.cftfsub(n, aBuffer, wBuffer);
        }
    }
}

exports.cdft = function(n, dir, aBuffer, ipBuffer, wBuffer) {
    if (n > 4) {
        if (dir == DIRECTION.FORWARDS) {
            child.bitrv2(n, ipBuffer, 2, aBuffer);
            child.cftfsub(n, aBuffer, wBuffer);
        } else {
            child.bitrv2conj(n, ipBuffer, 2, aBuffer);
            child.cftbsub(n, aBuffer, wBuffer);
        }
    } else if (n == 4) {
        child.cftfsub(n, aBuffer, wBuffer);
    }
}
