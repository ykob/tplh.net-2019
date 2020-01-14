attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float time;
uniform float easeTransition;
uniform vec2 imgRatio;
uniform sampler2D noiseTex;

varying vec3 vPosition;
varying vec2 vUv;
varying vec2 vUpdateUv;
varying float vTime;

void main(void) {
  vec2 updateUv = uv * imgRatio + vec2(
    (1.0 - imgRatio.x) * 0.5,
    (1.0 - imgRatio.y) * 0.5
    );

  // Calculation of the wave animation.
  float wave1 = sin(updateUv.x * -8.0 + updateUv.y * -8.0 + time);
  float wave2 = sin(updateUv.x * 5.0 + updateUv.y * 2.0 + time);
  float wave = wave1 * 0.6 + wave2 * 1.2;

  // Calculation of the slide animation.
  float noiseR = texture2D(noiseTex, updateUv + vec2(time * 0.1, 0.0)).r;
  float noiseG = texture2D(noiseTex, updateUv + vec2(time * 0.2, 0.0)).g;
  float slide = texture2D(noiseTex, uv * vec2(0.998) + 0.001).b;

  float mask = easeTransition * 2.0 - slide;
  float maskPrev = smoothstep(0.0, 0.5, mask);
  float maskNext = 1.0 - smoothstep(0.5, 1.0, mask);
  float height = maskPrev * maskNext * 8.0 * (slide * 0.5 + 0.5);

  // coordinate transformation
  vec3 wavePosition = vec3(0.0, 0.0, wave);
  vec3 slidePosition = vec3(0.0, 0.0, height);
  vec3 updatePosition = position + wavePosition + slidePosition;
  vec4 mPosition = modelMatrix * vec4(updatePosition, 1.0);

  vPosition = position;
  vUv = uv;
  vUpdateUv = updateUv;
  vTime = easeTransition;

  gl_Position = projectionMatrix * viewMatrix * mPosition;
}
