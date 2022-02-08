var gl;
var theta;
var thetaLoc;
var direction = true;
var rotation = false;
var delay = 500;
var tlocx;
var tx = 0;
var tlocy;
var ty = 0;
var color;
var red = 0.0;
var blue = 0.0;
var green = 0.0;
var menu = document.getElementById("mymenu");
var directionButton = document.getElementById("Direction_Button");
var rotationButton = document.getElementById("Stop_Rotation_Button");

window.onload = function init() {
  const canvas = document.querySelector("#glcanvas");
  // Initialize the GL context
  gl = canvas.getContext("webgl");
  // Only continue if WebGL is available and working
  if (!gl) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);
  menu.addEventListener("click", function () {
    switch (menu.selectedIndex) {
      case 0:
        red = 0.0;
        blue = 0.0;
        green = 0.0;
        break;
      case 1:
        blue = 1.0;
        red = 0.0;
        green = 0.0;
        break;
      case 2:
        green = 1.0;
        red = 0.0;
        blue = 0.0;
        break;
      case 3:
        green = 0.0;
        red = 1.0;
        blue = 0.0;
        break;
    }
  });
  document.getElementById("slide").onchange = function () {
    delay = this.value;
  };

  directionButton.addEventListener("click", function () {
    direction = !direction;
  });

  rotationButton.addEventListener("click", function () {
    rotation = !rotation;
  });

  document.getElementById("tsliderx").onchange = function () {
    tx = this.value;
  };

  document.getElementById("tslidery").onchange = function () {
    ty = this.value;
  };

  var vertices = [
    vec2(-0.5, 0.6),
    vec2(-0.4, 0.6),
    vec2(-0.4, 0.0),
    vec2(-0.5, 0.6),
    vec2(-0.5, 0.0),
    vec2(-0.4, 0.0),
    vec2(-0.4, 0.1),
    vec2(-0.4, 0.0),
    vec2(-0.05, 0.0),
    vec2(-0.4, 0.1),
    vec2(-0.05, 0.1),
    vec2(-0.05, 0.0),
    vec2(-0.4, 0.35),
    vec2(-0.4, 0.25),
    vec2(-0.05, 0.25),
    vec2(-0.4, 0.35),
    vec2(-0.05, 0.35),
    vec2(-0.05, 0.25),
    vec2(-0.4, 0.6),
    vec2(-0.4, 0.5),
    vec2(-0.05, 0.5),
    vec2(-0.4, 0.6),
    vec2(-0.05, 0.6),
    vec2(-0.05, 0.5),

    vec2(0.3, 0.6),
    vec2(0.4, 0.6),
    vec2(0.4, 0.0),
    vec2(0.3, 0.6),
    vec2(0.3, 0.0),
    vec2(0.4, 0.0),
    vec2(0.4, 0.1),
    vec2(0.4, 0.0),
    vec2(0.7, 0.0),
    vec2(0.4, 0.1),
    vec2(0.7, 0.1),
    vec2(0.7, 0.0),
    vec2(0.8, 0.6),
    vec2(0.7, 0.6),
    vec2(0.7, 0.0),
    vec2(0.8, 0.6),
    vec2(0.8, 0.0),
    vec2(0.7, 0.0),
  ];

  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
  // Associate out shader variables with our data buffer
  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  color = gl.getUniformLocation(program, "color");
  thetaLoc = gl.getUniformLocation(program, "theta");
  theta = 0;
  gl.uniform1f(thetaLoc, theta);
  tlocx = gl.getUniformLocation(program, "translatex");
  tlocy = gl.getUniformLocation(program, "translatey");
  // Set clear color to black, fully opaque
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  render();
};

function render() {
  // Clear the color buffer with specified clear color
  setTimeout(function () {
    requestAnimationFrame(render);
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (rotation) {
      theta += direction ? 0.1 : -0.1;
      gl.uniform1f(thetaLoc, theta);
    }
    gl.uniform1f(tlocx, tx / 10);
    gl.uniform1f(tlocy, ty / 10);
    gl.uniform4f(color, red, green, blue, 1.0);
    gl.drawArrays(gl.TRIANGLES, 0, 70);
  }, delay);
}
