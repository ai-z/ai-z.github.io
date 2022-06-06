//<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.7.2/dist/tf.min.js"></script>

function MatMulTest() {

    

    importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js");

    const matSize = 4 * 1024;

    //WriteOutput('worker...');

    const mat1 = tf.randomUniform([matSize, matSize], 1, 2, tf.float32);
    const mat2 = tf.randomUniform([matSize, matSize], 1, 2, tf.float32);
    //WriteOutput(`3 Created two [${matSize},${matSize}] matrices filled with ones <br>`);


    var t0 = performance.now();
    const matmulTime = await tf.time(() => tf.matMul(mat1, mat2));
    //const result =  tf.matMul(mat1, mat2).dataSync();
    var t1 = performance.now();

    //WriteOutput(`matmul KernelMs ${matmulTime.kernelMs} ms <br>`);
    //WriteOutput(`matmul WallMs ${matmulTime.wallMs} ms <br>`);
    
    var time = matmulTime.kernelMs / 1000;
    //var time = (t1 - t0) / 1000

    postMessage(matmulTime.kernelMs);

    totalFlops = 2 * Math.pow(matSize,3);
    gflops = 1.0e-9 * totalFlops / time;
    //WriteOutput(gflops + " GFlops <br>");
    //WriteValue('tr-matmul', `${time.toFixed(3)} s  <br> ${gflops.toFixed(3)} GFlops/s`);

    mat1.dispose();
    mat2.dispose();
}

console.log("IN WORKER");
MatMulTest();