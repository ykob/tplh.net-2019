precision highp float;

uniform float time;
uniform sampler2D tex;
uniform float alphaShow;
uniform float alphaHide;

varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(tex, vUv);

  float textMask = texColor.r;
  float alphaDelay = (1.0 - (texColor.g + texColor.b) / 2.0) * 0.8;

  vec3 color = vec3(0.0);
  float opacity = textMask * 0.4
    * smoothstep(0.0, 0.2, alphaShow - alphaDelay)
    * (1.0 - smoothstep(0.0, 0.2, alphaHide - alphaDelay));

  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4(color, opacity);
}
