import { cubeMatrixObj } from "./cubeMatrix";
import type { TCubeMatrixObj } from "./cubeMatrix";
import {
  ROTATE_MOVES,
  SLICE_MOVES,
  TFACES,
  TROTATE_MOVES,
  TSLICE_MOVES,
} from "../constants";

interface TDecomposedMove {
  baseMove: TFACES | TSLICE_MOVES | TROTATE_MOVES;
  prefix: number | null; // Only for wide turns
  rotationFactor: 1 | 2 | 3;
  clockwise: boolean;
}

export const decomposeMove = (move: string): TDecomposedMove => {
  //# Decompose move to face, and modifiers =[prefix, suffix]
  // w => indicates check for prefix
  // 3Rw2'
  // 3 [prefix] => R face + 2 right middle layers. =
  // R [move]
  // 2' [suffix] => 2 anti-clockwise turns
  // prefix + move => gives cubelets
  // suffix => gives number of turns and direction
  let prefix: TDecomposedMove["prefix"] = null;

  // # PREFIX (Only wide moves have prefixes)
  const wideMove = /w/;
  const wideMoveMatch = wideMove.exec(move);
  if (wideMoveMatch) {
    if ((wideMoveMatch.index = 2)) {
      prefix = parseInt(move.slice(0, 1));
    }
    prefix = 2; // Default prefix is 2, indicating 2 layers
  }

  // # BASE MOVE
  const baseMove = /R|L|U|D|F|B|M|E|S|x|y|z/;
  const baseMoveMatch = baseMove.exec(move);

  const afterBaseMove = move.slice(baseMoveMatch!.index + 1);
  console.log(afterBaseMove);

  // # SUFFIX
  const suffixRotationFactor = /2|3/.exec(afterBaseMove);
  const suffixCCW = /'/.exec(afterBaseMove);

  const rotationFactor = suffixRotationFactor
    ? (parseInt(suffixRotationFactor[0]) as TDecomposedMove["rotationFactor"])
    : (1 as TDecomposedMove["rotationFactor"]);

  const clockwise = suffixCCW ? false : true;

  return {
    baseMove: baseMoveMatch![0] as TDecomposedMove["baseMove"],
    prefix,
    rotationFactor,
    clockwise,
  };
};

interface TCubeletsAxis {
  cubelets: number[];
  axis: "x" | "y" | "z";
}

export const updateCubeMatrixObj = (
  cubeMatrixObj: TCubeMatrixObj,
  decomposedMove: TDecomposedMove
): TCubeletsAxis => {
  if (decomposedMove.baseMove in ROTATE_MOVES) {
    // Rotate the cube
  }
  console.log(cubeMatrixObj);

  // Wide move
  // Update cubeMatrixObj

  // with baseMove and prefix
  //
  return { cubelets: [], axis: "x" };
};

type TCubelets = number[];
interface TTurnInfo {
  cubelets: TCubelets;
  rotationFactor: 1 | 2 | 3;
  axis: "x" | "y" | "z";
  clockwise: boolean;
}

/**
 * Mutate the cubeMatrixObj State and return TurnInfo
 *
 * @param cubeMatrixObj
 * @param move
 * @returns
 */
export const onMoveTurnInfoAndUpdateMatrix = (move: string): TTurnInfo => {
  //# Decompose move to face, and modifiers =[prefix, suffix]
  const { baseMove, prefix, clockwise, rotationFactor } = decomposeMove(move);

  //# Apply tranformations to cubeMatrixObj
  const { cubelets, axis } = updateCubeMatrixObj(cubeMatrixObj, {
    baseMove,
    prefix,
    clockwise,
    rotationFactor,
  });

  //# Return MoveTurnInfo
  return { cubelets, rotationFactor, axis, clockwise };
};
