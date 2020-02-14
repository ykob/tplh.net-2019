precision highp float;

uniform float time;
uniform sampler2D alphaTex;
uniform sampler2D noiseTex;
uniform float alpha;

varying vec2 vUv;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb);

void main() {
  float opacity = texture2D(alphaTex, vUv).r * alpha;

  float noise = texture2D(noiseTex, vUv / vec2(1.0, 8.0) - vec2(0.0, time * 0.1)).r;

  vec3 hsv1 = vec3(0.09, 0.7, 0.8);
  vec3 hsv2 = vec3(0.09, 0.7, 0.2);
  vec3 rgb = mix(convertHsvToRgb(hsv1), convertHsvToRgb(hsv2), noise);

  gl_FragColor = vec4(rgb, opacity);
}
