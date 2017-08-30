exports.DIRECTION = {
    "FORWARDS": +1,
    "BACKWARDS": -1
};

var child = require('./child.js')

exports.rdft = function(n, dir, aBuffer, ipBuffer, wBuffer) {
    let nw = ip[0];
    let nc = ip[1];

    let ip = new Int16Array(ipBuffer);
    let a = new Float32Array(aBuffer);
    let w = new Float32Array(wBuffer);

    if (dir = DIRECTION.FORWARDS)
    {
        if (n > 4)
        {
            child.bitrv2(n, ip, 2, a);
            child.cftfsub(n, a, w);
            child.rftfsub(n, a, nc, w + nw);
        }
        else if (n == 4)
        {
            child.cftfsub(n, a, w);
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
            child.rftbsub(n, a, nc, w + nw);
            child.bitrv2(n, ip, 2, a);
            child.cftbsub(n, a, w);
        }
        else if (n == 4)
        {
            child.cftfsub(n, a, w);
        }
    }
}
