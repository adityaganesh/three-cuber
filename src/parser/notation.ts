import type { TCubeSize } from "../constants";
import {
  FACE_MOVES,
  SLICE_MOVES,
  ROTATE_MOVES,
  SUFFIX_MODIFIERS_WIDE,
  SUFFIX_MODIFIERS_NON_WIDE,
  BIG_PREFIX_MODIFIERS,
} from "../constants";

/**
 * Generate Valid WCA Moves for N*N*N cube
 *
 *
 * TODO: for cuboid
 * @param  {{cubeSize:TCubeSize}} {cubeSize}
 */
export const generateValidMoves = ({ cubeSize }: { cubeSize: TCubeSize }) => {
  // Check for really Cube
  let reallyCube = true;
  const size = cubeSize[0];
  // !ts for limited length array? cubeSize[i]
  for (let i = 1; i < 3; i++) {
    if (cubeSize[i] !== size) {
      reallyCube = false;
      break;
    }
  }

  //   Really Cube (nxnxn)
  if (reallyCube) {
    // Generate Valid Moves
    const validWideMoves = [
      ...FACE_MOVES.map((move) =>
        SUFFIX_MODIFIERS_WIDE.map((suffix) => move + suffix)
      ),
    ].flat();

    const validFaceMove = [
      ...FACE_MOVES.map((move) =>
        SUFFIX_MODIFIERS_NON_WIDE.map((suffix) => move + suffix)
      ),
    ].flat();

    const validSliceMoves = [
      ...SLICE_MOVES.map((move) =>
        SUFFIX_MODIFIERS_NON_WIDE.map((suffix) => move + suffix)
      ),
    ].flat();

    const valideRotateMoves = [
      ...ROTATE_MOVES.map((move) =>
        SUFFIX_MODIFIERS_NON_WIDE.map((suffix) => move + suffix)
      ),
    ].flat();

    // [BIG CUBES] For nxnxn && n>3
    if (size > 3) {
      const bigCubeWideMoves = [
        ...validWideMoves.map((wideMove) =>
          BIG_PREFIX_MODIFIERS(size).map((prefix) => prefix + wideMove)
        ),
      ].flat();
      // Only Odd cubeSize have SliceMoves
      if (size % 2 === 1) {
        return [
          ...validWideMoves,
          ...validFaceMove,
          ...validSliceMoves,
          ...valideRotateMoves,
          ...bigCubeWideMoves,
        ];
      }
      // Even cubeSize
      else
        return [
          ...validWideMoves,
          ...validFaceMove,
          ...valideRotateMoves,
          ...bigCubeWideMoves,
        ];
    }
    // For 3x3x3
    else if (size === 3) {
      return [
        ...validWideMoves,
        ...validFaceMove,
        ...validSliceMoves,
        ...valideRotateMoves,
      ];
    }
    // For 2x2x2
    else if (size === 2) {
      return [...validFaceMove, ...valideRotateMoves];
    }
    // For 1x1x1
    else if (size === 1) {
      return valideRotateMoves;
    }
  }

  // TODO: Moves for cuboids (not priority)
  return "NOT REALLY A CUBE";
};
