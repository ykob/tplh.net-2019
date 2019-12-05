precision highp float;

uniform float time;
uniform float hex;

varying vec2 vUv;
varying vec3 vColor;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb);

void main() {
  vec3 rgb = mix(
    convertHsvToRgb(vec3(0.0, 0.0, 1.0)),
    convertHsvToRgb(vec3(0.0, 0.2, 0.95)),
    vUv.y
    );

  gl_FragColor = vec4(rgb, 1.0);
}
