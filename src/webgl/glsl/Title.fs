precision highp float;

uniform float time;
uniform sampler2D alphaTex;
uniform sampler2D noiseTex;
uniform float alpha;

varying vec2 vUv;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb);

void main() {
  float opacity = texture2D(alphaTex, vUv).r;

  vec3 rgb = vec3(1.0);

  gl_FragColor = vec4(rgb, opacity);
}
