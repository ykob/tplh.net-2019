attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float time;
uniform sampler2D tex;
uniform float alphaShow;
uniform float alphaHide;

varying vec2 vUv;

void main(void) {
  vec4 texColor = texture2D(tex, uv);
  float alphaDelay = (1.0 - (texColor.g + texColor.b) / 2.0) * 0.8;
  float noiseAlpha = (1.0 - smoothstep(0.0, 0.2, alphaShow - alphaDelay))
    + smoothstep(0.0, 0.2, alphaHide - alphaDelay);
  vec3 noisePosition = vec3(0.0, 0.0, noiseAlpha * texColor.b * 16.0);

  // coordinate transformation
  vec4 mPosition = modelMatrix * vec4(position + noisePosition, 1.0);

  vUv = uv;

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
