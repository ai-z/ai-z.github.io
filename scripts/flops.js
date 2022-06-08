async function FlopsTest() {

    importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js");
    importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm/dist/tf-backend-wasm.js");

    const matSize = 1024;
    const numIterations = 24;

    await tf.setBackend('wasm');

    let bestTime = Infinity;

    for(let i=0; i < numIterations; i++) {
        const mat1 = tf.randomUniform([matSize, matSize], 1, 2, tf.float32);
        const mat2 = tf.randomUniform([matSize, matSize], 1, 2, tf.float32);

        //var t0 = performance.now();
        
        const profile_info = await tf.profile(() => {
            let res = tf.matMul(mat1, mat2);
            res.dataSync();
            res.dispose();
        });
    
        //var t1 = performance.now();

        let totalKernelMs = 0;
        for (let j = 0; j < profile_info.kernels.length; j++) {
            totalKernelMs += profile_info.kernels[j].kernelTimeMs;
        }
        
        var time = (totalKernelMs) / 1000;

        if (time < bestTime)
            bestTime = time;
    
        mat1.dispose();
        mat2.dispose();
    }

    totalFlops = 2 * Math.pow(matSize,3);
    gflops = 1.0e-9 * totalFlops / bestTime;

    postMessage(gflops);
}

FlopsTest();