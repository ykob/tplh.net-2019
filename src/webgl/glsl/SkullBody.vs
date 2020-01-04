attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec3 cameraPosition;
uniform float time;
uniform float renderOutline;
uniform float alpha;
uniform float alphaEdge;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vColor;

void main(void) {
  // coordinate transformation
  vec4 mPosition = modelMatrix * vec4(position + normal * renderOutline * 0.5, 1.0);

  float angleToCamera = acos(dot(normalize(cameraPosition), normalize(mPosition.xyz)));

  vPosition = mPosition.xyz;
  vNormal = normalize(mPosition.xyz);
  vUv = uv;
  vColor = vec3(smoothstep(0.8, 1.0, abs(sin(angleToCamera)))) * smoothstep(0.3, 0.7, alpha) * alphaEdge;

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
