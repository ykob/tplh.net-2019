import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const objLoader = new OBJLoader();

export default function(src) {
  return new Promise((resolve, reject) => {
    objLoader.load(src, resolve, null, reject);
  });
}
