import { TextureLoader } from 'three';

const texLoader = new TextureLoader();

export default function(src) {
  return new Promise((resolve, reject) => {
    texLoader.load(src, resolve, null, reject);
  });
}
