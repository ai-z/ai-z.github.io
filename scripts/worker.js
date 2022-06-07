//<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.7.2/dist/tf.min.js"></script>

async function MatMulTest() {

    

    importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js");

    const matSize = 2 * 1024;

    tf.setBackend('webgl');

    //WriteOutput('worker...');

    const mat1 = tf.randomUniform([matSize, matSize], 1, 2, tf.float32);
    const mat2 = tf.randomUniform([matSize, matSize], 1, 2, tf.float32);
    //WriteOutput(`3 Created two [${matSize},${matSize}] matrices filled with ones <br>`);


    var t0 = performance.now();
    
    const profile_info = await tf.profile(() => {
    let res = tf.matMul(mat1, mat2);
    res.dataSync();
    
    });
    
    //res.dataSync();
    //const result =  tf.matMul(mat1, mat2).dataSync();
    var t1 = performance.now();

    console.log(profile_info);

    //WriteOutput(`matmul KernelMs ${matmulTime.kernelMs} ms <br>`);
    //WriteOutput(`matmul WallMs ${matmulTime.wallMs} ms <br>`);
    
    var time = (profile_info.kernels[0].kernelTimeMs) / 1000;
    //var time = (t1 - t0) / 1000

    

    totalFlops = 2 * Math.pow(matSize,3);
    gflops = 1.0e-9 * totalFlops / time;
    //WriteOutput(gflops + " GFlops <br>");
    //WriteValue('tr-matmul', `${time.toFixed(3)} s  <br> ${gflops.toFixed(3)} GFlops/s`);

    postMessage(gflops);

    const profile = await tf.profile(() => {
        const x = tf.tensor1d([1, 2, 3]);
        let x2 = x.square();
        x2.dispose();
        x2 = x.square();
        x2.dispose();
        return x;
     });

    mat1.dispose();
    mat2.dispose();
}


MatMulTest();