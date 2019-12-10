attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying mat4 vInvertMatrix;

#pragma glslify: inverse = require(glsl-inverse);

void main(void) {
  // coordinate transformation
  vec4 mPosition = modelMatrix * vec4(position, 1.0);

  vPosition = position;
  vNormal = normal;
  vUv = uv;
  vInvertMatrix = inverse(modelMatrix);

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
