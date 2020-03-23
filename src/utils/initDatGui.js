import * as dat from 'dat.gui';

export default function(skull, petalRotate, petalHsv1, petalHsv2, petalHsv3) {
  const gui = new dat.GUI();
  const elm = document.body.querySelector('.dg.ac');
  elm.style.zIndex = 100000;

  const skullBodyUniforms = skull.body.material.uniforms;
  const skullBodyObj = {
    h: skullBodyUniforms.hsv1.value.x,
    s: skullBodyUniforms.hsv1.value.y,
    v: skullBodyUniforms.hsv1.value.z
  };
  const guiSkullBody = gui.addFolder('SkullBody');
  guiSkullBody.add(skullBodyObj, 'h', 0, 1, 0.01).onChange(response => {
    skull.body.material.uniforms.hsv1.value.setX(response);
  });
  guiSkullBody.add(skullBodyObj, 's', 0, 1, 0.01).onChange(response => {
    skull.body.material.uniforms.hsv1.value.setY(response);
  });
  guiSkullBody.add(skullBodyObj, 'v', 0, 1, 0.01).onChange(response => {
    skull.body.material.uniforms.hsv1.value.setZ(response);
  });

  const skullAuraUniforms = skull.aura.material.uniforms;
  const skullAuraObj = {
    hsv1h: skull.aura.hsv1Base.x,
    hsv1s: skull.aura.hsv1Base.y,
    hsv1v: skull.aura.hsv1Base.z,
    hsv2h: skullAuraUniforms.hsv2.value.x,
    hsv2s: skullAuraUniforms.hsv2.value.y,
    hsv2v: skullAuraUniforms.hsv2.value.z,
    strength: skull.aura.strengthBase,
    colorRangeMin: skull.aura.colorRangeMinBase,
    colorRangeMax: skullAuraUniforms.colorRangeMax.value,
    opacityRangeMin: skullAuraUniforms.opacityRangeMin.value,
    opacityRangeMax: skullAuraUniforms.opacityRangeMax.value,
    opacityBase: skullAuraUniforms.opacityBase.value
  };
  const guiSkullAura = gui.addFolder('SkullAura');
  guiSkullAura.add(skullAuraObj, 'hsv1h', 0, 1, 0.01).onChange(response => {
    skull.aura.hsv1Base.setX(response);
  });
  guiSkullAura.add(skullAuraObj, 'hsv1s', 0, 1, 0.01).onChange(response => {
    skull.aura.hsv1Base.setY(response);
  });
  guiSkullAura.add(skullAuraObj, 'hsv1v', 0, 1, 0.01).onChange(response => {
    skull.aura.hsv1Base.setZ(response);
  });
  guiSkullAura.add(skullAuraObj, 'hsv2h', 0, 1, 0.01).onChange(response => {
    skull.aura.material.uniforms.hsv2.value.setX(response);
  });
  guiSkullAura.add(skullAuraObj, 'hsv2s', 0, 1, 0.01).onChange(response => {
    skull.aura.material.uniforms.hsv2.value.setY(response);
  });
  guiSkullAura.add(skullAuraObj, 'hsv2v', 0, 1, 0.01).onChange(response => {
    skull.aura.material.uniforms.hsv2.value.setZ(response);
  });
  guiSkullAura.add(skullAuraObj, 'strength', 1, 3, 0.01).onChange(response => {
    skull.aura.strengthBase = response;
  });
  guiSkullAura
    .add(skullAuraObj, 'colorRangeMin', 0, 1, 0.01)
    .onChange(response => {
      skull.aura.colorRangeMinBase = response;
    });
  guiSkullAura
    .add(skullAuraObj, 'colorRangeMax', 0, 1, 0.01)
    .onChange(response => {
      skull.aura.material.uniforms.colorRangeMax.value = response;
    });
  guiSkullAura
    .add(skullAuraObj, 'opacityRangeMin', 0, 1, 0.01)
    .onChange(response => {
      skull.aura.material.uniforms.opacityRangeMin.value = response;
    });
  guiSkullAura
    .add(skullAuraObj, 'opacityRangeMax', 0, 1, 0.01)
    .onChange(response => {
      skull.aura.material.uniforms.opacityRangeMax.value = response;
    });
  guiSkullAura
    .add(skullAuraObj, 'opacityBase', 0, 1, 0.01)
    .onChange(response => {
      skull.aura.material.uniforms.opacityBase.value = response;
    });

  const petalObj = {
    hide: petalRotate.visible,
    hsv1h: petalHsv1.x,
    hsv1s: petalHsv1.y,
    hsv1v: petalHsv1.z,
    hsv2h: petalHsv2.x,
    hsv2s: petalHsv2.y,
    hsv2v: petalHsv2.z,
    hsv_dissolve_h: petalHsv3.x,
    hsv_dissolve_s: petalHsv3.y,
    hsv_dissolve_v: petalHsv3.z
  };
  const guiPetal = gui.addFolder('Petal');
  guiPetal.add(petalObj, 'hide').onChange(response => {
    petalRotate.visible = response;
  });
  guiPetal.add(petalObj, 'hsv1h', 0, 1, 0.01).onChange(response => {
    petalHsv1.setX(response);
  });
  guiPetal.add(petalObj, 'hsv1s', 0, 1, 0.01).onChange(response => {
    petalHsv1.setY(response);
  });
  guiPetal.add(petalObj, 'hsv1v', 0, 1, 0.01).onChange(response => {
    petalHsv1.setZ(response);
  });
  guiPetal.add(petalObj, 'hsv2h', 0, 1, 0.01).onChange(response => {
    petalHsv2.setX(response);
  });
  guiPetal.add(petalObj, 'hsv2s', 0, 1, 0.01).onChange(response => {
    petalHsv2.setY(response);
  });
  guiPetal.add(petalObj, 'hsv2v', 0, 1, 0.01).onChange(response => {
    petalHsv2.setZ(response);
  });
  guiPetal.add(petalObj, 'hsv_dissolve_h', 0, 1, 0.01).onChange(response => {
    petalHsv3.setX(response);
  });
  guiPetal.add(petalObj, 'hsv_dissolve_s', 0, 1, 0.01).onChange(response => {
    petalHsv3.setY(response);
  });
  guiPetal.add(petalObj, 'hsv_dissolve_v', 0, 1, 0.01).onChange(response => {
    petalHsv3.setZ(response);
  });
}
