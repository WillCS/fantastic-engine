import { StaticMesh } from "./mesh";

const greenR = 88 / 255;
const greenG = 214 / 255;
const greenB = 150 / 255;

const darkGreyR = 47 / 255;
const darkGreyG = 47 / 255;
const darkGreyB = 47 / 255;

const lightGreyR = 88 / 255;
const lightGreyG = 88 / 255;
const lightGreyB = 88 / 255;

export function getCubeTop(webGL: WebGLRenderingContext): StaticMesh {
  return new StaticMesh(webGL, webGL.TRIANGLE_STRIP, [
    1, 0, 2, 3
  ], [
     1.05, 1,  1.05,
    -1.05, 1,  1.05,
    -1.05, 1, -1.05,
     1.05, 1, -1.05
  ], [
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0
  ], [
    greenR, greenG, greenB,
    greenR, greenG, greenB,
    greenR, greenG, greenB,
    greenR, greenG, greenB
  ]);
}

export function getCubeBase(webGL: WebGLRenderingContext): StaticMesh {
  return new StaticMesh(webGL, webGL.TRIANGLES, [
    0,  1,  2,
    2,  1,  3,

    4,  5,  6,
    6,  5,  7,

    8,   9, 10,
    10,  9, 11,

    12, 13, 14,
    14, 13, 15
  ], [
     1, -1,  1, // NORTH
     1,  1,  1, // EAST
    -1, -1,  1, // NORTH
    -1,  1,  1, // WEST

    -1, -1,  1, // NORTH
    -1,  1,  1, // WEST
    -1, -1, -1, // SOUTH
    -1,  1, -1, // WEST
    
    -1, -1, -1, // SOUTH
    -1,  1, -1, // WEST
     1, -1, -1, // SOUTH
     1,  1, -1, // EAST

     1, -1, -1, // SOUTH
     1,  1, -1, // EAST
     1, -1,  1, // NORTH
     1,  1,  1, // EAST

  ], [
     0, 0,  1,
     0, 0,  1, // +ve Z
     0, 0,  1, // NORTH
     0, 0,  1,
    -1, 0,  0,
    -1, 0,  0, // -ve X
    -1, 0,  0, // WEST
    -1, 0,  0,
     0, 0, -1,
     0, 0, -1, // -ve Z
     0, 0, -1, // SOUTH
     0, 0, -1,
     1, 0,  0,
     1, 0,  0, // +ve X
     1, 0,  0, // EAST
     1, 0,  0
  ], [
    darkGreyR, darkGreyG, darkGreyB,
    darkGreyR, darkGreyG, darkGreyB,
    darkGreyR, darkGreyG, darkGreyB,
    darkGreyR, darkGreyG, darkGreyB,
    darkGreyR, darkGreyG, darkGreyB,
    darkGreyR, darkGreyG, darkGreyB,
    darkGreyR, darkGreyG, darkGreyB,
    darkGreyR, darkGreyG, darkGreyB,
    darkGreyR, darkGreyG, darkGreyB,
    darkGreyR, darkGreyG, darkGreyB,
    darkGreyR, darkGreyG, darkGreyB,
    darkGreyR, darkGreyG, darkGreyB,
    darkGreyR, darkGreyG, darkGreyB,
    darkGreyR, darkGreyG, darkGreyB,
    darkGreyR, darkGreyG, darkGreyB,
    darkGreyR, darkGreyG, darkGreyB,
  ]);
}

export function getCubeBaseOutline(webGL: WebGLRenderingContext): StaticMesh {
  return new StaticMesh(webGL, webGL.TRIANGLES, [
    0,  1,  2,
    2,  1,  3,

    4,  5,  6,
    6,  5,  7,

    8,   9, 10,
    10,  9, 11,

    12, 13, 14,
    14, 13, 15
  ], [
     1.05, -1.05,  1.05, // NORTH
     1.05,  1,     1.05, // EAST
    -1.05, -1.05,  1.05, // NORTH
    -1.05,  1,     1.05, // WEST

    -1.05, -1.05,  1.05, // NORTH
    -1.05,  1,     1.05, // WEST
    -1.05, -1.05, -1.05, // SOUTH
    -1.05,  1,    -1.05, // WEST
    
    -1.05, -1.05, -1.05, // SOUTH
    -1.05,  1,    -1.05, // WEST
     1.05, -1.05, -1.05, // SOUTH
     1.05,  1,    -1.05, // EAST

     1.05, -1.05, -1.05, // SOUTH
     1.05,  1,     -1.05, // EAST
     1.05, -1.05,  1.05, // NORTH
     1.05,  1,     1.05, // EAST

  ], [
     0, 0,  1,
     0, 0,  1, // +ve Z
     0, 0,  1, // NORTH
     0, 0,  1,
    -1, 0,  0,
    -1, 0,  0, // -ve X
    -1, 0,  0, // WEST
    -1, 0,  0,
     0, 0, -1,
     0, 0, -1, // -ve Z
     0, 0, -1, // SOUTH
     0, 0, -1,
     1, 0,  0,
     1, 0,  0, // +ve X
     1, 0,  0, // EAST
     1, 0,  0
  ], [
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
    lightGreyR, lightGreyG, lightGreyB,
  ]);
}

export function getAxes(webGL: WebGLRenderingContext): StaticMesh {
  return new StaticMesh(webGL, webGL.LINES, [
    0, 1, 2, 3, 4, 5
  ], [
     100,    0,    0,
    -100,    0,    0,
       0,  100,    0,
       0, -100,    0,
       0,    0,  100,
       0,    0, -100
  ], [
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1
  ], [
    1, 0, 0,
    1, 0, 0,
    0, 1, 0,
    0, 1, 0,
    0, 0, 1,
    0, 0, 1
  ]);
}