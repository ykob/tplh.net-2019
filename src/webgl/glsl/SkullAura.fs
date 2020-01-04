precision highp float;

uniform float time;
uniform vec2 direction;
uniform vec2 resolution;
uniform float radius;
uniform sampler2D postEffectTex;
uniform sampler2D noiseTex;
uniform float alpha;

varying vec3 vPosition;
varying vec2 vUv;

const float blurIteration = 12.0;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb)

void main() {
  vec4 texColor1 = texture2D(postEffectTex, vUv);
  vec4 texColor2 = texture2D(postEffectTex, vUv * vec2(0.7, 0.65) + vec2(0.15, 0.125));
  vec4 texColor3 = texture2D(postEffectTex, vUv * vec2(0.5, 0.45) + vec2(0.25, 0.225));

  float noise1 = texture2D(noiseTex, vUv - vec2(0.0, time * 0.6)).r;
  float noise2 = texture2D(noiseTex, vUv * 2.0 - vec2(0.0, time * 0.7)).g;
  float noise3 = texture2D(noiseTex, vUv * 3.0 + vec2(0.0, time * 0.8)).b;
  float noise = (noise1 * 0.65 + noise2 * 0.3 + noise3 * 0.05);

  float mask1 = (texColor1.r + noise) / 2.0;
  float mask2 = (texColor2.r + (noise * 2.0 - 1.0));
  float mask3 = texColor3.r + noise * 0.5;
  float mask = (mask1 * 1.5 + mask2 * 0.3) / 1.8 * mask3 * pow(alpha, 2.0);

  float noise4 = texture2D(noiseTex, vUv * 1.6 - vec2(0.5, time * 1.2)).r;
  vec3 hsvNoise = vec3(noise4 * -0.035, noise4 * 0.2, -noise4 * 0.5);
  float strength = smoothstep(0.3, 1.2, mask);
  vec3 hsv1 = vec3(0.115, 0.65, 1.0) + hsvNoise;
  vec3 hsv2 = vec3(0.1, 0.27, 1.0);
  vec3 rgb = mix(convertHsvToRgb(hsv1), convertHsvToRgb(hsv2), strength);

  float opacity = smoothstep(0.35, 0.5, mask);
  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4(rgb, opacity);
}
