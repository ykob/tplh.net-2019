precision highp float;

uniform float time;
uniform sampler2D tex;
uniform float alphaShow;
uniform float alphaHide;

varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(tex, vUv);

  float textMask = texColor.r;
  float alphaDelay = 1.0 - (texColor.g * 0.8 + 0.2 + texColor.b * 0.5) / 1.5;

  vec3 color = vec3(0.0);
  float opacity = textMask * 0.4
    * smoothstep(0.0, 0.2, alphaShow - alphaDelay)
    * (1.0 - smoothstep(0.0, 0.2, alphaHide - alphaDelay));

  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4(color, opacity);
}
