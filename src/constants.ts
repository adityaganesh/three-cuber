const FACES = ["U", "L", "F", "R", "B", "D"] as const;
export type TFACES = typeof FACES[number];

export type TColors = {
  [key in TFACES]: string;
};

//Colors by FACE
export const COLORS: TColors = {
  U: "#FFFFFF",
  L: "#FF5900",
  F: "#009B48",
  R: "#B90000",
  B: "#0045AD",
  D: "#FFD500",
};
