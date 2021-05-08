attribute vec4 a_xixi;
attribute vec4 a_color;
varying vec4 v_color;
void main(){
    gl_Position = a_xixi;
    v_color = a_color;
}