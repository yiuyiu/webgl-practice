attribute vec4 a_position;
attribute vec4 a_color;
varying vec4 v_color;
uniform mat4 u_matrix;
void main(){
    // Adjust the z to divide by
    float zToDivideBy = 1.0 + position.z * 0.005;
 
    // Divide x and y by z.
    gl_Position = vec4(position.xy / zToDivideBy, position.zw);
    v_color = a_color;
}