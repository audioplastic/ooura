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

exports.TestCorrectnessReal = function(reRef, imRef) {
    assert.equal(reRef.length, imRef.length);
    const size=Ooura.scalarSize(reRef.length);

    let input = Float64Array.from(Array(size), (e,i)=>i+1); //fancy-pants way of making 1,2,3, . .

    let oo = new Ooura(size);
    let re = oo.vectorArrayFactory();
    let im = oo.vectorArrayFactory();
    let result = new Object;

    oo.fft(input.buffer, re.buffer, im.buffer);

    result.reDiffs = exports.CheckBuffers(re, reRef);
    result.imDiffs = exports.CheckBuffers(im, imRef);

    let backwards = oo.scalarArrayFactory();
    oo.ifft(backwards.buffer, re.buffer, im.buffer);
    result.reverseDiffs = exports.CheckBuffers(backwards, input);

    return result;
};

exports.TestCorrectnessComplex = function(reRef, imRef) {
    assert.equal(reRef.length, imRef.length);
    const size=reRef.length+imRef.length;

    let reIp = Float64Array.from(Array(size/2), (e,i)=>i+1); //fancy-pants way of making 1,2,3, . .
    let imIp = Float64Array.from(Array(size/2), (e,i)=>i+1);
    imIp = imIp.map(x=>x+1);

    let oo = new Ooura(size, {"type":"complex", "radix":4} );
    let reOp = new Float64Array(size/2);
    let imOp = new Float64Array(size/2);
    let result = new Object;

    oo.fft(reIp.buffer, imIp.buffer, reOp.buffer, imOp.buffer);

    result.reDiffsForwards = exports.CheckBuffers(reOp, reRef);
    result.imDiffsForwards = exports.CheckBuffers(imOp, imRef);

    let reBk = new Float64Array(size/2);
    let imBk = new Float64Array(size/2);

    oo.ifft(reOp.buffer, imOp.buffer, reBk.buffer, imBk.buffer);
    result.reDiffsBackwards = exports.CheckBuffers(reBk, reIp);
    result.imDiffsBackwards = exports.CheckBuffers(imBk, imIp);

    // console.log(reBk)
    // console.log(imBk)

    return result;
};
