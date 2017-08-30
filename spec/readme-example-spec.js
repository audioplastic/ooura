describe("For the readme example", function () {

    it("should actually work without crashing", function () {
        var Ooura = require('../ooura.js');

        // Set up an input signal of zise 8;
        let input = new Float64Array([1,2,3,4,1,2,3,4])
        const nfft = input.length;
        let output = new Float64Array(nfft);

        //helper to get single sided complex size
        const nclx = Ooura.complexSize(nfft);
        let re = new Float64Array(nclx);
        let im = new Float64Array(nclx);

        //initialise an fft of fixed length
        let oo = new Ooura(nfft);

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
