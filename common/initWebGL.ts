export default function initWebGL(vertex, fragment, canvasSelector) {
  const canvas = document.querySelector(canvasSelector || "#canvas") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl");
  gl.clearColor(0.92, 0.92, 0.92, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);  // 不加这个即使是进行了深度测试还是能看到back face
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
  return { gl, program };
}
