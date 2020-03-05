precision highp float;

uniform float time;
uniform float renderOutline;
uniform float alpha;
uniform vec3 hsv1;

varying vec3 vPosition;
varying float vEdge;

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
  float dissolve = 1.0 - smoothstep(
    0.02,
    0.4,
    (alpha * 2.0 - noise2) / 2.0
    );

  vec3 hsv2 = vec3(280.0 / 360.0, 0.11, 0.11);
  vec3 rgb = mix(convertHsvToRgb(hsv1), convertHsvToRgb(hsv2), diff);

  vec3 edgeColor = convertHsvToRgb(hsv2);
  vec3 color = (rgb * (1.0 - vEdge) + edgeColor * vEdge) * (1.0 - renderOutline);
  vec3 colorOutline = vec3(1.0) * renderOutline;

  vec3 dissolveColor = edgeColor * dissolve;

  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4(color * (1.0 - dissolve) + dissolveColor + colorOutline, opacity);
}
