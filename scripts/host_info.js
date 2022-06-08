function getBrowser(){                 
  let str = navigator.userAgent;
  
  if(str.match(/chrome|chromium|crios/i)) return "Chrome";
  if(str.match(/firefox|fxios/i)) return "firefox";
  if(str.match(/safari/i)) return "safari";
  if(str.match(/opr\//i)) return "opera";
  if(str.match(/edg/i)) return "edge";
  
  return "Unhknown";
}

function getOS() {
  let os_names = ["Windows NT 11.0", "Windows NT 10.0", "Linux", "Mac"];
  let str = window.navigator.userAgent;

  for (const n of os_names) {
    if(str.indexOf(n) != 1)
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

function WriteValue(id, value) {
  var node = document.getElementById(id);
  node.innerHTML = value;
}

function CreateDropDown(id, options)
{
  let str = "<select>"
  
  for(let i=0 ; i < options.length; i++)
    str += `<option value="${options[i]}">${options[i]}</option>`;
  
  str += "</select>";

  return str;
}

//==========================================================


//make sure the backend is created
tf.backend();

tf.setBackend('webgpu');


test = "<select name='cars' id='cars'> <option value='volvo'>Volvo</option> <option value='saab'>Saab</option> </select>"

WriteValue('host-gpu', getGPU())
WriteValue('host-os', getOS())
WriteValue('host-browser', getBrowser())
WriteValue('host-tfversion', tf.version["tfjs"])
WriteValue('host-tfbackend', CreateDropDown(test, ["webgl", "cpu"]))
WriteValue('host-webglversion', tf.env().get('WEBGL_VERSION'))
WriteValue('host-forcef16', tf.env().get('WEBGL_FORCE_F16_TEXTURES'))
WriteValue('host-debug', tf.env().get('DEBUG'))


var node = document.getElementById('div-hostinfo');



