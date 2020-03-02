precision highp float;

uniform float time;
uniform sampler2D tex;
uniform float tex1Index;
uniform float tex1MaxUvX;
uniform float tex2Index;
uniform float tex2MaxUvX;
uniform float tex3Index;
uniform float tex3MaxUvX;
uniform float maxIndex;
uniform float alphaShow1;
uniform float alphaShow2;
uniform float alphaShow3;
uniform float alphaHide1;
uniform float alphaHide2;
uniform float alphaHide3;
uniform float directionShow1;
uniform float directionShow2;
uniform float directionShow3;
uniform float directionHide1;
uniform float directionHide2;
uniform float directionHide3;

varying vec2 vUv;

const float CHANGE_DIST = 2.0;

void main() {
  // Calculate the mask of text.
  vec2 uvText1 = vec2(
    mod(vUv.x + time * 0.02, tex1MaxUvX),
    (clamp((1.0 - vUv.y) * 5.0 - (1.0 - alphaShow1) * directionShow1 * CHANGE_DIST + alphaHide1 * directionHide1 * CHANGE_DIST, 2.0, 3.0) + (maxIndex - tex1Index - 3.0)) / maxIndex
    );
  float textMask1 = texture2D(tex, uvText1).r;

  vec2 uvText2 = vec2(
    mod(vUv.x + time * 0.02, tex2MaxUvX),
    (clamp((1.0 - vUv.y) * 5.0 - (1.0 - alphaShow2) * directionShow2 * CHANGE_DIST + alphaHide2 * directionHide2 * CHANGE_DIST, 2.0, 3.0) + (maxIndex - tex2Index - 3.0)) / maxIndex
    );
  float textMask2 = texture2D(tex, uvText2).r;

  vec2 uvText3 = vec2(
    mod(vUv.x + time * 0.02, tex3MaxUvX),
    (clamp((1.0 - vUv.y) * 5.0 - (1.0 - alphaShow3) * directionShow3 * CHANGE_DIST + alphaHide3 * directionHide3 * CHANGE_DIST, 2.0, 3.0) + (maxIndex - tex3Index - 3.0)) / maxIndex
    );
  float textMask3 = texture2D(tex, uvText3).r;

  // Calculate the virtical gradation.
  float gradation = texture2D(tex, vUv).g;

  // Calculate the noise.
  vec2 uvNoise = vec2(
    vUv.x - time * 0.1,
    vUv.y / maxIndex * 5.0
    ) * 2.0;
  float noise = 1.0 - smoothstep(0.4, 0.6, texture2D(tex, uvNoise).b);

  // Calculate the final color and opacioty
  float opacity = (textMask1 + textMask2 + textMask3) * (gradation - (1.0 - gradation) * noise) * 0.4;
  vec3 color = vec3(0.0);

  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4(color, opacity);
}
