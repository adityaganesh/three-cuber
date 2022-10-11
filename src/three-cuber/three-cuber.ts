import * as THREE from "three";
import { COLORS, TCubeColor, TCubeSize, TFACES } from "../constants";

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

    /**
     * Offset to center the cube in particular direction base on size of cube
     * @param size  No. of cubelets in a particular direction
     * @returns Offset required to center the cube in that direction
     */
    const offset = (size: number) => {
      return -((cubeletSize + cubeletGap) * (size - 1)) / 2;
    };

    for (let i = 0; i < this.cubeSize[0]; i++) {
      let spaceX = (cubeletSize + cubeletGap) * i;
      for (let j = 0; j < this.cubeSize[1]; j++) {
        let spaceY = (cubeletSize + cubeletGap) * j;
        for (let k = 0; k < this.cubeSize[2]; k++) {
          //### Create Only Visible Cubelets
          // Visible Cubelets have extreme values of i || j || k
          if (
            i === 0 ||
            i === this.cubeSize[0] - 1 ||
            j === 0 ||
            j === this.cubeSize[1] - 1 ||
            k === 0 ||
            k === this.cubeSize[2] - 1
          ) {
            let spaceZ = (cubeletSize + cubeletGap) * k;

            //Create each cubelet
            const geometry = new THREE.BoxGeometry(
              cubeletSize,
              cubeletSize,
              cubeletSize
            );

            const faceMaterials = this.colorCubletFaces(this.cubeSize, [
              i,
              j,
              k,
            ]);

            // ? Can be made efficient by using InstancedMesh and Matrix4

            const cubelet = new THREE.Mesh(
              geometry,
              faceMaterials
              // this.cubeSize[0] * this.cubeSize[1] * this.cubeSize[2]
            );

            // Setting position of Rubiks Cube in the scene
            // TODO: if coord constain (0,n1,n2,n3) then it is a face cubelet, hide rest

            cubelet.position.set(
              offset(this.cubeSize[0]) + spaceX,
              offset(this.cubeSize[1]) + spaceY,
              offset(this.cubeSize[2]) + spaceZ
            );

            noMoveGroup.add(cubelet);
          }
        }
      }
    }

    this.add(noMoveGroup);
    this.add(moveGroup);
  }

  /**
   * Color Cubelet faces based on cubelet's position and face's facing direction
   * @param {Array} cubeSize Size of cube
   * @param {Array<number,number,number>} ijk Nested Loops indices, which we used to form the cube
   * @returns {Array<THREE.MeshBasicMaterial>} faceMaterials: Array of materials for each face of cubelet
   */
  colorCubletFaces(
    [x, y, z]: TCubeSize,
    [i, j, k]: [number, number, number]
  ): THREE.MeshBasicMaterial[] {
    // Base color of cubelet
    const faceMaterials = [
      new THREE.MeshBasicMaterial({ color: "#000000" }), // Left
      new THREE.MeshBasicMaterial({ color: "#000000" }), // Right
      new THREE.MeshBasicMaterial({ color: "#000000" }), // Down
      new THREE.MeshBasicMaterial({ color: "#000000" }), // Up
      new THREE.MeshBasicMaterial({ color: "#000000" }), // Back
      new THREE.MeshBasicMaterial({ color: "#000000" }), // Front
    ];
    // Order of Colors in faceMaterials
    // LRDUBF

    // Face Identification -> Cublets -> Face Colors
    if (i === 0) {
      // Left Cubelets
      faceMaterials[1] = new THREE.MeshBasicMaterial({ color: COLORS.L }); // Colors Left face
    }
    if (i === x - 1) {
      // Right Cubelets
      faceMaterials[0] = new THREE.MeshBasicMaterial({ color: COLORS.R }); // Colors Right face
    }
    if (j === 0) {
      // Down Cubelets
      faceMaterials[3] = new THREE.MeshBasicMaterial({ color: COLORS.D }); // Colors Down face
    }
    if (j === y - 1) {
      // Up Cubelets
      faceMaterials[2] = new THREE.MeshBasicMaterial({ color: COLORS.U }); // Colors Up face
    }
    if (k === 0) {
      // Back Cubelets
      faceMaterials[5] = new THREE.MeshBasicMaterial({ color: COLORS.B }); // Colors Back face
    }
    if (k === z - 1) {
      // Front Cubelets
      faceMaterials[4] = new THREE.MeshBasicMaterial({ color: COLORS.F }); // Colors Front face
    }
    return faceMaterials;
  }

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
