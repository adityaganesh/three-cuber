// ####### Making the Cube #######
const FACES = ["U", "L", "F", "R", "B", "D"] as const;
export type TFACES = typeof FACES[number];

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

export type TCubeColor = {
  [key in TFACES]: Color;
};

//Colors by FACE
export const COLORS: TCubeColor = {
  U: "#FFFFFF",
  L: "#FF5900",
  F: "#009B48",
  R: "#B90000",
  B: "#0045AD",
  D: "#FFD500",
};

// ####### Moving the Cube #######

// Cube Notations

export const FACE_TURN = FACES;
export const SLICE_TURN = ["M", "E", "S"] as const;
export const WHOLE_TURN = ["X", "Y", "Z"] as const;

// Notation Modifiers

// Suffixes
export const SUFFIX_MODIFIERS = ["", "'", "2", "w"] as const;

// //# Big Cubes
// export const BIG_SUFFIX_MODIFIERS = ["w"] as const;

// // Prefixes
// export const BIG_PREFIX_MODIFIERS: number[] = [];
