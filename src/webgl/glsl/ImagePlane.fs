precision highp float;

uniform float time;
uniform float easeTransition1;
uniform float easeTransition2;
uniform float easeTransition3;
uniform vec2 imgRatio;
uniform sampler2D noiseTex;
uniform sampler2D imgTex1;
uniform sampler2D imgTex2;
uniform sampler2D imgTex3;

varying vec2 vUv;
varying vec2 vUpdateUv;
varying float vTime1;
varying float vTime2;
varying float vTime3;

#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb)

void main() {
  vec2 imgUv = vec2(
    vUv.x * imgRatio.x + (1.0 - imgRatio.x) * 0.5,
    vUv.y * imgRatio.y + (1.0 - imgRatio.y) * 0.5
  );
  vec2 p = vUv * 2.0 - 1.0;

  float noiseR = texture2D(noiseTex, vUpdateUv - vec2(time * 0.04, 0.0)).r;
  float noiseG = texture2D(noiseTex, vUpdateUv + vec2(time * 0.04, 0.0)).g;
  float slide = texture2D(noiseTex, vUv * vec2(0.998) + 0.001).b;

  float mask1 = vTime1 * 1.38 - (slide * 0.6 + noiseR * 0.2 + noiseG * 0.2);
  float maskPrev1 = 1.0 - smoothstep(0.17, 0.19, mask1);
  float maskNext1 = smoothstep(0.19, 0.21, mask1);
  float maskEdge1 = smoothstep(0.04, 0.19, mask1) * (1.0 - smoothstep(0.19, 0.34, mask1));

  float mask2 = vTime2 * 1.38 - (slide * 0.6 + noiseR * 0.2 + noiseG * 0.2);
  float maskPrev2 = 1.0 - smoothstep(0.17, 0.19, mask2);
  float maskNext2 = smoothstep(0.19, 0.21, mask2);
  float maskEdge2 = smoothstep(0.04, 0.19, mask2) * (1.0 - smoothstep(0.19, 0.34, mask2));

  float mask3 = vTime3 * 1.38 - (slide * 0.6 + noiseR * 0.2 + noiseG * 0.2);
  float maskPrev3 = 1.0 - smoothstep(0.17, 0.19, mask3);
  float maskNext3 = smoothstep(0.19, 0.21, mask3);
  float maskEdge3 = smoothstep(0.04, 0.19, mask3) * (1.0 - smoothstep(0.19, 0.34, mask3));

  vec4 img1 = texture2D(imgTex1, imgUv - p * 0.1 * (1.0 - easeTransition3));
  vec4 img2 = texture2D(imgTex2, imgUv - p * 0.1 * (1.0 - easeTransition1));
  vec4 img3 = texture2D(imgTex3, imgUv - p * 0.1 * (1.0 - easeTransition2));

  vec3 edgeColor = convertHsvToRgb(
    vec3(1.1 - noiseG * 0.1, 0.45, 0.45)
    );

  vec4 color1 = img1 * maskNext3 * maskPrev1;
  vec4 color2 = img2 * maskNext1 * maskPrev2;
  vec4 color3 = img3 * maskNext2 * maskPrev3;
  vec3 color4 = edgeColor * (maskEdge1 + maskEdge2 + maskEdge3);
  float opacity = (color1.a + color2.a + color3.a) * (0.5 + maskEdge1 * 0.5);

  if (opacity < 0.01) {
    discard;
  }

  gl_FragColor = vec4(color1.rgb + color2.rgb + color3.rgb + color4, opacity);
}
