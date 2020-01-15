precision highp float;

uniform float time;
uniform vec2 imgRatio;
uniform sampler2D noiseTex;
uniform float alpha;
uniform float alphaShowFirst;

varying vec2 vUv;
varying vec3 vColor;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb);

void main() {
  vec2 ratio = vec2(
    min(imgRatio.x / imgRatio.y / 3.0 * 2.0, 1.0),
    min(imgRatio.y / imgRatio.x / 2.0 * 3.0, 1.0) / 3.0 * 2.0
  );
  vec2 imgUv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y  + (1.0 - ratio.y) * 0.5
  );
  vec2 p = imgUv * 2.0 - 1.0;

  float noiseA1 = texture2D(noiseTex, imgUv * 1.0 - vec2(0.0, time * 0.04)).r;
  float noiseA2 = texture2D(noiseTex, imgUv * 2.0 - vec2(time * 0.01, time * 0.08)).r;
  float noiseA3 = texture2D(noiseTex, imgUv * 8.0 - vec2(time * 0.16), 0.0).r;
  float noiseB1 = texture2D(noiseTex, imgUv * 1.0 + vec2(0.0, time * 0.04)).g;
  float noiseB2 = texture2D(noiseTex, imgUv * 2.0 + vec2(time * 0.01, time * 0.08)).g;
  float noiseB3 = texture2D(noiseTex, imgUv * 8.0 + vec2(time * 0.16, 0.0)).g;
  float noise1 = (noiseA1 * 0.7 + noiseA2 * 0.2 + noiseA3 * 0.1 + noiseB1 * 0.7 + noiseB2 * 0.2 + noiseB3 * 0.1) / 2.0;

  float colorNoise1 = texture2D(noiseTex, imgUv + vec2(0.0, time * 0.1)).b;

  vec3 rgb1 = mix(
    convertHsvToRgb(vec3(280.0 / 360.0, 0.11, 0.11)),
    convertHsvToRgb(vec3(0.11 - colorNoise1 * 0.04, 0.6 - colorNoise1 * 0.3, 0.4)),
    smoothstep(0.2, 0.8, length(p)) * (1.0 - smoothstep(0.0, 0.8, noise1))
    );

  float noiseC1 = texture2D(noiseTex, imgUv * 1.0 - vec2(0.5, time * 0.04)).r;
  float noiseC2 = texture2D(noiseTex, imgUv * 2.0 - vec2(0.5 + time * 0.01, time * 0.08)).r;
  float noiseC3 = texture2D(noiseTex, imgUv * 8.0 - vec2(0.5 + time * 0.16), 0.0).r;
  float noiseD1 = texture2D(noiseTex, imgUv * 1.0 + vec2(0.5, time * 0.04)).g;
  float noiseD2 = texture2D(noiseTex, imgUv * 2.0 + vec2(0.5 + time * 0.01, time * 0.08)).g;
  float noiseD3 = texture2D(noiseTex, imgUv * 8.0 + vec2(0.5 + time * 0.16, 0.0)).g;
  float noise2 = (noiseC1 * 0.7 + noiseC2 * 0.2 + noiseC3 * 0.1 + noiseD1 * 0.7 + noiseD2 * 0.2 + noiseD3 * 0.1) / 2.0;

  float colorNoise2 = texture2D(noiseTex, imgUv + vec2(0.0, time * 0.1)).b;

  vec3 rgb2 = mix(
    convertHsvToRgb(vec3(280.0 / 360.0, 0.11, 0.11)),
    convertHsvToRgb(vec3(0.11 - colorNoise2 * 0.04, 0.6 - colorNoise2 * 0.3, 0.35)),
    1.0 - smoothstep(0.0, 0.8, noise2)
    );

  float noiseE1 = texture2D(noiseTex, imgUv + vec2(time * 0.01, 0.0)).r;
  float noiseE2 = texture2D(noiseTex, imgUv + vec2(time * 0.01, 0.0)).r;
  float noise3 = 1.0 - smoothstep(0.3, 0.7, noiseE1 * 0.5 + noiseE2 * 0.5);
  float noiseAlpha = clamp(alpha * 2.0 - noise3, 0.0, 1.0);

  vec3 rgb3 = convertHsvToRgb(vec3(280.0 / 360.0, 0.11, 0.11));

  vec3 rgb = mix(rgb3, mix(rgb1, rgb2, noiseAlpha), alphaShowFirst);

  gl_FragColor = vec4(rgb, 1.0);
}
