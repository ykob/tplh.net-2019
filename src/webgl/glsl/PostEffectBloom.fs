precision highp float;

uniform float time;
uniform float alpha;
uniform vec2 resolution;
uniform sampler2D texture1;
uniform sampler2D texture2;

varying vec2 vUv;

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float sin1 = sin(time * 10000.0 + radians(p.x * resolution.x * 0.7));
  float sin2 = sin(time * 10000.0 + radians(p.x * resolution.x * 1.8));
  vec2 noise = vec2(
    0.0,
    (sin1 * 0.8 + sin2 * 0.2) * 0.02 * alpha
    );

  vec4 color1 = texture2D(texture1, vUv + noise);
  vec4 color2 = texture2D(texture2, vUv + noise);

  gl_FragColor = color1 + color2;
}
