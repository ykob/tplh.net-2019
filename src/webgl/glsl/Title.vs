attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float time;
uniform sampler2D noiseTex;
uniform float alpha;

varying vec2 vUv;

void main(void) {
  float noise = texture2D(noiseTex, uv / vec2(1.0, 8.0) * 0.6 - vec2(0.0, time * 0.1)).r;
  vec3 noisePosition = vec3(0.0, 0.0, (noise * 1.5 - 0.5) * 6.0 * (1.0 - alpha));

  // coordinate transformation
  vec4 mPosition = modelMatrix * vec4(position + noisePosition, 1.0);

  vUv = uv;

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
