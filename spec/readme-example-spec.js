describe('For the readme example', () => {
	it('should actually work without crashing - REAL', () => {
		const ooura = require('../ooura.js');

        // Set up an input signal of size 8;
		const input = new Float64Array([1, 2, 3, 4, 1, 2, 3, 4]);

        // Set up the fft object and use a helper to generate an output array
        // of corrct length and type.
		const oo = new ooura(input.length);
		const output = oo.scalarArrayFactory();

        // Helper to get single sided complex arrays
		const re = oo.vectorArrayFactory();
		const im = oo.vectorArrayFactory();

        // Do some FFTing in both directions
        // note: reference underlying array buffers for in-place processing
		oo.fft(input.buffer, re.buffer, im.buffer);   // Populates re and im from input
		oo.ifft(output.buffer, re.buffer, im.buffer); // Populates output from re and im

        // look at the results and intermediate representation
        /*
        console.log("ip = " + input);
        console.log("re = " + re);
        console.log("im = " + im);
        console.log("op = " + output);
        */
	});

	it('should actually work without crashing - COMPLEX', () => {
		const ooura = require('../ooura.js');

        // Set up an input signal real and imag components
		const reInput = new Float64Array([1, 2, 3, 4]);
		const imInput = new Float64Array([2, 3, 4, 5]);

        // Set up the fft object and the empty arrays for transform results
		const oo = new ooura(reInput.length * 2, {type: 'complex', radix: 4});
		const reOutput = new Float64Array(oo.size / 2);
		const imOutput = new Float64Array(oo.size / 2);
		const reBack = new Float64Array(oo.size / 2);
		const imBack = new Float64Array(oo.size / 2);

        // Do some FFTing in both directions
        // note: reference underlying array buffers for in-place processing
		oo.fft(reInput.buffer, imInput.buffer, reOutput.buffer, imOutput.buffer);   // Populates re and im from input
		oo.ifft(reOutput.buffer, imOutput.buffer, reBack.buffer, imBack.buffer); // Populates output from re and im

        // look at the results and intermediate representation
        /* console.log("real input = " + reInput);
        console.log("imag input = " + imInput);

        console.log("re transformed = " + reOutput);
        console.log("im transformed = " + imOutput);

        console.log("re inverse transformed = " + reBack);
        console.log("im inverse transformed = " + imBack); */
	});
});
