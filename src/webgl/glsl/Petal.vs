attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

varying vec3 vNormal;
varying vec2 vUv;
varying mat4 vInvertMatrix;
varying float vOpacity;

#pragma glslify: inverse = require(glsl-inverse);

void main(void) {
  // coordinate transformation
  vec4 mPosition = modelMatrix * vec4(position, 1.0);

  vNormal = normal;
  vUv = uv;
  vInvertMatrix = inverse(modelMatrix);
  vOpacity = 1.0 - clamp(-mPosition.z / 10.0, 0.0, 1.0);

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
