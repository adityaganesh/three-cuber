// ####### Making the Cube #######

export type Tuple<
  T,
  N extends number,
  R extends readonly T[] = []
> = R["length"] extends N ? R : Tuple<T, N, readonly [T, ...R]>;

export const generateArray = (n: number) =>
  [...Array(n)].map((_, index) => index + 1);

export type TCubeSize = Tuple<number, 3>;

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

export const FACE_MOVES = FACES;
export const SLICE_MOVES = ["M", "E", "S"] as const;
export const ROTATE_MOVES = ["x", "y", "z"] as const;

// Notation Modifiers

// Suffixes
// For 3x3x3 to infinity, for FACE_TURN
export const SUFFIX_MODIFIERS_WIDE = ["w", "w2", "w2'"];
export const SUFFIX_MODIFIERS_NON_WIDE = ["2", "2'", "'", ""];

// //# Only for Big Cubes [PREFIX_MODIFIERS]
// For 4x4x4 to infinity
export const BIG_PREFIX_MODIFIERS = (n: number): number[] => {
  // Generates [3,4] for 4x4x4 ..
  // Since Valid wide moves are nRw, where n is (1<n<cubeSize), and no n implies n=2
  //! Add errors for 1Rw, 2Rw -> they imply 2Rw = Rw,
  //! nRw = x for all cubes
  // ? Pass these as error arrays, or alert dev or just use correct moves for them.
  return [...Array(n - 3)].map((_, index) => index + 3);
};
