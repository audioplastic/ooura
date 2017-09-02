var Ooura = require('../ooura.js')

describe("When using the in place functions", function () {

    it("should have a different real buffer in the forward direction, but return the original in reverse", function () {
        const nfft = 32;
        let oo = new Ooura(nfft);
        let data = Float64Array.from(Array(nfft), (e,i)=>i+1);
        let ref = Float64Array.from(Array(nfft), (e,i)=>i+1);
        oo.fftInPlace(data.buffer);
        expect(data).not.toEqual(ref);
        oo.ifftInPlace(data.buffer);

        // Little dirty - just round it or it fails with tiny numerical errors,
        // but it proves the general test case under consideration
        expect(data.map(x => Math.round(x * 2/nfft))).toEqual(ref);
    });

    it("should have a different complex buffer in the forward direction, but return the original in reverse", function () {
        const nfft = 32;
        let oo = new Ooura(nfft, {"type":"complex", "radix":4} );
        let data = Float64Array.from(Array(nfft), (e,i)=>i+1);
        let ref = Float64Array.from(Array(nfft), (e,i)=>i+1);
        oo.fftInPlace(data.buffer);
        expect(data).not.toEqual(ref);
        oo.ifftInPlace(data.buffer);

        // Little dirty - just round it or it fails with tiny numerical errors,
        // but it proves the general test case under consideration
        expect(data.map(x => Math.round(x * 2/nfft))).toEqual(ref);
    });
});
