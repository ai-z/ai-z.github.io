function fnBrowserDetect(){
                 
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


function getUnmaskedInfo(gl) {
  var unMaskedInfo = {
    renderer: '',
    vendor: ''
  };

  var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
  if (dbgRenderInfo != null) {
    unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
    unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
  }

  return unMaskedInfo;
}

function WriteValue(id, value) {
  var node = document.getElementById(id);
  node.innerHTML = value;
}

//==========================================================
var canvas;
canvas = document.getElementById("glcanvas");
var gl = canvas.getContext("experimental-webgl");

//make sure the backend is created
tf.backend();

tf.setBackend('webgpu');

//WriteValue('host-gpu', getUnmaskedInfo(gl).renderer)

test = "<select name='cars' id='cars'> <option value='volvo'>Volvo</option> <option value='saab'>Saab</option> </select>"

WriteValue('host-gpu', test)
WriteValue('host-tfversion', tf.version["tfjs"])
WriteValue('host-tfbackend', tf.getBackend())
WriteValue('host-webglversion', tf.env().get('WEBGL_VERSION'))
WriteValue('host-forcef16', tf.env().get('WEBGL_FORCE_F16_TEXTURES'))
WriteValue('host-debug', tf.env().get('DEBUG'))


var node = document.getElementById('div-hostinfo');



