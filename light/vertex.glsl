attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_normal;
uniform mat4 u_viewProjection;
uniform vec3 u_light;
uniform vec3 u_eyePosition;
uniform mat4 u_transform;
varying vec3 v_normal;
varying vec4 v_color;
varying vec3 v_surface2Light;
varying vec3 v_surface2Eye;


void main(){
    gl_Position = u_viewProjection * a_position;
    v_normal = a_normal;
    v_color = a_color;
    v_surface2Light = u_light - vec3(u_transform * a_position);
    v_surface2Eye = u_eyePosition - vec3(u_transform * a_position);
}