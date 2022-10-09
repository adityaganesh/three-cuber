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

          //Create of each cubelet
          var cubelet = new THREE.Mesh(
            new THREE.BoxGeometry(50, 50, 50),
            new THREE.MeshBasicMaterial({
              color: 0x34f,
              wireframe: false,
              transparent: true,
              opacity: 1,
            })
          );

          // Setting position of Rubiks Cube in the scene
          const offset = -(cubeletSize + cubeletGap);
          cubelet.position.set(
            offset + spaceX,
            offset + spaceY,
            offset + spaceZ
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
