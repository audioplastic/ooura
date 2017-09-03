const Ooura = require('../ooura.js');

describe('During object setup', () => {
	it('should create a valid object with correct real-size and complex-size', () => {
		const testSize = 32;
		const oo = new Ooura(testSize);
		expect(oo.size).toBe(testSize);
		expect(oo.getVectorSize()).toBe(1 + testSize / 2);
	});

	it('should have a functional complex size static member helper', () => {
		expect(Ooura.vectorSize(32)).toBe(17);
		expect(Ooura.vectorSize(128)).toBe(65);
	});

	it('should have a functional real size static member helper', () => {
		expect(Ooura.scalarSize(17)).toBe(32);
		expect(Ooura.scalarSize(65)).toBe(128);
	});

	it('should have a functional pow2 member helper', () => {
		expect(Ooura.isPowerOf2(64)).toBeTruthy();
		expect(Ooura.isPowerOf2(8)).toBeTruthy();
		expect(Ooura.isPowerOf2(77)).toBeFalsy();
		expect(Ooura.isPowerOf2(123)).toBeFalsy();
		expect(Ooura.isPowerOf2('Marmot')).toBeFalsy();
	});

	it('should return correct array types from factory helpers', () => {
		const nfft = 512;
		oo = new Ooura(nfft);

		expect(oo.scalarArrayFactory()).toEqual(new Float64Array(nfft));
		expect(oo.vectorArrayFactory()).toEqual(new Float64Array(1 + nfft / 2));
	});
});
