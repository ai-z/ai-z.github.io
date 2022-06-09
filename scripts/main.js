function WriteOutput(value) {
  var node = document.getElementById('test-output');
  node.innerHTML += value;
}

function WriteValue(id, value) {
  var node = document.getElementById(id);
  node.innerHTML = value;
}

function GetSelectedOption(id) {
  let e = document.getElementById(id);
  return e.options[e.selectedIndex].text;
}

async function StartTest() {

  if (typeof(Worker) == "undefined")
    return;

  if (typeof(w) == "undefined") {
    let backend = GetSelectedOption("opt-backend");
    let webglVersion = GetSelectedOption("opt-webglversion");
    let force16 = GetSelectedOption("opt-forcef16");

    w = new Worker(`./scripts/flops.js?backend=${backend}&webglVersion=${webglVersion}&force16=${force16}`);

    w.onmessage = function(event) {
      let result = event.data;
      WriteValue('tr-flops', `${result[0].toFixed(3)} GFlops/s`);
      WriteOutput("\n");
      WriteOutput(result[1]);
        
      w.terminate();
      w = undefined;
    };
    
    w.onerror = function(event) {
      //WriteOutput(event.data);
      console.log(event);
      w.terminate();
      w = undefined;
    };
  }    
}

function getBrowser(){                 
  let str = navigator.userAgent;
  
  if(str.match(/edg/i)) return "Edge";
  if(str.match(/chrome|chromium|crios/i)) return "Chrome";
  if(str.match(/firefox|fxios/i)) return "Firefox";
  if(str.match(/safari/i)) return "Safari";
  if(str.match(/opr\//i)) return "Opera";
  
  return "Unhknown";
}

function getOS() {
  let os_names = ["Windows NT 11.0", "Windows NT 10.0", "Linux", "Mac"];
  let str = window.navigator.userAgent;

  for (const n of os_names) {
    if(str.indexOf(n) != -1)
      return n;
  }

  return "Unknown";
}

function getGPU() {
  let canvas = document.getElementById("glcanvas");
  let gl = canvas.getContext("experimental-webgl");

  let info = gl.getExtension("WEBGL_debug_renderer_info");
  if (info != null)
    return gl.getParameter(info.UNMASKED_RENDERER_WEBGL); //dbgRenderInfo.UNMASKED_VENDOR_WEBGL

  return "Unknown";
}

function CreateDropDown(id, options, selected)
{
  let str = `<select id="${id}">`;
  let selected_str;

  for(let i=0 ; i < options.length; i++) {
    selected_str = "";
    if(options[i] == selected) {
      selected_str = "selected";
    }
    str += `<option value="${options[i]}" ${selected_str}>${options[i]}</option>`;
  }
  
  str += "</select>";

  return str;
}

function Init()
{ 
  //tf.engine().registryFactory
  let backend = tf.getBackend();
  let webgl_version = tf.env().get('WEBGL_VERSION');
  //console.log(webgl_version);
  let force_f16 = tf.env().get('WEBGL_FORCE_F16_TEXTURES');
  //console.log(force_f16);

  WriteValue('host-gpu', getGPU());
  WriteValue('host-os', getOS());
  WriteValue('host-browser', getBrowser());
  WriteValue('host-tfversion', tf.version["tfjs"]);
  WriteValue('host-tfbackend', CreateDropDown("opt-backend", ["webgl", "cpu"], backend));
  WriteValue('host-webglversion', CreateDropDown("opt-webglversion", [1, 2], webgl_version));
  WriteValue('host-forcef16', CreateDropDown("opt-forcef16", [true, false], force_f16));
  WriteValue('host-debug', tf.env().get('DEBUG'));
  WriteValue('WEBGL_MAX_TEXTURE_SIZE', tf.env().get('WEBGL_MAX_TEXTURE_SIZE'));
}

async function run() {
  if (typeof(Worker) == "undefined") {
    console.log("Your browser doesn't support Web workers - Tests won't work");
  }
}

document.addEventListener('DOMContentLoaded', run);

Init();
