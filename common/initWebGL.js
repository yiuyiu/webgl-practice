export default function initWebGL(vertex, fragment) {
  const canvas = document.querySelector("canvas");
  const gl = canvas.getContext("webgl");
  gl.clearColor(1, 0.5, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertex);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragment);
  gl.compileShader(fragmentShader);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);
  return gl;
}
