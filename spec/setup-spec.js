var Ooura = require('../ooura.js')

describe("During object setup", function () {

    it("should create a valid object with correct size", function () {
        const testSize = 32
        let fft = new Ooura(testSize);
        expect(fft.size).toBe(testSize);
        console.log("ip " + fft.ip);
        console.log("w " + fft.w);

        let data = new Float64Array([1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]);
        let re = new Float64Array(fft.getComplexSize());
        let im = new Float64Array(Ooura.complexSize(testSize));
        fft.fft(data.buffer, re.buffer, im.buffer);
        console.log("buffer " + fft.buffer);
        console.log("re " + re);
        console.log("im " + im);
        // console.log("data " + data);

    });
});
