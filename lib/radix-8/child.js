const cftmdl = function (n, l, aBuffer, wBuffer) {
	let j, j1, j2, j3, j4, j5, j6, j7, k, k1;
	let wtmp, wk1r, wk1i, wk2r, wk2i, wk3r, wk3i,
		wk4r, wk4i, wk5r, wk5i, wk6r, wk6i, wk7r, wk7i;
	let x0r, x0i, x1r, x1i, x2r, x2i, x3r, x3i,
		y0r, y0i, y1r, y1i, y2r, y2i, y3r, y3i,
		y4r, y4i, y5r, y5i, y6r, y6i, y7r, y7i;

	const a = new Float64Array(aBuffer);
	const w = new Float64Array(wBuffer);

	const m = l << 3;
	const wn4r = w[2];
	for (j = 0; j < l; j += 2) {
		j1 = j + l;
		j2 = j1 + l;
		j3 = j2 + l;
		j4 = j3 + l;
		j5 = j4 + l;
		j6 = j5 + l;
		j7 = j6 + l;
		x0r = a[j] + a[j1];
		x0i = a[j + 1] + a[j1 + 1];
		x1r = a[j] - a[j1];
		x1i = a[j + 1] - a[j1 + 1];
		x2r = a[j2] + a[j3];
		x2i = a[j2 + 1] + a[j3 + 1];
		x3r = a[j2] - a[j3];
		x3i = a[j2 + 1] - a[j3 + 1];
		y0r = x0r + x2r;
		y0i = x0i + x2i;
		y2r = x0r - x2r;
		y2i = x0i - x2i;
		y1r = x1r - x3i;
		y1i = x1i + x3r;
		y3r = x1r + x3i;
		y3i = x1i - x3r;
		x0r = a[j4] + a[j5];
		x0i = a[j4 + 1] + a[j5 + 1];
		x1r = a[j4] - a[j5];
		x1i = a[j4 + 1] - a[j5 + 1];
		x2r = a[j6] + a[j7];
		x2i = a[j6 + 1] + a[j7 + 1];
		x3r = a[j6] - a[j7];
		x3i = a[j6 + 1] - a[j7 + 1];
		y4r = x0r + x2r;
		y4i = x0i + x2i;
		y6r = x0r - x2r;
		y6i = x0i - x2i;
		x0r = x1r - x3i;
		x0i = x1i + x3r;
		x2r = x1r + x3i;
		x2i = x1i - x3r;
		y5r = wn4r * (x0r - x0i);
		y5i = wn4r * (x0r + x0i);
		y7r = wn4r * (x2r - x2i);
		y7i = wn4r * (x2r + x2i);
		a[j1] = y1r + y5r;
		a[j1 + 1] = y1i + y5i;
		a[j5] = y1r - y5r;
		a[j5 + 1] = y1i - y5i;
		a[j3] = y3r - y7i;
		a[j3 + 1] = y3i + y7r;
		a[j7] = y3r + y7i;
		a[j7 + 1] = y3i - y7r;
		a[j] = y0r + y4r;
		a[j + 1] = y0i + y4i;
		a[j4] = y0r - y4r;
		a[j4 + 1] = y0i - y4i;
		a[j2] = y2r - y6i;
		a[j2 + 1] = y2i + y6r;
		a[j6] = y2r + y6i;
		a[j6 + 1] = y2i - y6r;
	}
	if (m < n) {
		wk1r = w[4];
		wk1i = w[5];
		for (j = m; j < l + m; j += 2) {
			j1 = j + l;
			j2 = j1 + l;
			j3 = j2 + l;
			j4 = j3 + l;
			j5 = j4 + l;
			j6 = j5 + l;
			j7 = j6 + l;
			x0r = a[j] + a[j1];
			x0i = a[j + 1] + a[j1 + 1];
			x1r = a[j] - a[j1];
			x1i = a[j + 1] - a[j1 + 1];
			x2r = a[j2] + a[j3];
			x2i = a[j2 + 1] + a[j3 + 1];
			x3r = a[j2] - a[j3];
			x3i = a[j2 + 1] - a[j3 + 1];
			y0r = x0r + x2r;
			y0i = x0i + x2i;
			y2r = x0r - x2r;
			y2i = x0i - x2i;
			y1r = x1r - x3i;
			y1i = x1i + x3r;
			y3r = x1r + x3i;
			y3i = x1i - x3r;
			x0r = a[j4] + a[j5];
			x0i = a[j4 + 1] + a[j5 + 1];
			x1r = a[j4] - a[j5];
			x1i = a[j4 + 1] - a[j5 + 1];
			x2r = a[j6] + a[j7];
			x2i = a[j6 + 1] + a[j7 + 1];
			x3r = a[j6] - a[j7];
			x3i = a[j6 + 1] - a[j7 + 1];
			y4r = x0r + x2r;
			y4i = x0i + x2i;
			y6r = x0r - x2r;
			y6i = x0i - x2i;
			x0r = x1r - x3i;
			x0i = x1i + x3r;
			x2r = x1r + x3i;
			x2i = x3r - x1i;
			y5r = wk1i * x0r - wk1r * x0i;
			y5i = wk1i * x0i + wk1r * x0r;
			y7r = wk1r * x2r + wk1i * x2i;
			y7i = wk1r * x2i - wk1i * x2r;
			x0r = wk1r * y1r - wk1i * y1i;
			x0i = wk1r * y1i + wk1i * y1r;
			a[j1] = x0r + y5r;
			a[j1 + 1] = x0i + y5i;
			a[j5] = y5i - x0i;
			a[j5 + 1] = x0r - y5r;
			x0r = wk1i * y3r - wk1r * y3i;
			x0i = wk1i * y3i + wk1r * y3r;
			a[j3] = x0r - y7r;
			a[j3 + 1] = x0i + y7i;
			a[j7] = y7i - x0i;
			a[j7 + 1] = x0r + y7r;
			a[j] = y0r + y4r;
			a[j + 1] = y0i + y4i;
			a[j4] = y4i - y0i;
			a[j4 + 1] = y0r - y4r;
			x0r = y2r - y6i;
			x0i = y2i + y6r;
			a[j2] = wn4r * (x0r - x0i);
			a[j2 + 1] = wn4r * (x0i + x0r);
			x0r = y6r - y2i;
			x0i = y2r + y6i;
			a[j6] = wn4r * (x0r - x0i);
			a[j6 + 1] = wn4r * (x0i + x0r);
		}
		k1 = 4;
		for (k = 2 * m; k < n; k += m) {
			k1 += 4;
			wk1r = w[k1];
			wk1i = w[k1 + 1];
			wk2r = w[k1 + 2];
			wk2i = w[k1 + 3];
			wtmp = 2 * wk2i;
			wk3r = wk1r - wtmp * wk1i;
			wk3i = wtmp * wk1r - wk1i;
			wk4r = 1 - wtmp * wk2i;
			wk4i = wtmp * wk2r;
			wtmp = 2 * wk4i;
			wk5r = wk3r - wtmp * wk1i;
			wk5i = wtmp * wk1r - wk3i;
			wk6r = wk2r - wtmp * wk2i;
			wk6i = wtmp * wk2r - wk2i;
			wk7r = wk1r - wtmp * wk3i;
			wk7i = wtmp * wk3r - wk1i;
			for (j = k; j < l + k; j += 2) {
				j1 = j + l;
				j2 = j1 + l;
				j3 = j2 + l;
				j4 = j3 + l;
				j5 = j4 + l;
				j6 = j5 + l;
				j7 = j6 + l;
				x0r = a[j] + a[j1];
				x0i = a[j + 1] + a[j1 + 1];
				x1r = a[j] - a[j1];
				x1i = a[j + 1] - a[j1 + 1];
				x2r = a[j2] + a[j3];
				x2i = a[j2 + 1] + a[j3 + 1];
				x3r = a[j2] - a[j3];
				x3i = a[j2 + 1] - a[j3 + 1];
				y0r = x0r + x2r;
				y0i = x0i + x2i;
				y2r = x0r - x2r;
				y2i = x0i - x2i;
				y1r = x1r - x3i;
				y1i = x1i + x3r;
				y3r = x1r + x3i;
				y3i = x1i - x3r;
				x0r = a[j4] + a[j5];
				x0i = a[j4 + 1] + a[j5 + 1];
				x1r = a[j4] - a[j5];
				x1i = a[j4 + 1] - a[j5 + 1];
				x2r = a[j6] + a[j7];
				x2i = a[j6 + 1] + a[j7 + 1];
				x3r = a[j6] - a[j7];
				x3i = a[j6 + 1] - a[j7 + 1];
				y4r = x0r + x2r;
				y4i = x0i + x2i;
				y6r = x0r - x2r;
				y6i = x0i - x2i;
				x0r = x1r - x3i;
				x0i = x1i + x3r;
				x2r = x1r + x3i;
				x2i = x1i - x3r;
				y5r = wn4r * (x0r - x0i);
				y5i = wn4r * (x0r + x0i);
				y7r = wn4r * (x2r - x2i);
				y7i = wn4r * (x2r + x2i);
				x0r = y1r + y5r;
				x0i = y1i + y5i;
				a[j1] = wk1r * x0r - wk1i * x0i;
				a[j1 + 1] = wk1r * x0i + wk1i * x0r;
				x0r = y1r - y5r;
				x0i = y1i - y5i;
				a[j5] = wk5r * x0r - wk5i * x0i;
				a[j5 + 1] = wk5r * x0i + wk5i * x0r;
				x0r = y3r - y7i;
				x0i = y3i + y7r;
				a[j3] = wk3r * x0r - wk3i * x0i;
				a[j3 + 1] = wk3r * x0i + wk3i * x0r;
				x0r = y3r + y7i;
				x0i = y3i - y7r;
				a[j7] = wk7r * x0r - wk7i * x0i;
				a[j7 + 1] = wk7r * x0i + wk7i * x0r;
				a[j] = y0r + y4r;
				a[j + 1] = y0i + y4i;
				x0r = y0r - y4r;
				x0i = y0i - y4i;
				a[j4] = wk4r * x0r - wk4i * x0i;
				a[j4 + 1] = wk4r * x0i + wk4i * x0r;
				x0r = y2r - y6i;
				x0i = y2i + y6r;
				a[j2] = wk2r * x0r - wk2i * x0i;
				a[j2 + 1] = wk2r * x0i + wk2i * x0r;
				x0r = y2r + y6i;
				x0i = y2i - y6r;
				a[j6] = wk6r * x0r - wk6i * x0i;
				a[j6 + 1] = wk6r * x0i + wk6i * x0r;
			}
		}
	}
};

const cft1st = function (n, aBuffer, wBuffer) {
	let j, k1;
	let wtmp, wk1r, wk1i, wk2r, wk2i, wk3r, wk3i,
		wk4r, wk4i, wk5r, wk5i, wk6r, wk6i, wk7r, wk7i;
	let x0r, x0i, x1r, x1i, x2r, x2i, x3r, x3i,
		y0r, y0i, y1r, y1i, y2r, y2i, y3r, y3i,
		y4r, y4i, y5r, y5i, y6r, y6i, y7r, y7i;

	const a = new Float64Array(aBuffer);
	const w = new Float64Array(wBuffer);

	const wn4r = w[2];
	x0r = a[0] + a[2];
	x0i = a[1] + a[3];
	x1r = a[0] - a[2];
	x1i = a[1] - a[3];
	x2r = a[4] + a[6];
	x2i = a[5] + a[7];
	x3r = a[4] - a[6];
	x3i = a[5] - a[7];
	y0r = x0r + x2r;
	y0i = x0i + x2i;
	y2r = x0r - x2r;
	y2i = x0i - x2i;
	y1r = x1r - x3i;
	y1i = x1i + x3r;
	y3r = x1r + x3i;
	y3i = x1i - x3r;
	x0r = a[8] + a[10];
	x0i = a[9] + a[11];
	x1r = a[8] - a[10];
	x1i = a[9] - a[11];
	x2r = a[12] + a[14];
	x2i = a[13] + a[15];
	x3r = a[12] - a[14];
	x3i = a[13] - a[15];
	y4r = x0r + x2r;
	y4i = x0i + x2i;
	y6r = x0r - x2r;
	y6i = x0i - x2i;
	x0r = x1r - x3i;
	x0i = x1i + x3r;
	x2r = x1r + x3i;
	x2i = x1i - x3r;
	y5r = wn4r * (x0r - x0i);
	y5i = wn4r * (x0r + x0i);
	y7r = wn4r * (x2r - x2i);
	y7i = wn4r * (x2r + x2i);
	a[2] = y1r + y5r;
	a[3] = y1i + y5i;
	a[10] = y1r - y5r;
	a[11] = y1i - y5i;
	a[6] = y3r - y7i;
	a[7] = y3i + y7r;
	a[14] = y3r + y7i;
	a[15] = y3i - y7r;
	a[0] = y0r + y4r;
	a[1] = y0i + y4i;
	a[8] = y0r - y4r;
	a[9] = y0i - y4i;
	a[4] = y2r - y6i;
	a[5] = y2i + y6r;
	a[12] = y2r + y6i;
	a[13] = y2i - y6r;
	if (n > 16) {
		wk1r = w[4];
		wk1i = w[5];
		x0r = a[16] + a[18];
		x0i = a[17] + a[19];
		x1r = a[16] - a[18];
		x1i = a[17] - a[19];
		x2r = a[20] + a[22];
		x2i = a[21] + a[23];
		x3r = a[20] - a[22];
		x3i = a[21] - a[23];
		y0r = x0r + x2r;
		y0i = x0i + x2i;
		y2r = x0r - x2r;
		y2i = x0i - x2i;
		y1r = x1r - x3i;
		y1i = x1i + x3r;
		y3r = x1r + x3i;
		y3i = x1i - x3r;
		x0r = a[24] + a[26];
		x0i = a[25] + a[27];
		x1r = a[24] - a[26];
		x1i = a[25] - a[27];
		x2r = a[28] + a[30];
		x2i = a[29] + a[31];
		x3r = a[28] - a[30];
		x3i = a[29] - a[31];
		y4r = x0r + x2r;
		y4i = x0i + x2i;
		y6r = x0r - x2r;
		y6i = x0i - x2i;
		x0r = x1r - x3i;
		x0i = x1i + x3r;
		x2r = x1r + x3i;
		x2i = x3r - x1i;
		y5r = wk1i * x0r - wk1r * x0i;
		y5i = wk1i * x0i + wk1r * x0r;
		y7r = wk1r * x2r + wk1i * x2i;
		y7i = wk1r * x2i - wk1i * x2r;
		x0r = wk1r * y1r - wk1i * y1i;
		x0i = wk1r * y1i + wk1i * y1r;
		a[18] = x0r + y5r;
		a[19] = x0i + y5i;
		a[26] = y5i - x0i;
		a[27] = x0r - y5r;
		x0r = wk1i * y3r - wk1r * y3i;
		x0i = wk1i * y3i + wk1r * y3r;
		a[22] = x0r - y7r;
		a[23] = x0i + y7i;
		a[30] = y7i - x0i;
		a[31] = x0r + y7r;
		a[16] = y0r + y4r;
		a[17] = y0i + y4i;
		a[24] = y4i - y0i;
		a[25] = y0r - y4r;
		x0r = y2r - y6i;
		x0i = y2i + y6r;
		a[20] = wn4r * (x0r - x0i);
		a[21] = wn4r * (x0i + x0r);
		x0r = y6r - y2i;
		x0i = y2r + y6i;
		a[28] = wn4r * (x0r - x0i);
		a[29] = wn4r * (x0i + x0r);
		k1 = 4;
		for (j = 32; j < n; j += 16) {
			k1 += 4;
			wk1r = w[k1];
			wk1i = w[k1 + 1];
			wk2r = w[k1 + 2];
			wk2i = w[k1 + 3];
			wtmp = 2 * wk2i;
			wk3r = wk1r - wtmp * wk1i;
			wk3i = wtmp * wk1r - wk1i;
			wk4r = 1 - wtmp * wk2i;
			wk4i = wtmp * wk2r;
			wtmp = 2 * wk4i;
			wk5r = wk3r - wtmp * wk1i;
			wk5i = wtmp * wk1r - wk3i;
			wk6r = wk2r - wtmp * wk2i;
			wk6i = wtmp * wk2r - wk2i;
			wk7r = wk1r - wtmp * wk3i;
			wk7i = wtmp * wk3r - wk1i;
			x0r = a[j] + a[j + 2];
			x0i = a[j + 1] + a[j + 3];
			x1r = a[j] - a[j + 2];
			x1i = a[j + 1] - a[j + 3];
			x2r = a[j + 4] + a[j + 6];
			x2i = a[j + 5] + a[j + 7];
			x3r = a[j + 4] - a[j + 6];
			x3i = a[j + 5] - a[j + 7];
			y0r = x0r + x2r;
			y0i = x0i + x2i;
			y2r = x0r - x2r;
			y2i = x0i - x2i;
			y1r = x1r - x3i;
			y1i = x1i + x3r;
			y3r = x1r + x3i;
			y3i = x1i - x3r;
			x0r = a[j + 8] + a[j + 10];
			x0i = a[j + 9] + a[j + 11];
			x1r = a[j + 8] - a[j + 10];
			x1i = a[j + 9] - a[j + 11];
			x2r = a[j + 12] + a[j + 14];
			x2i = a[j + 13] + a[j + 15];
			x3r = a[j + 12] - a[j + 14];
			x3i = a[j + 13] - a[j + 15];
			y4r = x0r + x2r;
			y4i = x0i + x2i;
			y6r = x0r - x2r;
			y6i = x0i - x2i;
			x0r = x1r - x3i;
			x0i = x1i + x3r;
			x2r = x1r + x3i;
			x2i = x1i - x3r;
			y5r = wn4r * (x0r - x0i);
			y5i = wn4r * (x0r + x0i);
			y7r = wn4r * (x2r - x2i);
			y7i = wn4r * (x2r + x2i);
			x0r = y1r + y5r;
			x0i = y1i + y5i;
			a[j + 2] = wk1r * x0r - wk1i * x0i;
			a[j + 3] = wk1r * x0i + wk1i * x0r;
			x0r = y1r - y5r;
			x0i = y1i - y5i;
			a[j + 10] = wk5r * x0r - wk5i * x0i;
			a[j + 11] = wk5r * x0i + wk5i * x0r;
			x0r = y3r - y7i;
			x0i = y3i + y7r;
			a[j + 6] = wk3r * x0r - wk3i * x0i;
			a[j + 7] = wk3r * x0i + wk3i * x0r;
			x0r = y3r + y7i;
			x0i = y3i - y7r;
			a[j + 14] = wk7r * x0r - wk7i * x0i;
			a[j + 15] = wk7r * x0i + wk7i * x0r;
			a[j] = y0r + y4r;
			a[j + 1] = y0i + y4i;
			x0r = y0r - y4r;
			x0i = y0i - y4i;
			a[j + 8] = wk4r * x0r - wk4i * x0i;
			a[j + 9] = wk4r * x0i + wk4i * x0r;
			x0r = y2r - y6i;
			x0i = y2i + y6r;
			a[j + 4] = wk2r * x0r - wk2i * x0i;
			a[j + 5] = wk2r * x0i + wk2i * x0r;
			x0r = y2r + y6i;
			x0i = y2i - y6r;
			a[j + 12] = wk6r * x0r - wk6i * x0i;
			a[j + 13] = wk6r * x0i + wk6i * x0r;
		}
	}
};

exports.cftfsub = function (n, aBuffer, wBuffer) {
	let j, j1, j2, j3, l;
	let x0r, x0i, x1r, x1i, x2r, x2i, x3r, x3i;

	const a = new Float64Array(aBuffer);
	const w = new Float64Array(wBuffer);

	l = 2;
	if (n >= 16) {
		cft1st(n, a, w);
		l = 16;
		while ((l << 3) <= n) {
			cftmdl(n, l, a, w);
			l <<= 3;
		}
	}
	if ((l << 1) < n) {
		for (j = 0; j < l; j += 2) {
			j1 = j + l;
			j2 = j1 + l;
			j3 = j2 + l;
			x0r = a[j] + a[j1];
			x0i = a[j + 1] + a[j1 + 1];
			x1r = a[j] - a[j1];
			x1i = a[j + 1] - a[j1 + 1];
			x2r = a[j2] + a[j3];
			x2i = a[j2 + 1] + a[j3 + 1];
			x3r = a[j2] - a[j3];
			x3i = a[j2 + 1] - a[j3 + 1];
			a[j] = x0r + x2r;
			a[j + 1] = x0i + x2i;
			a[j2] = x0r - x2r;
			a[j2 + 1] = x0i - x2i;
			a[j1] = x1r - x3i;
			a[j1 + 1] = x1i + x3r;
			a[j3] = x1r + x3i;
			a[j3 + 1] = x1i - x3r;
		}
	} else if ((l << 1) === n) {
		for (j = 0; j < l; j += 2) {
			j1 = j + l;
			x0r = a[j] - a[j1];
			x0i = a[j + 1] - a[j1 + 1];
			a[j] += a[j1];
			a[j + 1] += a[j1 + 1];
			a[j1] = x0r;
			a[j1 + 1] = x0i;
		}
	}
};

exports.cftbsub = function (n, aBuffer, wBuffer) {
	let j, j1, j2, j3, j4, j5, j6, j7, l;
	let wn4r, x0r, x0i, x1r, x1i, x2r, x2i, x3r, x3i,
		y0r, y0i, y1r, y1i, y2r, y2i, y3r, y3i,
		y4r, y4i, y5r, y5i, y6r, y6i, y7r, y7i;

	const a = new Float64Array(aBuffer);
	const w = new Float64Array(wBuffer);

	l = 2;
	if (n > 16) {
		cft1st(n, a, w);
		l = 16;
		while ((l << 3) < n) {
			cftmdl(n, l, a, w);
			l <<= 3;
		}
	}
	if ((l << 2) < n) {
		wn4r = w[2];
		for (j = 0; j < l; j += 2) {
			j1 = j + l;
			j2 = j1 + l;
			j3 = j2 + l;
			j4 = j3 + l;
			j5 = j4 + l;
			j6 = j5 + l;
			j7 = j6 + l;
			x0r = a[j] + a[j1];
			x0i = -a[j + 1] - a[j1 + 1];
			x1r = a[j] - a[j1];
			x1i = -a[j + 1] + a[j1 + 1];
			x2r = a[j2] + a[j3];
			x2i = a[j2 + 1] + a[j3 + 1];
			x3r = a[j2] - a[j3];
			x3i = a[j2 + 1] - a[j3 + 1];
			y0r = x0r + x2r;
			y0i = x0i - x2i;
			y2r = x0r - x2r;
			y2i = x0i + x2i;
			y1r = x1r - x3i;
			y1i = x1i - x3r;
			y3r = x1r + x3i;
			y3i = x1i + x3r;
			x0r = a[j4] + a[j5];
			x0i = a[j4 + 1] + a[j5 + 1];
			x1r = a[j4] - a[j5];
			x1i = a[j4 + 1] - a[j5 + 1];
			x2r = a[j6] + a[j7];
			x2i = a[j6 + 1] + a[j7 + 1];
			x3r = a[j6] - a[j7];
			x3i = a[j6 + 1] - a[j7 + 1];
			y4r = x0r + x2r;
			y4i = x0i + x2i;
			y6r = x0r - x2r;
			y6i = x0i - x2i;
			x0r = x1r - x3i;
			x0i = x1i + x3r;
			x2r = x1r + x3i;
			x2i = x1i - x3r;
			y5r = wn4r * (x0r - x0i);
			y5i = wn4r * (x0r + x0i);
			y7r = wn4r * (x2r - x2i);
			y7i = wn4r * (x2r + x2i);
			a[j1] = y1r + y5r;
			a[j1 + 1] = y1i - y5i;
			a[j5] = y1r - y5r;
			a[j5 + 1] = y1i + y5i;
			a[j3] = y3r - y7i;
			a[j3 + 1] = y3i - y7r;
			a[j7] = y3r + y7i;
			a[j7 + 1] = y3i + y7r;
			a[j] = y0r + y4r;
			a[j + 1] = y0i - y4i;
			a[j4] = y0r - y4r;
			a[j4 + 1] = y0i + y4i;
			a[j2] = y2r - y6i;
			a[j2 + 1] = y2i - y6r;
			a[j6] = y2r + y6i;
			a[j6 + 1] = y2i + y6r;
		}
	} else if ((l << 2) === n) {
		for (j = 0; j < l; j += 2) {
			j1 = j + l;
			j2 = j1 + l;
			j3 = j2 + l;
			x0r = a[j] + a[j1];
			x0i = -a[j + 1] - a[j1 + 1];
			x1r = a[j] - a[j1];
			x1i = -a[j + 1] + a[j1 + 1];
			x2r = a[j2] + a[j3];
			x2i = a[j2 + 1] + a[j3 + 1];
			x3r = a[j2] - a[j3];
			x3i = a[j2 + 1] - a[j3 + 1];
			a[j] = x0r + x2r;
			a[j + 1] = x0i - x2i;
			a[j2] = x0r - x2r;
			a[j2 + 1] = x0i + x2i;
			a[j1] = x1r - x3i;
			a[j1 + 1] = x1i - x3r;
			a[j3] = x1r + x3i;
			a[j3 + 1] = x1i + x3r;
		}
	} else {
		for (j = 0; j < l; j += 2) {
			j1 = j + l;
			x0r = a[j] - a[j1];
			x0i = -a[j + 1] + a[j1 + 1];
			a[j] += a[j1];
			a[j + 1] = -a[j + 1] - a[j1 + 1];
			a[j1] = x0r;
			a[j1 + 1] = x0i;
		}
	}
};
