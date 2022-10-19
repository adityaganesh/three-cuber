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

const cubeSize: TCubeSize = [1, 5, 1];
const cubeMatrixArr = cubeMatrix(cubeSize);

const LRSize = [...Array(cubeSize[1] * cubeSize[2]).keys()]; // y * z
const L = LRSize.map((i) => i);
const R = LRSize.map((i) => i + cubeSize[1] * cubeSize[2] * (cubeSize[0] - 1));

const noOfMs = cubeSize[0] - 2;

const Ms = (
  noOfMs: number,
  cubeSize: TCubeSize,
  cubeMatrixArr: number[]
): number[][] => {
  const allMs: number[][] = [];
  for (let i = 0; i < noOfMs; i++) {
    allMs.push(
      cubeMatrixArr.slice(
        (i + 1) * cubeSize[1] * cubeSize[2],
        (i + 2) * cubeSize[1] * cubeSize[2]
      )
    );
  }
  return allMs;
};

const allMs = Ms(noOfMs, cubeSize, cubeMatrixArr);

const M = cubeMatrixArr.slice(
  cubeSize[1] * cubeSize[2],
  2 * cubeSize[1] * cubeSize[2]
);

// 0 1 2 3 4 5 6   7  8  9 10 11 12 13 14 15 16 17..
// 0 1 2 3 4 5 30 31 32 33 34 35 60 61 62 63 64 65..

const Dn = [...Array(cubeSize[0] * cubeSize[2]).keys()].map((i) => i); // x * z

//

//TODO: find cubelet ids fro D and U layers independenly
// const Dn = L.slice(0, cubeSize[2]).map((i) => i + cubeSize[2] * cubeSize[1]);

const D = L.slice(0, cubeSize[2]);
allMs.forEach((m) => D.push(...m.slice(0, cubeSize[2])));
D.push(...R.slice(0, cubeSize[2]));

const U = D.map((i) => i + cubeSize[1] * cubeSize[2] - cubeSize[2]);

const noOfEs = cubeSize[1] - 2;

const Es = (noOfEs: number, cubeSize: TCubeSize, D: number[]): number[][] => {
  const allEs: number[][] = [];
  for (let i = 0; i < noOfEs; i++) {
    allEs.push(D.map((j) => j + cubeSize[2] * (i + 1)));
  }
  return allEs;
};

const allEs = Es(noOfEs, cubeSize, D);

// const D = [...Array(cubeSize[0] * cubeSize[2]).keys()];
// 0 1 2   9 10 11    18 19 20  // 3 3 3
// 0 1 2 3    12 13 14 15  // 2 3 4
// 0 1 2 3 4 20 21 22 23 24 40 41 42 43 44      // 3 4 5
//

const FBSize = [...Array(cubeSize[0] * cubeSize[1]).keys()]; // x * y

const B = FBSize.map((i) => i * cubeSize[2]);
const F = FBSize.map((i) => i * cubeSize[2] + cubeSize[2] - 1);

const noOfSs = cubeSize[2] - 2;

const Ss = (noOfSs: number, cubeSize: TCubeSize, B: number[]): number[][] => {
  const allSs: number[][] = [];
  for (let i = 0; i < noOfSs; i++) {
    allSs.push(B.map((j) => j + i + 1));
  }
  return allSs;
};

const allSs = Ss(noOfSs, cubeSize, B);

export type TCubeMatrixObj = {
  [key: string]: number[] | number[][];
};
export const cubeMatrixObj: TCubeMatrixObj = {
  U,
  L,
  F,
  R,
  B,
  D,
  allEs,
  allMs,
  allSs,
  // cubeMatrixArr,
};

for (let i = 0; i < cubeSize[0]; i++) {
  for (let j = 0; j < cubeSize[1]; j++) {
    for (let k = 0; k < cubeSize[2]; k++) {
      // B.push(k);
      // 0, 0+z, 0+2z, 0+
    }
  }
}
