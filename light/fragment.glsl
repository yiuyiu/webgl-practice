precision mediump float;

uniform mat4 u_world;
uniform float u_shininess;
uniform float u_cosLimit;
uniform vec3 u_lightDirection;
varying vec3 v_normal;
varying vec4 v_color;
varying vec3 v_surface2Light;
varying vec3 v_surface2Eye;


void main(){
    vec3 normal = mat3(u_world) * v_normal;
    vec3 normalizedNormal = normalize(normal);
    vec3 normalizedSurface2Light = normalize(v_surface2Light);
    vec3 normalizedSurface2Eye = normalize(v_surface2Eye);
    float light = 0.0;
    float specular = 0.0;
    // spot light
    // if(dot(normalize(v_surface2Light),-normalize(u_lightDirection)) >= u_cosLimit){
    //     light = dot(normalizedNormal, normalizedSurface2Light);
    // }
     light = dot(normalizedNormal, normalizedSurface2Light);
    specular = pow(dot(normalize(normalizedSurface2Light + normalizedSurface2Eye), normalizedNormal), u_shininess);
    gl_FragColor = v_color;
    gl_FragColor.rgb *= light;
    gl_FragColor.rgb += specular;
}