const assert = require('assert');

class Ooura {
	constructor(size, info = {type: 'real', radix: 4}) {
		assert(Ooura.isPowerOf2(size));

		this.real = (info.type === 'real');
		if (!this.real) {
			assert(info.type === 'complex'); // Sanity
		}

		this.size = size;
		this.ip = new Int16Array(2 + Math.sqrt(size));
		this.w = new Float64Array(size / 2);
		this.internal = new Float64Array(size);

		let init;
		if (info.radix === 4) {
			init = require('./lib/radix-4/init.js');
			this.trans = require('./lib/radix-4/transform.js');
		} else if (info.radix === 8) {
			init = require('./lib/radix-8/init.js');
			this.trans = require('./lib/radix-8/transform.js');
		} else if (info.radix === 'split') {
			init = null;
			this.trans = null;
		} else {
			assert(0);
		}
		init.makewt(size / 4, this.ip.buffer, this.w.buffer);

		// Perform additional modification if real
		if (this.real) {
			init.makect(size / 4, this.ip.buffer, this.w.buffer, size / 4);
			this.fft = this.fftReal;
			this.ifft = this.ifftReal;
			this.fftInPlace = this.fftInPlaceReal;
			this.ifftInPlace = this.ifftInPlaceReal;
		} else {
			this.fft = this.fftComplex;
			this.ifft = this.ifftComplex;
			this.fftInPlace = this.fftInPlaceComplex;
			this.ifftInPlace = this.ifftInPlaceComplex;
		}
	}

	// Returns complex vector size given one dimensional scalar size
	static vectorSize(scalarSize) {
		assert(Ooura.isPowerOf2(scalarSize));
		return (scalarSize / 2) + 1;
	}

	// Inverse fucntion of vector size
	static scalarSize(vectorSize) {
		const result = (vectorSize - 1) * 2;
		assert(Ooura.isPowerOf2(result));
		return result;
	}

	static isPowerOf2(n) {
		if (typeof n !== 'number') {
			return false;
		}
		return n && (n & (n - 1)) === 0;
	}

	getScalarSize() {
		return this.size;
	}

	getVectorSize() {
		return Ooura.vectorSize(this.size);
	}

	// Helper factory functions returning correct array and data size for a
	// given fft setup;
	scalarArrayFactory() {
		return new Float64Array(this.getScalarSize());
	}

	vectorArrayFactory() {
		return new Float64Array(this.getVectorSize());
	}

	// Functions below here should be called via their aliases defined in the ctor
	fftReal(dataBuffer, reBuffer, imBuffer) {
		const data = new Float64Array(dataBuffer);
		this.internal.set(data);

		this.trans.rdft(this.size, this.trans.DIRECTION.FORWARDS, this.internal.buffer, this.ip.buffer, this.w.buffer);

		const im = new Float64Array(imBuffer);
		const re = new Float64Array(reBuffer);

		// De-interleave data
		let nn = 0;
		let mm = 0;
		while (nn !== this.size) {
			re[nn] = this.internal[mm++];
			im[nn++] = -this.internal[mm++];
		}

		// Post cleanup
		re[this.size / 2] = -im[0];
		im[0] = 0.0;
		im[this.size / 2] = 0.0;
	}

	ifftReal(dataBuffer, reBuffer, imBuffer) {
		const im = new Float64Array(imBuffer);
		const re = new Float64Array(reBuffer);

		// Pack complex into buffer
		let nn = 0;
		let mm = 0;
		while (nn !== this.size) {
			this.internal[mm++] = re[nn];
			this.internal[mm++] = -im[nn++];
		}
		this.internal[1] = re[this.size / 2];

		this.trans.rdft(this.size, this.trans.DIRECTION.BACKWARDS, this.internal.buffer, this.ip.buffer, this.w.buffer);

		const data = new Float64Array(dataBuffer);
		data.set(this.internal.map(x => x * 2 / this.size));
	}

	xfftComplex(direction, reIpBuffer, imIpBuffer, reOpBuffer, imOpBuffer) {
		const reIp = new Float64Array(reIpBuffer);
		const imIp = new Float64Array(imIpBuffer);
		const reOp = new Float64Array(reOpBuffer);
		const imOp = new Float64Array(imOpBuffer);

		// Pack complex input into buffer
		let nn = 0;
		let mm = 0;
		while (nn !== this.size) {
			this.internal[mm++] = reIp[nn];
			this.internal[mm++] = -imIp[nn++];
		}

		this.trans.cdft(this.size, direction, this.internal.buffer, this.ip.buffer, this.w.buffer);

		// De-interleave data into output
		nn = 0;
		mm = 0;
		while (nn !== this.size) {
			reOp[nn] = this.internal[mm++];
			imOp[nn++] = -this.internal[mm++];
		}
	}

	fftComplex(reIpBuffer, imIpBuffer, reOpBuffer, imOpBuffer) {
		this.xfftComplex(this.trans.DIRECTION.FORWARDS, reIpBuffer, imIpBuffer, reOpBuffer, imOpBuffer);
	}

	ifftComplex(reIpBuffer, imIpBuffer, reOpBuffer, imOpBuffer) {
		this.xfftComplex(this.trans.DIRECTION.BACKWARDS, reIpBuffer, imIpBuffer, reOpBuffer, imOpBuffer);
		const reOp = new Float64Array(reOpBuffer);
		const imOp = new Float64Array(imOpBuffer);
		for (let nn = 0; nn < this.size / 2; ++nn) {
			reOp[nn] = reOp[nn] * 2 / this.size;
			imOp[nn] = imOp[nn] * 2 / this.size;
		}
	}

	// Below: No-nonsense thin wrappers around the interleaved in-place data
	// representation with no scaling, for maximum throughput.
	fftInPlaceReal(dataBuffer) {
		this.trans.rdft(this.size, this.trans.DIRECTION.FORWARDS, dataBuffer, this.ip.buffer, this.w.buffer);
	}

	fftInPlaceComplex(dataBuffer) {
		this.trans.cdft(this.size, this.trans.DIRECTION.FORWARDS, dataBuffer, this.ip.buffer, this.w.buffer);
	}

	ifftInPlaceReal(dataBuffer) {
		this.trans.rdft(this.size, this.trans.DIRECTION.BACKWARDS, dataBuffer, this.ip.buffer, this.w.buffer);
	}

	ifftInPlaceComplex(dataBuffer) {
		this.trans.cdft(this.size, this.trans.DIRECTION.BACKWARDS, dataBuffer, this.ip.buffer, this.w.buffer);
	}

}
module.exports = Ooura;
