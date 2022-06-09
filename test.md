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
    <tr> <td>GPU</td> <td id="host-gpu"></td> </tr>
    <tr> <td>OS</td> <td id="host-os"></td> </tr>
    <tr> <td>BROWSER</td> <td id="host-browser"></td> </tr>
    <tr> <td>TFJS VERSION</td> <td id='host-tfversion'></td></tr>
    <tr> <td>BACKEND</td> <td id='host-tfbackend'></td> </tr>
    <tr> <td>WEBGL_VERSION</td> <td id='host-webglversion'></td> </tr>
    <tr> <td>WEBGL_FORCE_F16_TEXTURES</td> <td id='host-forcef16'></td> </tr>
    <tr> <td>DEBUG</td> <td id='host-debug'></td> </tr>
    <tr> <td>WEBGL_MAX_TEXTURE_SIZE</td> <td id='WEBGL_MAX_TEXTURE_SIZE'></td> </tr>
  </table>
  </div>

<!-- Canvas is needed to get GPU info -->
<canvas id="glcanvas" width="0" height="0"> </canvas>


<!-- ===================================================  -->
<!-- Output                                                 -->
<!-- ===================================================  -->
<h3> Debug Output</h3>

<texarea type="text" id='test-output' style="white-space: pre-wrap;">

<script src="scripts/main.js"></script>
