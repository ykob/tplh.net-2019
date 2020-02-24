attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float time;
uniform sampler2D tex;
uniform float maxIndex;

varying vec2 vUv;

void main(void) {
  // Calculate the noise.
  vec2 uvNoise = vec2(
    uv.x - time * 0.1,
    uv.y / maxIndex * 5.0
    ) * 4.0;
  float noise = smoothstep(0.2, 0.8, texture2D(tex, uvNoise).b);

  // Calculate the virtical gradation.
  float gradation = 1.0 - texture2D(tex, uv).g;

  // coordinate transformation
  vec3 noisePosition = vec3(
    0.0,
    noise * 8.0 * gradation * position.y / abs(position.y),
    noise * 12.0 * gradation
  );
  vec4 mPosition = modelMatrix * vec4(position + noisePosition, 1.0);

  vUv = uv;

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
