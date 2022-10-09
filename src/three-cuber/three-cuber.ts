import {
    PerspectiveCamera,
    Scene,
    BoxGeometry,
    MeshNormalMaterial,
    Mesh,
    WebGLRenderer,
    MeshBasicMaterial,
    DoubleSide,
    Object3D
  } from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from 'three';
import type { TCubeColor, TCubeSize } from "../constants";


export class RubiksCube extends Object3D
{
  
  cubeSize: TCubeSize
  cubeColor: TCubeColor
  constructor(cubeSize: TCubeSize, cubeColor: TCubeColor)
  {
    super();
    this.cubeSize = cubeSize
    this.cubeColor = cubeColor
    this.addCube(); // Create the cube
    this.color(); //Add the color to cube
  };

  /**
   * Add the cublets to Rubiks Cube Object3D
   */
  addCube(){
    var padding
    padding = 5;
    for (var i = 0; i < this.cubeSize[0]; i++)
    {
      spacey = (50 + padding) * i;
      for (var j = 0; j < this.cubeSize[1]; j++) 
      {
        space = (50 + padding) * i;
        for (var k = 0; k < this.cubeSize[2]; k++) 
        {
          spacex = (50 + padding) * i;
          
          //Creation of each cubelet
          var cubelet = new THREE.Mesh
          (
            new THREE.BoxGeometry(50, 50, 50),
            new THREE.MeshBasicMaterial
            (
              {
                color: 0x34f,
                wireframe: false,
                transparent: true,
                opacity: 1,
                side: THREE.DoubleSide,
            }
            )
           );
           var space, spacex, spacey;
           spacex = (50 + padding) * k;
           // setting position of rubiks in the scene
           cubelet.position.set(
               -(50 + padding) + spacex,
               -(50 + padding) + spacey,
               -(50 + padding) + space
           );
           cubelet.updateMatrixWorld(true);
           cubelet.matrixAutoUpdate = true;

           console.log("RUN");

           this.add(cubelet);
        }
      }
    }
    
  }
  color()
  {


    
  }
}
/* HOW TO ADD CUBE:
  1. YOU NEED A SCENE TO ADD THE CUBE INTO(THREE JS)
  2. YOU NEED THE SIZE(USER PASS)
  3. YOU NEED THE PADDING (USER PASS)
  4. YOU NEEED STYLING (COLOR SCHEME , CUSTOM STICKERS)(USER PASS)
  
*/