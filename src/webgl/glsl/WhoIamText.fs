precision highp float;

uniform float time;
uniform sampler2D tex;
uniform float alpha;

varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(tex, vUv);

  vec3 color = vec3(0.0);
  float opacity = texColor.r * 0.4 * alpha;

  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4(color, opacity);
}
