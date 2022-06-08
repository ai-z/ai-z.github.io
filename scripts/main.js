

function WriteOutput(value) {
  var node = document.getElementById('test-output');
  node.innerHTML += value;
}

async function StartTest() {

  if (typeof(Worker) !== "undefined") {
    if (typeof(w) == "undefined") {
      w = new Worker("./scripts/flops.js");
    }

    w.onmessage = function(event) {
      let gflops = event.data;
      WriteValue('tr-flops', `${gflops.toFixed(3)} GFlops/s`);
      WriteOutput(event.data);
      WriteOutput(JSON.stringify(tf.env().getFlags(), null, 10));
      WriteOutput(JSON.stringify(tf.version, null, 2));
  
      console.log(tf.env().getFlags());
      console.log(tf.version);
      w.terminate();
    };
  
    w.onerror = function(event) {
      //WriteOutput(event.data);
      console.log(event);
      w.terminate();
    };
  }
}

async function run() {
  if (typeof(Worker) == "undefined") {
    console.log("Your browser doesn't support Web workers - Tests won't work");
  }
}

document.addEventListener('DOMContentLoaded', run);









      