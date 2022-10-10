import * as THREE from "three";
import type { TCubeColor, TCubeSize, TFACES } from "../constants";

type TMove = TFACES;
export class RubiksCube extends THREE.Object3D {
  cubeSize: TCubeSize;
  cubeColor: TCubeColor;
  cubeState: number[];

  constructor(cubeSize: TCubeSize, cubeColor: TCubeColor) {
    super();
    this.cubeSize = cubeSize;
    this.cubeColor = cubeColor;

    this.cubeState = [...Array(cubeSize[0] * cubeSize[1] * cubeSize[2]).keys()];
    this.addCube(); // Create the cube
    this.color(); //Add the color to cube
  }

  /**
   * Add the cublets to Rubiks Cube Object3D
   */
  addCube() {
    // Create Cube
    const cubeletGap = 5;
    const cubeletSize = 50;
    const noMoveGroup = new THREE.Group();
    const moveGroup = new THREE.Group();

    for (let i = 0; i < this.cubeSize[0]; i++) {
      let spaceX = (cubeletSize + cubeletGap) * i;
      for (let j = 0; j < this.cubeSize[1]; j++) {
        let spaceY = (cubeletSize + cubeletGap) * j;
        for (let k = 0; k < this.cubeSize[2]; k++) {
          let spaceZ = (cubeletSize + cubeletGap) * k;

          //Create each cubelet
          var cubelet = new THREE.Mesh(
            new THREE.BoxGeometry(50, 50, 50),
            new THREE.MeshStandardMaterial({
              color: 0x34f,
              wireframe: false,
              transparent: false,
              opacity: 1,
            })
          );

          // Setting position of Rubiks Cube in the scene

          /**
           * Offset to center the cube in particular direction base on size of cube
           * @param size : No. of cubelets in a particular direction
           * @returns Offset required to center the cube in that direction
           */
          const offset = (size: number) => {
            return -((cubeletSize + cubeletGap) * (size - 1)) / 2;
          };

          cubelet.position.set(
            offset(this.cubeSize[0]) + spaceX,
            offset(this.cubeSize[1]) + spaceY,
            offset(this.cubeSize[2]) + spaceZ
          );

          noMoveGroup.add(cubelet);
        }
      }
    }
    this.add(noMoveGroup);
    this.add(moveGroup);
  }

  color() {}

  /**
   * Tracks cubelets position (TODO: track orientation)
   *
   * @param move Move performed
   */
  updateCubeState(move: TMove) {}

  /**
   * Implement Moves on Rubiks Cube
   *
   * @param move Move to be performed, in WCA Notation
   * @param animate Boolean for animate or not
   */
  doMove(move: TMove, animate: boolean) {
    //! Need to add all moves.
    // Add cubelets to the moveGroup, that need to be moved.
    // Add rest of the cubelets to noMoveGroup.
    // (So, they still remain under scene object)
  }
}
/* HOW TO ADD CUBE:
  1. YOU NEED A SCENE TO ADD THE CUBE INTO(THREE JS)
  2. YOU NEED THE SIZE(USER PASS)
  3. YOU NEED THE PADDING (USER PASS)
  4. YOU NEEED STYLING (COLOR SCHEME , CUSTOM STICKERS)(USER PASS)
  
*/
