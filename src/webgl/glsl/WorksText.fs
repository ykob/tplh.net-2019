precision highp float;

uniform float time;
uniform sampler2D tex;
uniform float prevIndex;
uniform float prevMaxUvX;
uniform float nextIndex;
uniform float nextMaxUvX;
uniform float maxIndex;
uniform float alphaShow;
uniform float alphaHide;
uniform float direction;

varying vec2 vUv;

const float CHANGE_DIST = 2.0;

void main() {
  // Calculate the mask of text.
  vec2 uvText1 = vec2(
    mod(vUv.x + time * 0.02, prevMaxUvX),
    (clamp((1.0 - vUv.y) * 5.0 + alphaHide * direction * CHANGE_DIST, 2.0, 3.0) + (maxIndex - prevIndex - 3.0)) / maxIndex
    );
  float textMask1 = texture2D(tex, uvText1).r;

  vec2 uvText2 = vec2(
    mod(vUv.x + time * 0.02, nextMaxUvX),
    (clamp((1.0 - vUv.y) * 5.0 - (1.0 - alphaShow) * direction * CHANGE_DIST, 2.0, 3.0) + (maxIndex - nextIndex - 3.0)) / maxIndex
    );
  float textMask2 = texture2D(tex, uvText2).r;

  // Calculate the virtical gradation.
  float gradation = texture2D(tex, vUv).g;

  // Calculate the noise.
  vec2 uvNoise = vec2(
    vUv.x - time * 0.1,
    vUv.y / maxIndex * 5.0
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
