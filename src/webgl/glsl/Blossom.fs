precision highp float;

uniform float time;
uniform float alpha;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vColor;
varying mat4 vInvertMatrix;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb)
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

void main() {
  // Flat Shading
  vec3 light = normalize(vec3(-1.0, 0.7, 0.7));
  vec3 invLight = normalize(vInvertMatrix * vec4(light, 0.0)).xyz;
  float diff = dot(vNormal, invLight);

  float noise = cnoise3(vPosition * 1.2 + time * 0.5) * 0.5 + 0.5;
  float noise2 = (cnoise3(vPosition * 0.8 + time) + cnoise3(vPosition * 6.0 - time * 3.0) * 0.15) / 1.15 * 0.5 + 0.5;

  float opacity = smoothstep(
    0.0,
    0.01,
    (alpha * 2.0 - noise2) / 2.0
    );
  float edge = 1.0 - smoothstep(
    0.1,
    0.15,
    (alpha * 2.0 - noise2) / 2.0
    );

  vec3 hsvNoise1 = vec3(noise * 0.12, -noise * 0.1, noise * 0.1);
  vec3 hsv1 = vec3(0.82, 0.25, 0.8) + hsvNoise1;
  vec3 hsv2 = vec3(0.94, 0.3, 1.0) + hsvNoise1;
  vec3 color = mix(convertHsvToRgb(hsv1), convertHsvToRgb(hsv2), diff) * (1.0 - edge);

  vec3 hsvNoise2 = vec3(noise * 0.14, -noise * 0.45, 0.0);
  vec3 hsv3 = vec3(0.88, 0.45, 0.995) + hsvNoise2;
  vec3 edgeColor = convertHsvToRgb(hsv3) * edge;

  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4(color + edgeColor, opacity);
}
