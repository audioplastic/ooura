var Ooura = require('../ooura.js')

describe("During object setup", function () {

    it("should create a valid object with correct size", function () {
        const testSize = 32
        let fft = new Ooura(testSize);
        expect(fft.size).toBe(testSize);
        console.log("ip " + fft.ip);
        console.log("w " + fft.w);
    });
});
