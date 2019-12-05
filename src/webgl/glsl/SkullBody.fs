precision highp float;

uniform float time;
uniform float renderOutline;
uniform sampler2D noiseTex;
uniform float alpha;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vColor;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb)

void main() {
  // Flat Shading
  vec3 light = normalize(vec3(-1.0, 0.7, 0.7));
  vec3 normal = normalize(cross(dFdx(vPosition), dFdy(vPosition)));
  float diff = dot(normal, light);

  float noiseR = texture2D(
    noiseTex,
    normal.yz * 0.2 + vec2(time * 0.04, 0.0)
    ).r * 2.0 - 1.0;
  float noiseG = texture2D(
    noiseTex,
    normal.zx * 0.2 + vec2(0.0, time * 0.04)
    ).g * 2.0 - 1.0;
  float noiseB = texture2D(
    noiseTex,
    normal.xy * 0.2 - time * 0.02
    ).b * 2.0 - 1.0;
  float noise = length(vec3(noiseR, noiseG, noiseB));

  vec3 hsvNoise = vec3(noise * 0.12, -noise * 0.1, noise * 0.1);
  vec3 hsv1 = vec3(0.8, 0.4, 0.7) + hsvNoise;
  vec3 hsv2 = vec3(0.88, 0.45, 1.0) + hsvNoise;
  vec3 rgb = mix(convertHsvToRgb(hsv1), convertHsvToRgb(hsv2), diff);

  vec3 hsv3 = vec3(0.9, 0.1, 0.95);
  vec3 color = (rgb * (1.0 - vColor) + convertHsvToRgb(hsv3) * vColor) * (1.0 - renderOutline);
  vec3 colorOutline = vec3(1.0) * renderOutline;

  float noiseR2 = texture2D(
    noiseTex,
    vNormal.yz * 0.2 + vec2(time * 0.02, 0.0)
    ).r;
  float noiseG2 = texture2D(
    noiseTex,
    vNormal.zx * 0.2 + vec2(0.0, time * 0.02)
    ).g;
  float noiseB2 = texture2D(
    noiseTex,
    vNormal.xy * 0.2 - time * 0.02
    ).b;
  float noise2 = length(vec3(noiseR2, noiseG2, noiseB2));

  float opacity = smoothstep(
    0.0,
    0.05,
    (alpha * 1.5 - noise2) / 1.5
    );

  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4(color + colorOutline, opacity);
}
