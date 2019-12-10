precision highp float;

uniform float time;
uniform sampler2D noiseTex;
uniform float alphaShow;
uniform float alphaColor;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying mat4 vInvertMatrix;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb)

void main() {
  // Flat Shading
  vec3 light = normalize(vec3(-1.0, 0.7, 0.7));
  vec3 invLight = normalize(vInvertMatrix * vec4(light, 0.0)).xyz;
  float diff = dot(vNormal, invLight);

  float noise1 = texture2D(noiseTex, vUv * 0.3).r;
  float noise2 = texture2D(noiseTex, vUv * 0.3).g;

  float opacity = smoothstep(
    0.0,
    0.01,
    (alphaShow * 2.0 - noise1) / 2.0
    );
  float edge = 1.0 - smoothstep(
    0.09,
    0.1,
    (alphaShow * 2.0 - noise1) / 2.0
    );

  vec3 hsvNoise1 = vec3(noise1 * 0.12, -noise1 * 0.1, noise1 * 0.1);
  vec3 hsv1 = vec3(0.82, 0.25, 0.8) + hsvNoise1;
  vec3 hsv2 = vec3(0.94, 0.3, 1.0) + hsvNoise1;
  vec3 rgb = mix(convertHsvToRgb(hsv1), convertHsvToRgb(hsv2), diff);

  vec3 hsvNoise2 = vec3(noise2 * 0.14, -noise2 * 0.45, 0.0);
  vec3 hsv3 = vec3(0.88, 0.45, 0.995) + hsvNoise2;
  vec3 edgeColor = convertHsvToRgb(hsv3);

  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4(rgb * (1.0 - edge) + edgeColor * edge, opacity);
}
