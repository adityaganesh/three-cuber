import { Object3D } from "three";
import type { TCubeColor } from "./constants";

type Tuple<
  T,
  N extends number,
  R extends readonly T[] = []
> = R["length"] extends N ? R : Tuple<T, N, readonly [T, ...R]>;

type Parameters = {
  cubeSize: Tuple<number, 3>;
  cubeColor: TCubeColor; // URLFBD
};

export declare class RubiksCube extends Object3D {
  constructor();
  parameters: Parameters;
}
