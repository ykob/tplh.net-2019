precision highp float;

uniform float time;
uniform sampler2D tex;
uniform float prevId;
uniform float prevMaxUvX;
uniform float nextId;
uniform float nextMaxUvX;
uniform float maxId;
uniform float alphaChanging;

varying vec2 vUv;

const float CHANGE_DIST = 1.3;

void main() {
  // Calculate the mask of text.
  vec2 uvText1 = vec2(
    mod(vUv.x + time * 0.02, prevMaxUvX),
    (clamp(vUv.y * 3.0 + alphaChanging * CHANGE_DIST, 1.0, 2.0) + (maxId - prevId - 2.0)) / maxId
    );
  float textMask1 = texture2D(tex, uvText1).r;

  vec2 uvText2 = vec2(
    mod(vUv.x + time * 0.02, nextMaxUvX),
    (clamp(vUv.y * 3.0 - (1.0 - alphaChanging) * CHANGE_DIST, 1.0, 2.0) + (maxId - nextId - 2.0)) / maxId
    );
  float textMask2 = texture2D(tex, uvText2).r;

  // Calculate the virtical gradation.
  float gradation = texture2D(tex, vUv).g;

  // Calculate the noise.
  vec2 uvNoise = vec2(
    vUv.x - time * 0.1,
    vUv.y / maxId * 3.0
    ) * 2.0;
  float noise = 1.0 - smoothstep(0.4, 0.6, texture2D(tex, uvNoise).b);

  // Calculate the final color and opacioty
  float opacity = (textMask1 + textMask2) * (gradation - (1.0 - gradation) * noise) * 0.4;
  vec3 color = vec3(0.0);

  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4(color, opacity);
}
