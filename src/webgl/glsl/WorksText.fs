precision highp float;

uniform float time;
uniform sampler2D tex;
uniform float prevId;
uniform float nextId;
uniform float maxId;

varying vec2 vUv;

void main() {
  vec2 p = vUv * 2.0 - 1.0;

  vec2 textUv = vec2(
    vUv.x,
    (clamp(vUv.y * 3.0 + sin(time), 1.0, 2.0) + (maxId - prevId - 2.0)) / maxId
    );

  vec4 texColor = texture2D(tex, textUv);

  float opacity = texColor.r;

  vec3 color = vec3(1.0);

  gl_FragColor = vec4(color, opacity);
}
