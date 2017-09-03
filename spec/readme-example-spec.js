describe("For the readme example", function () {

    it("should actually work without crashing - REAL", function () {
        var ooura = require('../ooura.js');

        // Set up an input signal of size 8;
        let input = new Float64Array([1,2,3,4,1,2,3,4]);

        // Set up the fft object and use a helper to generate an output array
        // of corrct length and type.
        let oo = new ooura(input.length);
        let output = oo.scalarArrayFactory();

        //helper to get single sided complex arrays
        let re = oo.vectorArrayFactory();
        let im = oo.vectorArrayFactory();

        //do some FFTing in both directions
        //note: reference underlying array buffers for in-place processing
        oo.fft(input.buffer, re.buffer, im.buffer);   //populates re and im from input
        oo.ifft(output.buffer, re.buffer, im.buffer); //populates output from re and im

        // look at the results and intermediate representation
        /*
        console.log("ip = " + input);
        console.log("re = " + re);
        console.log("im = " + im);
        console.log("op = " + output);
        */
    });

    it("should actually work without crashing - COMPLEX", function () {
        var ooura = require('../ooura.js');

        // Set up an input signal real and imag components
        let reInput = new Float64Array([1,2,3,4]);
        let imInput = new Float64Array([2,3,4,5]);

        // Set up the fft object and the empty arrays for transform results
        let oo = new ooura(reInput.length*2, {"type":"complex", "radix":4});
        let reOutput = new Float64Array(oo.size/2);
        let imOutput = new Float64Array(oo.size/2);
        let reBack = new Float64Array(oo.size/2);
        let imBack = new Float64Array(oo.size/2);

        //do some FFTing in both directions
        //note: reference underlying array buffers for in-place processing
        oo.fft(reInput.buffer, imInput.buffer, reOutput.buffer, imOutput.buffer);   //populates re and im from input
        oo.ifft(reOutput.buffer, imOutput.buffer, reBack.buffer, imBack.buffer); //populates output from re and im

        // look at the results and intermediate representation
        /*console.log("real input = " + reInput);
        console.log("imag input = " + imInput);

        console.log("re transformed = " + reOutput);
        console.log("im transformed = " + imOutput);

        console.log("re inverse transformed = " + reBack);
        console.log("im inverse transformed = " + imBack);*/
    });
});
