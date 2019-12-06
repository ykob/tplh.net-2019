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

  float noise1 = texture2D(noiseTex, imgUv * 1.0 - vec2(0.0, time * 0.1)).r;
  float noise2 = texture2D(noiseTex, imgUv * 2.0 + vec2(0.0, time * 0.2)).g;
  float noise3 = texture2D(noiseTex, imgUv * 4.0 - vec2(0.0, time * 0.3)).b;
  float noise = (noise1 * 0.6 + noise2 * 0.3 + noise3 * 0.1);

  vec3 rgb1 = convertHsvToRgb(mix(
    vec3(0.78, 0.0, 1.0),
    vec3(0.94, 0.2, 0.95),
    vUv.y + (1.0 - smoothstep(0.1, 0.9, noise)) * 0.4
    ));

  vec3 rgb2 = convertHsvToRgb(mix(
    vec3(0.94, 0.3, 0.3),
    vec3(0.78, 0.4, 0.05),
    vUv.y + (1.0 - smoothstep(0.1, 0.9, noise)) * 0.4
    ));

  vec3 rgb = mix(rgb1, rgb2, alpha);

  gl_FragColor = vec4(rgb, 1.0);
}
