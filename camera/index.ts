import { initWebGL, ui } from "common";
import vertex from "./vertex.glsl";
import vertexPerpective from "./vertexPerpective.glsl";
import fragment from "./fragment.glsl";
import { transform } from "../common";
import { cubeColors, cubePositions } from "../common/data";

function initData(gl: WebGLRenderingContext, program: WebGLProgram) {
  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubePositions), gl.STATIC_DRAW);
  const posLocation = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(posLocation);
  gl.vertexAttribPointer(posLocation, 3, gl.FLOAT, false, 0, 0);
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeColors), gl.STATIC_DRAW);
  const colorLocation = gl.getAttribLocation(program, 'a_color');
  gl.enableVertexAttribArray(colorLocation);
  gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
}

function init() {
  const { gl, program } = initWebGL(vertex, fragment);
  const { gl: gl2, program: program2 } = initWebGL(vertex, fragment, '#canvas2');
  let matrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,];
  let orthoMatrix = transform.orthographic(-2000, 2000, -2000, 2000, -2000, 2000);
  let rotationInRadians = [0, 0, 0];
  let translation = [0, 0, -500];
  let camera = [0,0,800];
  let fieldOfViewInRadians = degToRad(100);
  let zNear = 1;
  let zFar = 2000;
  const target = [0, 0, 0];
  initUi();
  initData(gl, program);
  initData(gl2, program2);
  draw(gl, program);
  draw(gl2, program2, true);
  function radToDeg(r) {
    return r * 180 / Math.PI;
  }

  function degToRad(d) {
    return d * Math.PI / 180;
  }
  function initUi() {
    ui.setupSlider("#x", { value: translation[0], slide: translate(0), max: 2000, min: -2000 });
    ui.setupSlider("#y", { value: translation[1], slide: translate(1), max: 2000, min: -2000 });
    ui.setupSlider("#z", { value: translation[2], slide: translate(2), max: 2000, min: -4000 });
    ui.setupSlider('#angleX', { slide: rotateX, value: rotationInRadians[0], max: 360 });
    ui.setupSlider('#angleY', { slide: rotateY, value: rotationInRadians[1], max: 360 });
    ui.setupSlider('#angleZ', { slide: rotateZ, value: rotationInRadians[2], max: 360 });
    ui.setupSlider('#fieldOfView', { slide: updateFieldOfView, value: radToDeg(fieldOfViewInRadians), max: 180, min: 0 })
    ui.setupSlider('#zNear', { slide: updateZNear, value: zNear, max: 2000, min: 1 })
    ui.setupSlider('#zFar', { slide: updateZFar, value: zFar, max: 5000, min: 1000 });
    // ui.setupInput('#inputs', {
    //   input: updateCamera,
    //   name: "camera",
    //   value: camera
    // })
    ui.setupSlider('#cameraX', {
      slide: updateCamera(0),
      value: camera[0],
      min: 0,
      max: 5000
    });
    ui.setupSlider('#cameraY', {
      slide: updateCamera(1),
      value: camera[1],
      min: 0,
      max: 5000
      
    });
    ui.setupSlider('#cameraZ', {
      slide: updateCamera(2),
      value: camera[2],
      min: 0,
      max: 5000
    })
  }
  function updateCamera(index){
    return function(event, ui){
      camera[index] = ui.value;
      draw(gl, program);
      draw(gl2, program2, true);
    }
  }
  // function updateCamera(event, ui) {
  //   const [x, y, z] = ui.value.split(',');
  //   if (typeof +x === 'number' && typeof +y === 'number' && typeof +z === 'number') {
  //     camera = ui.value;
  //     draw(gl2, program2, true)
  //     // draw(gl3, program3, true);
  //   }
  // }
  function updateZNear(event, ui) {
    zNear = ui.value;
    draw(gl2, program2, true)
  }
  function updateZFar(event, ui) {
    zFar = ui.value;
    draw(gl2, program2, true)
  }
  function translate(index) {
    return (event, ui) => {
      translation[index] = ui.value;
      draw(gl, program);
      draw(gl2, program2, true);
    }
  }
  function updateFieldOfView(event, ui) {
    fieldOfViewInRadians = degToRad(ui.value);
    draw(gl2, program2, true)
  }
  function rotateX(event, ui) {
    var angleInDegrees = ui.value;
    var angleInRadians = angleInDegrees * Math.PI / 180;
    rotationInRadians[0] = angleInRadians;
    draw(gl, program);
    draw(gl2, program2, true);

  }
  function rotateY(event, ui) {
    var angleInDegrees = ui.value;
    var angleInRadians = angleInDegrees * Math.PI / 180;
    rotationInRadians[1] = angleInRadians;
    draw(gl, program);
    draw(gl2, program2, true);

  }
  function rotateZ(event, ui) {
    var angleInDegrees = ui.value;
    var angleInRadians = angleInDegrees * Math.PI / 180;
    rotationInRadians[2] = angleInRadians;
    draw(gl, program);
    draw(gl2, program2, true);

  }
  function draw(gl: WebGLRenderingContext, program: WebGLProgram, isPerspective?: boolean) {
    gl.clearColor(0.92, 0.92, 0.92, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.disable(gl.CULL_FACE);
    const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
    let transformedMatrix = transform.lookAt(camera, target, [0, 1, 0]);
    transformedMatrix = transform.inverse(transformedMatrix);
    if (isPerspective) {
      transformedMatrix = transform.multiply(transform.perspective(fieldOfViewInRadians, 1, zNear, zFar), transformedMatrix);
    } else {
      transformedMatrix = transform.multiply(orthoMatrix, transformedMatrix);
    }
    transformedMatrix = transform.multiply(transformedMatrix, transform.translation(translation[0], translation[1], translation[2]));
    transformedMatrix = transform.multiply(transformedMatrix, transform.xRotation(rotationInRadians[0]));
    transformedMatrix = transform.multiply(transformedMatrix, transform.yRotation(rotationInRadians[1]));
    transformedMatrix = transform.multiply(transformedMatrix, transform.zRotation(rotationInRadians[2]));

    gl.uniformMatrix4fv(matrixLocation, false, transformedMatrix);
    gl.drawArrays(gl.TRIANGLES, 0, 6 * 6)
  }
}
init();