---
layout: default
title:  "Test"
permalink: /test
tags: [tensorflow.js, gflops, performance, test, benchmark]
---


<!-- ===================================================  -->
<!-- Test Results                                          -->
<!-- ===================================================  -->
<div id='div-testresults'>
  <table id='table-hostinfo' border='1'>
    <tr>
      <th>Test</th>
      <th>Results</th>
    </tr>
    <tr>
      <td><button onclick="StartTest()">FLOPs</button></td>
      <td id="tr-flops"></td>
    </tr>
  </table>


<!-- ===================================================  -->
<!-- Parameters                                           -->
<!-- ===================================================  -->
<h3> Parameters </h3>
<div id='div-hostinfo'>
  <table id='table-hostinfo' border='1' border-width='2px'>
    <tr>
      <td>GPU</td>
      <td id="host-gpu"></td>

    </tr>
    <tr>
      <td>TF Version</td>
      <td id='host-tfversion'></td>
    </tr>
    <tr>
      <td>TF Backend</td>
      <td id='host-tfbackend'></td>
    </tr>
    <tr>
      <td>WebGL version</td>
      <td id='host-webglversion'></td>
    </tr>
    <tr>
      <td>Force f16 textures</td>
      <td id='host-forcef16'></td>
    </tr>
    <tr>
      <td>Debug Mode</td>
      <td id='host-debug'></td>
    </tr>
  </table>


  
    <canvas id="glcanvas" width="0" height="0">
      <script src="scripts/host_info.js"></script>
    </canvas>
  </div>





<!-- ===================================================  -->
<!-- Output                                                 -->
<!-- ===================================================  -->
<h3> Debug Output</h3>


<texarea type="text" id='test-output'>



<script src="scripts/main.js"></script>
<script src="scripts/matmul.js"></script>
<script src="scripts/mnist.js"></script>
<script src="scripts/demo_worker.js"></script>