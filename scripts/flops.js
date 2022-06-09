var debug_tab = "     ";

async function FlopsTest() {

    importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js");
    //importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm/dist/tf-backend-wasm.js");

    const matSize = 1024;
    const numIterations = 24;

    var parameters = {}
    location.search.slice(1).split("&").forEach( function(key_value) { var kv = key_value.split("="); parameters[kv[0]] = kv[1]; })

    let backend = parameters['backend'];
    let webglVersion = Number(parameters['webglVersion']);
    let force16 = Boolean(parameters['force16']);



    //console.log(backend);
    //console.log(webglVersion);
    //console.log(force16);
  

    //try {
        await tf.setBackend(backend);
        tf.env().set('WEBGL_VERSION', webglVersion);
        tf.env().set('WEBGL_FORCE_F16_TEXTURES', force16);
    //}
    //catch(error) {
    //    throw new Error('Error applying parameters'); 
    //}
    

    let bestTime = Infinity;
    let debugOutput = "";

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

        debugOutput = "FLOPs kernel time(s):\n";
        let totalKernelMs = 0;
        for (let j = 0; j < profile_info.kernels.length; j++) {
            totalKernelMs += profile_info.kernels[j].kernelTimeMs;
            debugOutput += debug_tab + profile_info.kernels[j].name + ": " + totalKernelMs.toString() + " ms\n";
        }

        debugOutput += debug_tab + "Total: " + totalKernelMs + " ms\n";
        
        let time = (totalKernelMs) / 1000;

        if (time < bestTime)
            bestTime = time;
    
        mat1.dispose();
        mat2.dispose();
    }

    totalFlops = 2 * Math.pow(matSize,3);
    gflops = 1.0e-9 * totalFlops / bestTime;

    debugOutput += debug_tab + "Result: " + gflops + " gflop/s";

    postMessage([gflops, debugOutput]);
}

FlopsTest();