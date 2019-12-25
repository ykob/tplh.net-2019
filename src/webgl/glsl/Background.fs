precision highp float;

uniform float time;
uniform vec2 imgRatio;
uniform sampler2D noiseTex;
uniform float alpha;

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
  float noise = (noiseA1 * 0.7 + noiseA2 * 0.2 + noiseA3 * 0.1 + noiseB1 * 0.7 + noiseB2 * 0.2 + noiseB3 * 0.1) / 2.0;

  float colorNoise = texture2D(noiseTex, imgUv + vec2(0.0, time * 0.1)).b;

  vec3 rgb = convertHsvToRgb(mix(
    vec3(0.11 - colorNoise * 0.04, 0.6 - colorNoise * 0.3, 0.05),
    vec3(0.11 - colorNoise * 0.04, 0.6 - colorNoise * 0.3, 0.4),
    smoothstep(0.0, 0.9, length(p)) * (1.0 - smoothstep(0.1, 0.9, noise))
    ));

  float noise4 = texture2D(noiseTex, imgUv * 0.4 + vec2(time * 0.01, 0.0)).r;
  float noise5 = texture2D(noiseTex, imgUv * -0.4 + vec2(time * 0.01, 0.0)).r;
  float noiseB = 1.0 - smoothstep(0.3, 0.7, noise4 * 0.5 + noise5 * 0.5);

  float noiseAlpha = clamp(alpha * 2.0 - noiseB, 0.0, 1.0);

  gl_FragColor = vec4(rgb, 1.0);
}
