var Ooura = require('../ooura.js')

describe("During object setup", function () {

    it("should create a valid object with correct real-size and complex-size", function () {
        const testSize = 32
        let oo = new Ooura(testSize);
        expect(oo.size).toBe(testSize);
        expect(oo.getComplexSize()).toBe(1+ testSize/2);
    });

    it("should have a functional complex size static member helper", function () {
        expect(Ooura.complexSize(32)).toBe(17);
        expect(Ooura.complexSize(128)).toBe(65);
    });

    it("should have a functional real size static member helper", function () {
        expect(Ooura.realSize(17)).toBe(32);
        expect(Ooura.realSize(65)).toBe(128);
    });

    it("should have a functional pow2 member helper", function () {
        expect(Ooura.isPowerOf2(64)).toBeTruthy();
        expect(Ooura.isPowerOf2(8)).toBeTruthy();
        expect(Ooura.isPowerOf2(77)).toBeFalsy();
        expect(Ooura.isPowerOf2(123)).toBeFalsy();
        expect(Ooura.isPowerOf2("Marmot")).toBeFalsy();
    });
});
