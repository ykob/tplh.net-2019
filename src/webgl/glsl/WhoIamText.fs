precision highp float;

uniform float time;
uniform sampler2D tex;
uniform float alpha;

varying vec2 vUv;

void main() {
  vec4 texColor1 = texture2D(tex, vUv);
  vec4 texColor2 = texture2D(tex, vUv + vec2(0.0, time));

  float textMask = texColor1.r;
  float alphaDelay = (1.0 - texColor1.g + smoothstep(0.3, 0.7, texColor2.b)) / 2.0;

  vec3 color = vec3(0.0);
  float opacity = textMask * 0.4 * clamp(alpha * 2.0 - alphaDelay, 0.0, 1.0);

  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4(color, opacity);
}
