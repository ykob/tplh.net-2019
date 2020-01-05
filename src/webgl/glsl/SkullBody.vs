attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform mat4 rotateMatrix;
uniform vec3 cameraPosition;
uniform float time;
uniform float renderOutline;
uniform float alpha;
uniform float alphaEdge;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vColor;

#pragma glslify: inverse = require(glsl-inverse);

void main(void) {
  // coordinate transformation
  vec4 mPosition = modelMatrix * vec4(position + normal * renderOutline * 0.5, 1.0);

  float angleToCamera = acos(dot(normalize(cameraPosition), normalize((vec4(position, 1.0) * inverse(rotateMatrix)).xyz)));
  float angleToLight = acos(dot(normalize(vec3(0.5, 1.0, -0.0)), normalize((vec4(normal, 1.0) * inverse(rotateMatrix)).xyz)));

  vPosition = mPosition.xyz;
  vNormal = normalize(mPosition.xyz);
  vUv = uv;
  vColor = vec3(smoothstep(0.4, 1.0, abs(sin(angleToCamera)) + smoothstep(0.4, 1.0, angleToLight) * 0.05)) * smoothstep(0.3, 0.7, alpha) * alphaEdge;

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
