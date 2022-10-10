import * as THREE from "three";
import type { TCubeColor, TCubeSize } from "../constants";

export class RubiksCube extends THREE.Object3D {
  cubeSize: TCubeSize;
  cubeColor: TCubeColor;
  constructor(cubeSize: TCubeSize, cubeColor: TCubeColor) {
    super();
    this.cubeSize = cubeSize;
    this.cubeColor = cubeColor;
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
    const cubelets = new THREE.Group();

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

          cubelets.add(cubelet);
        }
      }
    }
    this.add(cubelets);
  }

  color() {}
}
/* HOW TO ADD CUBE:
  1. YOU NEED A SCENE TO ADD THE CUBE INTO(THREE JS)
  2. YOU NEED THE SIZE(USER PASS)
  3. YOU NEED THE PADDING (USER PASS)
  4. YOU NEEED STYLING (COLOR SCHEME , CUSTOM STICKERS)(USER PASS)
  
*/
