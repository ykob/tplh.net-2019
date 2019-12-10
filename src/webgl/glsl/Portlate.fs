precision highp float;

uniform float time;
uniform sampler2D maskTex;

varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vec4 mask1 = texture2D(maskTex, vUv);
  vec4 mask2 = texture2D(maskTex, vUv + vec2(-time * 0.2, -time * 0.8));
  vec4 mask3 = texture2D(maskTex, vUv * 2.0 + vec2(-time * 0.4, -time * 1.2));

  float noise = ((mask2.b * 0.7 + mask3.b * 0.3) * 2.0 - 1.0);

  float alpha = 1.0 - clamp(time / 3.0, 0.0, 1.0);
  float opacity1 = smoothstep(
    alpha + 0.25, alpha + 0.27, mask1.r * 0.65 + noise * 0.25
    );
  float opacity2 = smoothstep(
    alpha + 0.25, alpha + 0.27, mask1.g * 0.65 + noise * 0.25
    );
  float opacity = opacity1 + opacity2;

  vec3 color = vec3(1.0);

  if (opacity <= 0.1) {
    discard;
  }

  gl_FragColor = vec4(color, opacity);
}
