import { initWebGL, ui } from "common";
import vertex from './vertex.glsl';
import fragment from './fragment.glsl';
import { cubeColors, cubeNormals, cubePositions } from "../common/data";
import { transform } from "../common";

function main() {
    const { gl, program } = initWebGL(vertex, fragment);
    const a = gl.getProgramInfoLog(program);
    const cameraPosition = [0, 0, 800];
    let shininess = 300;
    let limit = 30;
    const eyePosition = [0, 0, 800];
    const lightPostion = [0, 0, 500];
    const rotationInRadians = [0, 0, 0];
    const translation = [0, 0, -2000];
    const uniformViewProjectionMatrixPosition = gl.getUniformLocation(program, 'u_viewProjection');
    const uniformWorldPosition = gl.getUniformLocation(program, 'u_world');
    const uniformLightPosition = gl.getUniformLocation(program, 'u_light');
    const uniformEyePosition = gl.getUniformLocation(program, 'u_eyePosition');
    const uniformShininessPosition = gl.getUniformLocation(program, 'u_shininess');
    const uniformCosLimit = gl.getUniformLocation(program, 'u_cosLimit');
    const uniformLightDirection = gl.getUniformLocation(program, 'u_lightDirection');
    const uniformTransform = gl.getUniformLocation(program, 'u_transform');
    setData(gl, program);
    setUi();
    draw();
    function setUi() {
        ui.setupSlider("#x", { value: translation[0], slide: translate(0), max: 2000, min: -2000 });
        ui.setupSlider("#y", { value: translation[1], slide: translate(1), max: 2000, min: -2000 });
        ui.setupSlider("#z", { value: translation[2], slide: translate(2), max: 2000, min: -4000 });
        ui.setupSlider('#angleY', { slide: rotateY, value: rotationInRadians[1], max: 360 });
        ui.setupSlider('#lightX', { value: lightPostion[0], slide: setLight(0), max: 2000, min: -2000 });
        ui.setupSlider('#lightY', { value: lightPostion[1], slide: setLight(1), max: 2000, min: -2000 });
        ui.setupSlider('#lightZ', { value: lightPostion[2], slide: setLight(2), max: 2000, min: -2000 });
        ui.setupSlider('#eyeX', { value: eyePosition[0], slide: setEye(0), max: 2000, min: -2000 });
        ui.setupSlider('#eyeY', { value: eyePosition[1], slide: setEye(1), max: 2000, min: -2000 });
        ui.setupSlider('#eyeZ', { value: eyePosition[2], slide: setEye(2), max: 2000, min: -2000 });
        ui.setupSlider('#limit', {
            value: limit, slide: (event, ui) => {
                limit = ui.value;
                draw();
            }, max: 90, min: 0
        });
        ui.setupSlider('#shininess', {
            value: shininess, slide: (event, ui) => {
                shininess = ui.value;
                draw();
            }, min: 0, max: 300
        })
    }
    function setLight(index) {
        return function (event, ui) {
            lightPostion[index] = ui.value;
            draw();
        }
    }
    function setEye(index) {
        return function (event, ui) {
            eyePosition[index] = ui.value;
            draw();
        }
    }
    function translate(index) {
        return function (event, ui) {
            translation[index] = ui.value;
            draw();
        }
    }
    function rotateY(event, ui) {
        var angleInDegrees = ui.value;
        var angleInRadians = angleInDegrees * Math.PI / 180;
        rotationInRadians[1] = angleInRadians;
        draw();
    }
    function setData(gl: WebGLRenderingContext, program: WebGLProgram) {
        const posBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubePositions), gl.STATIC_DRAW);
        const a_pos = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(a_pos);
        gl.vertexAttribPointer(a_pos, 3, gl.FLOAT, false, 0, 0);
        const colorBuffer = gl.createBuffer();
        const a_color = gl.getAttribLocation(program, 'a_color');
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeColors), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(a_color);
        gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 0, 0);
        const normalBuffer = gl.createBuffer();
        const a_normal = gl.getAttribLocation(program, 'a_normal');
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeNormals), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(a_normal);
        gl.vertexAttribPointer(a_normal, 3, gl.FLOAT, false, 0, 0);
    }
    function draw() {
        gl.clearColor(0.92, 0.92, 0.92, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        let viewProjectionMatrix = transform.perspective(200, 1, 1, 10000);
        let lookAtMatrix = transform.lookAt(cameraPosition, [0, 0, 0], [0, 1, 0]);
        viewProjectionMatrix = transform.multiply(viewProjectionMatrix, transform.inverse(lookAtMatrix));
        let worldMatrix = transform.translation(translation[0], translation[1], translation[2]);
        worldMatrix = transform.multiply(worldMatrix, transform.yRotation(rotationInRadians[1]));
        gl.uniformMatrix4fv(uniformTransform, false, worldMatrix);
        viewProjectionMatrix = transform.multiply(viewProjectionMatrix, worldMatrix);
        worldMatrix = transform.inverse(worldMatrix);
        worldMatrix = transform.transpose(worldMatrix);
        gl.uniform3fv(uniformLightPosition, lightPostion);
        gl.uniformMatrix4fv(uniformViewProjectionMatrixPosition, false, viewProjectionMatrix);
        gl.uniformMatrix4fv(uniformWorldPosition, false, worldMatrix);
        gl.uniform3fv(uniformLightPosition, lightPostion);
        gl.uniform3fv(uniformEyePosition, eyePosition);
        gl.uniform1f(uniformShininessPosition, shininess);
        gl.uniform1f(uniformCosLimit, Math.cos(limit));
        gl.uniform3fv(uniformLightDirection, lightPostion);
        gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);
    }
}
main();