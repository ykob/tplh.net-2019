precision highp float;

uniform float time;
uniform sampler2D alphaTex;
uniform sampler2D noiseTex;
uniform float alpha;
uniform float isMobile;

varying vec2 vUv;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb);

void main() {
  vec4 texColor = texture2D(alphaTex, vUv);
  float opacityPc = smoothstep(0.1, 1.0, texColor.r * (1.0 - isMobile) * alpha);
  float opacitySp = smoothstep(0.1, 1.0, texColor.g * isMobile * alpha);
  float opacity = opacityPc + opacitySp;

  float noise = texture2D(noiseTex, vUv / vec2(1.0, 4.0) - vec2(0.0, time * 0.1)).r;

  vec3 hsv1 = vec3(0.09, 0.7, 0.8);
  vec3 hsv2 = vec3(0.09, 0.7, 0.2);
  vec3 rgb = mix(convertHsvToRgb(hsv1), convertHsvToRgb(hsv2), noise);

  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4(rgb, opacity);
}
