attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float time;
uniform float easeTransition1;
uniform float easeTransition2;
uniform float easeTransition3;
uniform vec2 resolution;
uniform vec2 imgRatio;
uniform sampler2D noiseTex;
uniform float pixelRatio;

varying float vOpacity;

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
  float noiseR = texture2D(noiseTex, updateUv * 1.4 + vec2(time * 0.1, 0.0)).r;
  float noiseG = texture2D(noiseTex, updateUv * 1.4 + vec2(time * 0.2, 0.0)).g;
  float slide = texture2D(noiseTex, updateUv * vec2(0.99) + 0.005).b;

  float height1 = (easeTransition1 - slide) * 6.0 * (slide * 0.5 + 0.5);
  float height2 = (easeTransition2 - slide) * 6.0 * (slide * 0.5 + 0.5);
  float height3 = (easeTransition3 - slide) * 6.0 * (slide * 0.5 + 0.5);
  float opacity =
    (
      smoothstep(0.2, 0.4, easeTransition1 * 2.1 - slide) * (1.0 - smoothstep(0.7, 1.0, easeTransition1 * 2.1 - slide))
      + smoothstep(0.2, 0.4, easeTransition2 * 2.1 - slide) * (1.0 - smoothstep(0.7, 1.0, easeTransition2 * 2.1 - slide))
      + smoothstep(0.2, 0.4, easeTransition3 * 2.1 - slide) * (1.0 - smoothstep(0.7, 1.0, easeTransition3 * 2.1 - slide))
      )
    * 0.8;

  // coordinate transformation
  vec3 wavePosition = vec3(0.0, 0.0, wave);
  vec3 slidePosition = vec3(
    cos(radians(noiseR * 360.0 + time * 200.0)) * (2.0 + 2.0 * slide),
    sin(radians(noiseG * 360.0 + time * 200.0)) * (2.0 + 2.0 * slide),
    height1 + height2 + height3
    );
  vec3 updatePosition = position + wavePosition + slidePosition;
  vec4 mPosition = modelMatrix * vec4(updatePosition, 1.0);

  float distanceFromCamera = length((viewMatrix * mPosition).xyz);
  float pointSize = 4.0 * pixelRatio * 50.0 / distanceFromCamera * resolution.y / 1024.0;

  vOpacity = opacity;

  gl_Position = projectionMatrix * viewMatrix * mPosition;
  gl_PointSize = pointSize;
}
