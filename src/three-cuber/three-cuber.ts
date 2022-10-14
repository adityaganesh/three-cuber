import * as THREE from "three";
import {
  COLORS,
  TCubeColor,
  TCubeSize,
  TFACES,
  MATERIAL_PROPS,
} from "../constants";
import { dcText } from "../dcText";

type TMove = TFACES;

interface TRubiksCube {
  cubeSize: TCubeSize;
  cubeColor: TCubeColor;
  materialProperties: THREE.MeshPhysicalMaterialParameters;
  cubeState: number[];

  private addCube(): void;
  public colorCubletFaces(
    [x, y, z]: TCubeSize,
    [i, j, k]: [number, number, number]
  ): THREE.MeshPhysicalMaterial[];

  protected updateCubeState(move: TMove): void;
  public doMove(move: TMove, animate: boolean): void;
  public cubeSticker(text: string, id: number);
}

/**
 * Rubiks Cube Object3D
 *
 * @params {TCubeSize} cubeSize - The size of the cube
 * @params {TCubeColor} cubeColor - The color of the cube
 * @params {THREE.MeshPhysicalMaterialParameters} materialProperties - The material properties of the cube
 */
export class RubiksCube extends THREE.Object3D implements TRubiksCube {
  cubeState: number[];

  constructor(
    public cubeSize: TCubeSize = [3, 3, 3],
    public cubeColor: TCubeColor = COLORS,
    public materialProperties: THREE.MeshPhysicalMaterialParameters = MATERIAL_PROPS
  ) {
    super();

    this.cubeSize = cubeSize;
    this.cubeColor = cubeColor;
    this.materialProperties = materialProperties;

    this.cubeState = [
      ...Array(this.cubeSize[0] * this.cubeSize[1] * this.cubeSize[2]).keys(),
    ];

    this.addCube(); // Create the cube
    this.cubeSticker("U", 0);
    // Add turn limitation for cuboids ???
    //(because they may not be physically possible)
    //(or For bandaged cubes)
  }

  /**
   * Add the cublets to Rubiks Cube Object3D
   */
  private addCube() {
    // Create Cube
    const cubeletGap = 5;
    const cubeletSize = 50;
    const noMoveGroup = new THREE.Group();
    const moveGroup = new THREE.Group();
    let cubeletId: number = 0;
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

            const cubelet = dcText(
              `${cubeletId}`,
              15,
              20,
              50,
              0x000000,
              0xcccccc
            ); // text #1, Hello, world

            // const cubelet = new THREE.Mesh(
            //   geometry,
            //   faceMaterials
            //   // this.cubeSize[0] * this.cubeSize[1] * this.cubeSize[2]
            // );

            // Setting position of Rubiks Cube in the scene
            // TODO: if coord constain (0,n1,n2,n3) then it is a face cubelet, hide rest

            cubelet.position.set(
              offset(this.cubeSize[0]) + spaceX,
              offset(this.cubeSize[1]) + spaceY,
              offset(this.cubeSize[2]) + spaceZ
            );

            noMoveGroup.add(cubelet);
          }
          cubeletId++;
        }
      }
    }

    // Add Groups as child of Rubiks Cube Object3D
    this.add(noMoveGroup);
    this.add(moveGroup);
  }

  /**
   * Color Cubelet faces based on cubelet's position and face's facing direction
   * @param {Array} cubeSize Size of cube
   * @param {Array<number,number,number>} ijk Nested Loops indices, which we used to form the cube
   * @returns {Array<THREE.MeshPhysicalMaterial>} faceMaterials: Array of materials for each face of cubelet
   */
  public colorCubletFaces(
    [x, y, z]: TCubeSize,
    [i, j, k]: [number, number, number]
  ): THREE.MeshPhysicalMaterial[] {
    // Base color of cubelet
    // TODO: Move Materials out of here (this functions runs n1*n2*n3 times)
    const faceMaterials = [
      new THREE.MeshPhysicalMaterial({ color: "#000000", clearcoat: 0.5 }), // Right
      new THREE.MeshPhysicalMaterial({ color: "#000000", clearcoat: 0.5 }), // Left
      new THREE.MeshPhysicalMaterial({ color: "#000000", clearcoat: 0.5 }), // Up
      new THREE.MeshPhysicalMaterial({ color: "#000000", clearcoat: 0.5 }), // Down
      new THREE.MeshPhysicalMaterial({ color: "#000000", clearcoat: 0.5 }), // Front
      new THREE.MeshPhysicalMaterial({ color: "#000000", clearcoat: 0.5 }), // Back
    ];
    // Order of Colors in faceMaterials
    // RLUDFB

    // Face Identification -> Cublets -> Face Colors

    if (i === x - 1) {
      // Right Cubelets
      faceMaterials[0] = new THREE.MeshPhysicalMaterial({
        color: COLORS.R,
        clearcoat: 0.5,
      }); // Colors Right face
    }
    if (i === 0) {
      // Left Cubelets
      faceMaterials[1] = new THREE.MeshPhysicalMaterial({
        color: COLORS.L,
        clearcoat: 0.5,
      }); // Colors Left face
    }
    if (j === y - 1) {
      // Up Cubelets
      faceMaterials[2] = new THREE.MeshPhysicalMaterial({
        color: COLORS.U,
        clearcoat: 0.5,
      }); // Colors Up face
    }
    if (j === 0) {
      // Down Cubelets
      faceMaterials[3] = new THREE.MeshPhysicalMaterial({
        color: COLORS.D,
        clearcoat: 0.5,
      }); // Colors Down face
    }
    if (k === z - 1) {
      // Front Cubelets
      faceMaterials[4] = new THREE.MeshPhysicalMaterial({
        color: COLORS.F,
        clearcoat: 0.5,
      }); // Colors Front face
    }
    if (k === 0) {
      // Back Cubelets
      faceMaterials[5] = new THREE.MeshPhysicalMaterial({
        color: COLORS.B,
        clearcoat: 0.5,
      }); // Colors Back face
    }

    return faceMaterials;
  }

  /**
   * Tracks cubelets position (TODO: track orientation)
   *
   * @param move Move performed
   */
  protected updateCubeState(move: TMove) {
    console.log(move);
  }

  /**
   * Implement Moves on Rubiks Cube
   *
   * @param move Move to be performed, in WCA Notation
   * @param animate Boolean for animate or not
   */
  public doMove(move: TMove, animate: boolean) {
    //! Need to add all moves.
    // Add cubelets to the moveGroup, that need to be moved.
    // Add rest of the cubelets to noMoveGroup.
    // (So, they still remain under scene object)
    console.log(move, animate);
  }
  public cubeSticker(text: string, id: number) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const texture = new THREE.Texture(canvas);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const geometry = new THREE.PlaneGeometry(0.5, 0.5);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.scale.set(200, 200, 200);
    mesh.name = id.toString();
    this.add(mesh);
    return mesh;
  }
}
/* HOW TO ADD CUBE:
  1. YOU NEED A SCENE TO ADD THE CUBE INTO(THREE JS)
  2. YOU NEED THE SIZE(USER PASS)
  3. YOU NEED THE PADDING (USER PASS)
  4. YOU NEEED STYLING (COLOR SCHEME , CUSTOM STICKERS)(USER PASS)
  
*/
