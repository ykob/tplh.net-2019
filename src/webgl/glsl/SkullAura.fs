precision highp float;

uniform float time;
uniform vec2 direction;
uniform vec2 resolution;
uniform float radius;
uniform sampler2D postEffectTex;
uniform sampler2D noiseTex;

varying vec3 vPosition;
varying vec2 vUv;

const float blurIteration = 12.0;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb)

void main() {
  vec4 texColor1 = texture2D(postEffectTex, vUv * 1.05 - 0.025);
  vec4 texColor2 = texture2D(postEffectTex, vUv * vec2(0.8, 0.75) + vec2(0.1, 0.075));
  vec4 texColor3 = texture2D(postEffectTex, vUv * vec2(0.6, 0.55) + vec2(0.2, 0.175));

  float noise1 = texture2D(noiseTex, vUv - vec2(0.0, time * 0.6)).r;
  float noise2 = texture2D(noiseTex, vUv * 2.0 - vec2(0.0, time * 0.7)).g;
  float noise3 = texture2D(noiseTex, vUv * 3.0 + vec2(0.0, time * 0.8)).b;
  float noise = (noise1 * 0.65 + noise2 * 0.3 + noise3 * 0.05);

  float mask1 = (texColor1.r + noise) / 2.0;
  float mask2 = (texColor2.r + (noise * 2.0 - 1.0));
  float mask3 = texColor3.r + noise * 0.5;
  float mask = (mask1 * 2.0 + mask2 * 0.3) / 2.3 * mask3;

  float noise4 = texture2D(noiseTex, vUv * 1.6 - vec2(0.5, time * 1.2)).r;
  vec3 hsvNoise = vec3(noise4 * 0.1, noise4 * 0.32, -noise4 * 0.1);
  float strength = smoothstep(0.0, 0.4, pow(mask, 3.0));
  vec3 hsv1 = vec3(0.88, 0.08, 0.999) + hsvNoise;
  vec3 hsv2 = vec3(0.88, 0.15, 0.999);
  vec3 rgb = mix(convertHsvToRgb(hsv1), convertHsvToRgb(hsv2), strength);

  float opacity = smoothstep(0.07, 0.075, pow(mask, 3.0));
  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4(rgb, opacity);
}
