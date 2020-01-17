import * as dat from 'dat.gui';

export default function(skull) {
  const gui = new dat.GUI();
  const elm = document.body.querySelector('.dg.ac');
  elm.style.zIndex = 100000;

  const skullBodyUniforms = skull.body.material.uniforms;
  const skullBodyObj = {
    h: skullBodyUniforms.hsv1.value.x,
    s: skullBodyUniforms.hsv1.value.y,
    v: skullBodyUniforms.hsv1.value.z,
  }
  const guiSkullBody = gui.addFolder('SkullBody');
  guiSkullBody.add(skullBodyObj, 'h', 0, 1, 0.01).onChange((response) => {
    skull.body.material.uniforms.hsv1.value.setX(response)
  });
  guiSkullBody.add(skullBodyObj, 's', 0, 1, 0.01).onChange((response) => {
    skull.body.material.uniforms.hsv1.value.setY(response)
  });
  guiSkullBody.add(skullBodyObj, 'v', 0, 1, 0.01).onChange((response) => {
    skull.body.material.uniforms.hsv1.value.setZ(response)
  });

  const skullAuraUniforms = skull.aura.material.uniforms;
  const skullAuraObj = {
    hsv1h: skullAuraUniforms.hsv1.value.x,
    hsv1s: skullAuraUniforms.hsv1.value.y,
    hsv1v: skullAuraUniforms.hsv1.value.z,
    hsv2h: skullAuraUniforms.hsv2.value.x,
    hsv2s: skullAuraUniforms.hsv2.value.y,
    hsv2v: skullAuraUniforms.hsv2.value.z,
    strength: skullAuraUniforms.strength.value,
    colorRangeMin: skullAuraUniforms.colorRangeMin.value,
    colorRangeMax: skullAuraUniforms.colorRangeMax.value,
    opacityRangeMin: skullAuraUniforms.opacityRangeMin.value,
    opacityRangeMax: skullAuraUniforms.opacityRangeMax.value,
    opacityBase: skullAuraUniforms.opacityBase.value,
  }
  const guiSkullAura = gui.addFolder('SkullAura');
  guiSkullAura.add(skullAuraObj, 'hsv1h', 0, 1, 0.01).onChange((response) => {
    skull.aura.material.uniforms.hsv1.value.setX(response)
  });
  guiSkullAura.add(skullAuraObj, 'hsv1s', 0, 1, 0.01).onChange((response) => {
    skull.aura.material.uniforms.hsv1.value.setY(response)
  });
  guiSkullAura.add(skullAuraObj, 'hsv1v', 0, 1, 0.01).onChange((response) => {
    skull.aura.material.uniforms.hsv1.value.setZ(response)
  });
  guiSkullAura.add(skullAuraObj, 'hsv2h', 0, 1, 0.01).onChange((response) => {
    skull.aura.material.uniforms.hsv2.value.setX(response)
  });
  guiSkullAura.add(skullAuraObj, 'hsv2s', 0, 1, 0.01).onChange((response) => {
    skull.aura.material.uniforms.hsv2.value.setY(response)
  });
  guiSkullAura.add(skullAuraObj, 'hsv2v', 0, 1, 0.01).onChange((response) => {
    skull.aura.material.uniforms.hsv2.value.setZ(response)
  });
  guiSkullAura.add(skullAuraObj, 'strength', 1, 3, 0.01).onChange((response) => {
    skull.aura.material.uniforms.strength.value = response
  });
  guiSkullAura.add(skullAuraObj, 'colorRangeMin', 0, 1, 0.01).onChange((response) => {
    skull.aura.material.uniforms.colorRangeMin.value = response
  });
  guiSkullAura.add(skullAuraObj, 'colorRangeMax', 0, 1, 0.01).onChange((response) => {
    skull.aura.material.uniforms.colorRangeMax.value = response
  });
  guiSkullAura.add(skullAuraObj, 'opacityRangeMin', 0, 1, 0.01).onChange((response) => {
    skull.aura.material.uniforms.opacityRangeMin.value = response
  });
  guiSkullAura.add(skullAuraObj, 'opacityRangeMax', 0, 1, 0.01).onChange((response) => {
    skull.aura.material.uniforms.opacityRangeMax.value = response
  });
  guiSkullAura.add(skullAuraObj, 'opacityBase', 0, 1, 0.01).onChange((response) => {
    skull.aura.material.uniforms.opacityBase.value = response
  });
}
