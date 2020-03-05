precision highp float;

uniform float time;
uniform float alpha;
uniform vec2 resolution;
uniform sampler2D texture1;
uniform sampler2D texture2;

varying vec2 vUv;

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float sin1 = sin(time * 10000.0 + radians(p.x * resolution.x * 0.2));
  float sin2 = sin(time * 10000.0 + radians(p.x * resolution.x * 0.8));
  vec2 noise = vec2(
    0.0,
    (sin1 * 0.8 + sin2 * 0.2) * 0.0055 * alpha
  );
  vec2 rgbSplit = vec2(
    alpha * 0.003,
    0.0
  );

  float color1r = texture2D(texture1, vUv + noise + rgbSplit).r;
  float color1g = texture2D(texture1, vUv + noise).g;
  float color1b = texture2D(texture1, vUv + noise - rgbSplit).b;
  float color2r = texture2D(texture2, vUv + noise + rgbSplit).r;
  float color2g = texture2D(texture2, vUv + noise).g;
  float color2b = texture2D(texture2, vUv + noise - rgbSplit).b;

  gl_FragColor = vec4(
    vec3(
      color1r + color2r,
      color1g + color2g,
      color1b + color2b
    ),
    1.0
    );
}
