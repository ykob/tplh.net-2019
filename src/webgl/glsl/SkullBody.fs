precision highp float;

uniform float time;
uniform float renderOutline;
uniform float alpha;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vColor;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb)
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

void main() {
  // Flat Shading
  vec3 light = normalize(vec3(-0.5, 1.0, 0.5));
  vec3 normal = normalize(cross(dFdx(vPosition), dFdy(vPosition)));
  float diff = dot(normal, light);

  float noise = cnoise3(normal * 3.0 + time * 0.6) * 0.5 + 0.5;
  float noise2 = (cnoise3(vPosition * 0.4 + time) + cnoise3(vPosition * 6.0 - time * 3.0) * 0.15) / 1.15 * 0.5 + 0.5;

  float opacity = smoothstep(
    0.0,
    0.02,
    (alpha * 2.0 - noise2) / 2.0
    );
  float edge = 1.0 - smoothstep(
    0.02,
    0.4,
    (alpha * 2.0 - noise2) / 2.0
    );

  vec3 hsv1 = vec3(0.04, 0.12, 0.27);
  vec3 hsv2 = vec3(0.1, 0.24, 0.08);
  vec3 rgb = mix(convertHsvToRgb(hsv1), convertHsvToRgb(hsv2), diff);

  vec3 hsv3 = vec3(47.0 / 360.0, 0.6, 0.9);
  vec3 color = (rgb * (1.0 - vColor) + convertHsvToRgb(hsv3) * vColor) * (1.0 - renderOutline);
  vec3 colorOutline = vec3(1.0) * renderOutline;

  vec3 hsvNoise2 = vec3(noise * -0.02, noise * 0.2, noise * 0.1);
  vec3 hsv4 = vec3(0.1, 0.0, 0.0) + hsvNoise2;
  vec3 edgeColor = convertHsvToRgb(hsv4) * edge;

  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4((color + colorOutline) * (1.0 - edge) + edgeColor, opacity);
}
