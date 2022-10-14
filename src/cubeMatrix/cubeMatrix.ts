// Instead of implementing fast moves on a 3D cube.
// We can implement those moves on a 3D matrix, representing the moves.

//## cubeMatrix will represent the state of the cube.
// cubeMatrix: Virtual cube
// Will store position and orientation of each cubelet
// position: by position in array
// ? orientation ??

import type { TCubeSize, TFACES } from "../constants";

export const cubeMatrix = (cubeSize: TCubeSize) => [
  ...Array(cubeSize[0] * cubeSize[1] * cubeSize[2]).keys(),
];

const cubeSize: TCubeSize = [3, 3, 3];
const cubeMatrixArr = cubeMatrix(cubeSize);

const L = cubeMatrixArr.splice(0, cubeSize[1] * cubeSize[2]);
const M = cubeMatrixArr.splice(
  cubeSize[1] * cubeSize[2],
  2 * cubeSize[1] * cubeSize[2]
);
const R = cubeMatrixArr.splice(
  2 * cubeSize[1] * cubeSize[2],
  3 * cubeSize[1] * cubeSize[2]
);

const D = [
  ...L.splice(0, cubeSize[2]),
  ...M.splice(0, cubeSize[2]),
  ...R.splice(0, cubeSize[2]),
];

const E = [
  ...L.splice(cubeSize[2], 2 * cubeSize[2]),
  ...M.splice(cubeSize[2], 2 * cubeSize[2]),
  ...R.splice(cubeSize[2], 2 * cubeSize[2]),
];

const U = [
  ...L.splice(2 * cubeSize[2], 3 * cubeSize[2]),
  ...M.splice(2 * cubeSize[2], 3 * cubeSize[2]),
  ...R.splice(2 * cubeSize[2], 3 * cubeSize[2]),
];
// const D = [...Array(cubeSize[0] * cubeSize[2]).keys()];
// 0 1 2   9 10 11    18 19 20  // 3 3 3
// 0 1 2 3    12 13 14 15  // 2 3 4
// 0 1 2 3 4 20 21 22 23 24 40 41 42 43 44      // 3 4 5
//

const B = [...Array(cubeSize[0] * cubeSize[1]).keys()].map(
  (i) => i * cubeSize[2]
);

const F = [...Array(cubeSize[0] * cubeSize[1]).keys()].map(
  (i) => i * cubeSize[2] + cubeSize[2] - 1
);

export type TCubeMatrixObj = {
  [key in TFACES]: number[];
};
export const cubeMatrixObj: TCubeMatrixObj = {
  U,
  L,
  F,
  R,
  B,
  D,
};

for (let i = 0; i < cubeSize[0]; i++) {
  for (let j = 0; j < cubeSize[1]; j++) {
    for (let k = 0; k < cubeSize[2]; k++) {
      B.push(k);
      // 0, 0+z, 0+2z, 0+
    }
  }
}
