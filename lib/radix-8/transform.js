const DIRECTION = {
	FORWARDS: +1,
	BACKWARDS: -1
};
exports.DIRECTION = DIRECTION;

const child = require('./child.js');
const common = require('./common.js');

exports.rdft = function (n, dir, aBuffer, ipBuffer, wBuffer) {
	const ip = new Int16Array(ipBuffer);
	const a = new Float64Array(aBuffer);
	const nw = ip[0];
	const nc = ip[1];

	if (dir === DIRECTION.FORWARDS) {
		if (n > 4) {
			common.bitrv2(n, ipBuffer, 2, aBuffer);
			child.cftfsub(n, aBuffer, wBuffer);
			common.rftfsub(n, aBuffer, nc, wBuffer, nw);
		} else if (n === 4) {
			child.cftfsub(n, aBuffer, wBuffer);
		}
		const xi = a[0] - a[1];
		a[0] += a[1];
		a[1] = xi;
	} else {
		a[1] = 0.5 * (a[0] - a[1]);
		a[0] -= a[1];
		if (n > 4) {
			common.rftbsub(n, aBuffer, nc, wBuffer, nw);
			common.bitrv2(n, ipBuffer, 2, aBuffer);
			child.cftbsub(n, aBuffer, wBuffer);
		} else if (n === 4) {
			child.cftfsub(n, aBuffer, wBuffer);
		}
	}
};

exports.cdft = function (n, dir, aBuffer, ipBuffer, wBuffer) {
	if (n > 4) {
		if (dir === DIRECTION.FORWARDS) {
			common.bitrv2(n, ipBuffer, 2, aBuffer);
			child.cftfsub(n, aBuffer, wBuffer);
		} else {
			common.bitrv2conj(n, ipBuffer, 2, aBuffer);
			child.cftbsub(n, aBuffer, wBuffer);
		}
	} else if (n === 4) {
		child.cftfsub(n, aBuffer, wBuffer);
	}
};
