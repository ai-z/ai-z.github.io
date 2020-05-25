async function MatMulTest() {
    const matSize = 4 * 1024;

    const mat1 = tf.randomUniform([matSize, matSize], 1, 2, tf.float32);
    const mat2 = tf.randomUniform([matSize, matSize], 1, 2, tf.float32);
    WriteOutput(`Created two [${matSize},${matSize}] matrices filled with ones <br>`);


    var t0 = performance.now();
    const matmulTime = await tf.time(() => tf.matMul(mat1, mat2));
    //const result =  tf.matMul(mat1, mat2).dataSync();
    var t1 = performance.now();

    WriteOutput(`matmulTime ${matmulTime.kernelMs} ms <br>`);
    
    var time = matmulTime.kernelMs / 1000;
    //var time = (t1 - t0) / 1000

    totalFlops = 2 * Math.pow(matSize,3);
    gflops = 1.0e-9 * totalFlops / time;
    WriteOutput(gflops + " GFlops <br>");
    WriteValue('tr-matmul', `${time.toFixed(3)} s  <br> ${gflops.toFixed(3)} GFlops/s`);

    mat1.dispose();
    mat2.dispose();
}
  