var Ooura = require('../ooura.js')

describe("During object setup", function () {

    it("should create a valid object with correct size", function () {
        const testSize = 32
        let oo = new Ooura(testSize);
        expect(oo.size).toBe(testSize);
        console.log("ip " + oo.ip);
        console.log("w " + oo.w);

        let data = new Float64Array([1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]);
        let dataOut = new Float64Array(testSize);
        let re = new Float64Array(oo.getComplexSize());
        let im = new Float64Array(Ooura.complexSize(testSize));
        oo.fft(data.buffer, re.buffer, im.buffer);
        console.log("buffer " + oo.internal);
        console.log("re " + re);
        console.log("im " + im);
        oo.ifft(dataOut.buffer, re.buffer, im.buffer);
        console.log("buffer " + oo.internal);
        console.log("data out " + dataOut);

    });
});
