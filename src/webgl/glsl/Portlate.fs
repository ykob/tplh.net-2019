precision highp float;

uniform float time;
uniform sampler2D maskTex;
uniform float alpha;

varying vec3 vPosition;
varying vec2 vUv;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb)

void main() {
  vec4 mask1 = texture2D(maskTex, vUv);
  vec4 mask2 = texture2D(maskTex, vUv * 1.2 + vec2(-time * 0.2, -time * 0.6));
  vec4 mask3 = texture2D(maskTex, vUv * 2.4 + vec2(-time * 0.4, -time * 1.2));
  float noise = ((mask2.b * 0.7 + mask3.b * 0.3) * 2.0 - 1.0);
  float opacity1 = smoothstep(
    alpha + 0.25, alpha + 0.26, mask1.r * 0.65 + noise * 0.25
    );
  float opacity2 = smoothstep(
    alpha + 0.25, alpha + 0.26, mask1.g * 0.65 + noise * 0.25
    );
  float opacity = opacity1 + opacity2;

  vec4 mask4 = texture2D(maskTex, vUv * 1.2 + 0.5 + vec2(-time * 0.2, -time * 0.9));
  vec4 mask5 = texture2D(maskTex, vUv * 2.4 + 0.5 + vec2(-time * 0.4, -time * 1.1));
  float opacity4 = smoothstep(
    alpha + 0.125, alpha + 0.575, mask1.r * 0.775 + noise * 0.125
    );
  vec3 hsvNoise = vec3(mask4.b * 0.1, mask5.b * 0.44, -(mask4.b * mask5.b) * 0.24);
  vec3 hsv1 = vec3(0.88, 0.08, 0.99) + hsvNoise;
  vec3 hsv2 = vec3(0.88, 0.08, 0.99);
  vec3 rgb = mix(convertHsvToRgb(hsv1), convertHsvToRgb(hsv2), opacity4);

  if (opacity <= 0.1) {
    discard;
  }

  gl_FragColor = vec4(rgb, opacity);
}
