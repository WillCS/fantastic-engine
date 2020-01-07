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
  return new StaticMesh(webGL, {
    defaultDrawMode: webGL.TRIANGLE_STRIP,
    indices: [
      1, 0, 2, 3
    ], 
    vertices: [
       1, 1,  1,
      -1, 1,  1,
      -1, 1, -1,
       1, 1, -1
    ],
      decoration: [
      greenR, greenG, greenB,
      greenR, greenG, greenB,
      greenR, greenG, greenB,
      greenR, greenG, greenB
    ],
    normals: undefined,
    texture: undefined
  });
}

export function getCubeBase(webGL: WebGLRenderingContext): StaticMesh {
  return new StaticMesh(webGL, {
    defaultDrawMode: webGL.TRIANGLES, 
    indices: [
      0,  1,  2,
      2,  1,  3,

      4,  5,  6,
      6,  5,  7,

      8,   9, 10,
      10,  9, 11,

      12, 13, 14,
      14, 13, 15
    ],
    vertices: [
       0.97, -1,  0.97, // NORTH
       0.97,  1,  0.97, // EAST
      -0.97, -1,  0.97, // NORTH
      -0.97,  1,  0.97, // WEST

      -0.97, -1,  0.97, // NORTH
      -0.97,  1,  0.97, // WEST
      -0.97, -1, -0.97, // SOUTH
      -0.97,  1, -0.97, // WEST
      
      -0.97, -1, -0.97, // SOUTH
      -0.97,  1, -0.97, // WEST
       0.97, -1, -0.97, // SOUTH
       0.97,  1, -0.97, // EAST

       0.97, -1, -0.97, // SOUTH
       0.97,  1, -0.97, // EAST
       0.97, -1,  0.97, // NORTH
       0.97,  1,  0.97, // EAST
    ],
    decoration: [
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
    ],
    normals: undefined,
    texture: undefined
  });
}

export function getCubeBaseOutline(webGL: WebGLRenderingContext): StaticMesh {
  return new StaticMesh(webGL, {
    defaultDrawMode: webGL.TRIANGLES, 
    indices: [
      0,  1,  2,
      2,  1,  3,

      4,  5,  6,
      6,  5,  7,

      8,   9, 10,
      10,  9, 11,

      12, 13, 14,
      14, 13, 15
    ],
    vertices: [
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
    ], 
    decoration: [
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
    ],
    normals: undefined,
    texture: undefined
  });
}

export function getAxes(webGL: WebGLRenderingContext): StaticMesh {
  return new StaticMesh(webGL, {
    defaultDrawMode: webGL.LINES, 
    indices: [
      0, 1, 2, 3, 4, 5
    ],
    vertices: [
       100,    0,    0,
      -100,    0,    0,
         0,  100,    0,
         0, -100,    0,
         0,    0,  100,
         0,    0, -100
    ],
    decoration: [
      1, 0, 0,
      1, 0, 0,
      0, 1, 0,
      0, 1, 0,
      0, 0, 1,
      0, 0, 1
    ],
    normals: undefined,
    texture: undefined
  });
}