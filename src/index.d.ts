import { Object3D } from "three";
import type { TCubeColor, TCubeSize } from "./constants";

type Parameters = {
  cubeSize: TCubeSize;
  cubeColor: TCubeColor; // URLFBD
};

export declare class RubiksCube extends Object3D {
  constructor();
  parameters: Parameters;
}
