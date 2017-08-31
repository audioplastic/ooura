describe("For the readme example", function () {

    it("should actually work without crashing", function () {
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
});
