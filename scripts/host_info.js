function getBrowser(){
                 
  let userAgent = navigator.userAgent;
  let browserName;
  
  if(userAgent.match(/chrome|chromium|crios/i)){
      browserName = "chrome";
    }else if(userAgent.match(/firefox|fxios/i)){
      browserName = "firefox";
    }  else if(userAgent.match(/safari/i)){
      browserName = "safari";
    }else if(userAgent.match(/opr\//i)){
      browserName = "opera";
    } else if(userAgent.match(/edg/i)){
      browserName = "edge";
    }else{
      browserName="No browser detection";
    }
  
   return browserName;
}

function getOS() {

  let os_names = ["Windows NT 11.0", "Windows NT 10.0", "Linux", "Mac"];

  let str = window.navigator.userAgent;

  for (n in os_names) {
    if(str.indexOf(n) != 1)
      return n;
  }

  return "Unknown";
}


function getGPU() {
  var canvas;
  canvas = document.getElementById("glcanvas");
  var gl = canvas.getContext("experimental-webgl");

  var unMaskedInfo = {
    renderer: '',
    vendor: ''
  };

  var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
  if (dbgRenderInfo != null) {
    unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
    unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
  }

  return unMaskedInfo.renderer;
}

function WriteValue(id, value) {
  var node = document.getElementById(id);
  node.innerHTML = value;
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
WriteValue('host-tfbackend', tf.getBackend())
WriteValue('host-webglversion', tf.env().get('WEBGL_VERSION'))
WriteValue('host-forcef16', tf.env().get('WEBGL_FORCE_F16_TEXTURES'))
WriteValue('host-debug', tf.env().get('DEBUG'))


var node = document.getElementById('div-hostinfo');



