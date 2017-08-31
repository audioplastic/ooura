const assert = require('assert');
var Ooura = require('../ooura.js')

const TOLERANCE = 1e-8;

exports.CheckBuffers = function(a, b) {
    assert.equal(a.length, b.length);
    let diffs = 0;
    for(let nn=0; nn<a.length; nn++) {
        if(Math.abs(a[nn] - b[nn])>TOLERANCE) {
            diffs++;
        }
    }
    return diffs;
}

exports.TestCorrectness = function(reRef, imRef) {
    assert.equal(reRef.length, imRef.length);
    const size=Ooura.realSize(reRef.length);

    let input = Float64Array.from(Array(size), (e,i)=>i+1); //fancy-pants way of making 1,2,3, . .

    let oo = new Ooura(size);
    let re = new Float64Array(oo.getComplexSize());
    let im = new Float64Array(oo.getComplexSize());
    let result = new Object;

    oo.fft(input.buffer, re.buffer, im.buffer);

    result.reDiffs = exports.CheckBuffers(re, reRef);
    result.imDiffs = exports.CheckBuffers(im, imRef);

    let backwards = new Float64Array(oo.getRealSize());
    oo.ifft(backwards.buffer, re.buffer, im.buffer);
    result.reverseDiffs = exports.CheckBuffers(backwards, input);

    return result;
};
