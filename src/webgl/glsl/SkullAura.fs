precision highp float;

uniform float time;
uniform vec2 direction;
uniform vec2 resolution;
uniform float radius;
uniform sampler2D postEffectTex;
uniform sampler2D noiseTex;
uniform float alpha;
uniform vec3 hsv1;
uniform vec3 hsv2;
uniform float strength;
uniform float colorRangeMin;
uniform float colorRangeMax;
uniform float opacityRangeMin;
uniform float opacityRangeMax;
uniform float opacityBase;

varying vec2 vUv;

const float blurIteration = 12.0;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb)

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  vec4 texColor1 = texture2D(postEffectTex, vUv);
  vec4 texColor2 = texture2D(postEffectTex, vUv * vec2(0.7, 0.65) + vec2(0.15, 0.135));
  vec4 texColor3 = texture2D(postEffectTex, vUv * vec2(0.55, 0.45) + vec2(0.225, 0.185));

  float noise1 = texture2D(noiseTex, vUv * 1.4 - vec2(0.0, time * 0.8)).r;
  float noise2 = texture2D(noiseTex, vUv * 2.8 - vec2(0.0, time * 0.9)).g;
  float noise3 = texture2D(noiseTex, vUv * 4.2 - vec2(0.0, time * 1.0)).b;
  float noise = (noise1 * 0.65 + noise2 * 0.3 + noise3 * 0.05);

  float mask1 = (texColor1.r + noise * 2.0) / 3.0;
  float mask2 = (texColor2.r + noise * 2.0) / 3.0;
  float mask3 = texColor3.r * 0.5 + noise * 0.5;
  float mask = (mask1 * 1.2 + mask2 * 0.8) / 2.0 * strength * pow(mask3, 2.0) * pow(alpha, 2.0);

  float noise4 = texture2D(noiseTex, vUv * 1.6 - vec2(0.5, time * 1.2)).r;
  vec3 hsvNoise = vec3(noise4 * -0.1, noise4 * 0.05, -noise4 * 0.2);
  float colorMask = (mask1 + noise) / 2.0;
  float colorAlpha = smoothstep(colorRangeMin, colorRangeMax, colorMask);
  vec3 rgb = mix(convertHsvToRgb(hsv1 + hsvNoise), convertHsvToRgb(hsv2), colorAlpha);

  float opacity = smoothstep(opacityRangeMin, opacityRangeMax, mask) * opacityBase;
  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4(rgb, opacity);
}
