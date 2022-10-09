import type { TCubeSize } from "../constants";

/*
 * Parser
 * getComments with afterMoveNum
 * getValid Moves with totalMoveNum
 *
 * Point out Invalid Moves
 *
 * Additional:
 * Simplify unnecessarily complex moves notations
 */

export const parser = ({ cubeSize }: { cubeSize: TCubeSize }) => {
  console.log(cubeSize);
};

/**
 * Returns only the comment of one line of particular sol
 *
 */
const cleanComments = (values: string) => {
  //TODO: Remove blank space at the start
  const removeSlash = values.replace(/(\/\/)/g, ""); // Remove '//'
  return removeSlash.replace(/\./g, ""); // Remove '.'
};

/**
 * Returns array of all the comments in solution of raw string
 *
 */
export const getComments = (solution: string): string[] => {
  const cmtRegex = /(\/\/)+/gm;
  const cmtsArr = solution.match(cmtRegex); //gives Array of comments
  if (cmtsArr !== null) {
    const cleanCmtsArr = cmtsArr.map(cleanComments); //Iterating with map to Clean the Comments
    return cleanCmtsArr;
  }
  return [];
};
