// Instead of implementing fast moves on a 3D cube.
// We can implement those moves on a 3D matrix, representing the moves.

//## cubeMatrix will represent the state of the cube.
// cubeMatrix: Virtual cube
// Will store position and orientation of each cubelet
// position: by position in array
// ? orientation ??

import type { TCubeSize, TFACES } from "../constants";

export const cubeMatrix: number[] = [];

// R FACE Elements
const cubeSize: TCubeSize = [3, 3, 3];

const move = "R";
for (let i = 0; i < cubeSize[0]; i++) {
  for (let j = 0; j < cubeSize[1]; j++) {
    for (let k = 0; k < cubeSize[2]; k++) {
      if (move === "R") {
      }
    }
  }
}
