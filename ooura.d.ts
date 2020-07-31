export = Ooura;

declare type Info = {
    type:"real"|"complex";
    radix:number;
}

type FFT = {
    (dataBuffer:ArrayBufferLike, reBuffer:ArrayBufferLike, imBuffer:ArrayBufferLike): void;
    (reIpBuffer:ArrayBufferLike, imIpBuffer:ArrayBufferLike, reOpBuffer:ArrayBufferLike, imOpBuffer:ArrayBufferLike): void;
}

declare class Ooura {
    constructor(size:number, info?:Info);

    size:number;

    scalarArrayFactory():Float64Array;
    vectorArrayFactory():Float64Array;

    fft:FFT;
    ifft:FFT;
    fftInPlace:FFT;
    ifftInPlace:FFT; 
}