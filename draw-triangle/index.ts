// import './style.css'
import { initWebGL } from 'common'
import vertex from './vert.glsl';
import fragment from './fragment.glsl';
const position = [
  0, 0.5,
  1.0, 0.0,
  0, 0,
  0.0, 0.5,
  1.0, 0.0,
  1.0, 0.5];
var r1 = Math.random();
var b1 = Math.random();
var g1 = Math.random();
var r2 = Math.random();
var b2 = Math.random();
var g2 = Math.random();
const colors = [
  r1, b1, g1,
  r1, b1, g1,
  r1, b1, g1,
  r2, b2, g2,
  r2, b2, g2,
  r2, b2, g2
]
function initData(gl: WebGLRenderingContext, program: WebGLProgram) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);

  const xixiLocation = gl.getAttribLocation(program, 'a_xixi');
  gl.enableVertexAttribArray(xixiLocation);
  gl.vertexAttribPointer(xixiLocation, 2, gl.FLOAT, false, 0, 0);

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  const colorLocation = gl.getAttribLocation(program, 'a_color');
  gl.enableVertexAttribArray(colorLocation);
  gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
}
function draw(gl) {
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
function init() {
  const { gl, program } = initWebGL(vertex, fragment);
  initData(gl, program);
  draw(gl);
}
init();
