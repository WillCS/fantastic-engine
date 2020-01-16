import { DynamicMesh, MeshData } from "../dynamicMesh";
import { Box } from "../../model/entityModel";

const xPlusR  = 1;
const xPlusG  = 0;
const xPlusB  = 0;

const yPlusR  = 0;
const yPlusG  = 1;
const yPlusB  = 0;

const zPlusR  = 0;
const zPlusG  = 0;
const zPlusB  = 1;

const xMinusR = 0;
const xMinusG = 1;
const xMinusB = 1;

const yMinusR = 1;
const yMinusG = 0;
const yMinusB = 1;

const zMinusR = 1;
const zMinusG = 1;
const zMinusB = 0;

export function buildBoxMesh(webGL: WebGLRenderingContext, box: Box): DynamicMesh {
  const meshData: MeshData = {
    vertices:        getBoxVertices(box),
    indices:         getBoxIndices(box),
    normals:         getBoxNormals(box),
    decoration:      getBoxColours(box),
    defaultDrawMode: webGL.TRIANGLES,
    texture:         undefined
  };

  return new DynamicMesh(webGL, meshData);
}

export function updateBoxMesh(webGL: WebGLRenderingContext, box: Box, mesh: DynamicMesh): DynamicMesh {
  const vertices:   number[] = getBoxVertices(box);

  mesh.setVertices(webGL, vertices);

  return mesh;
}

function getBoxVertices(box: Box): number[] {
  const x = box.dimensions.x;
  const y = box.dimensions.y;
  const z = box.dimensions.z;

  return [
    x, y, z, // 0
    0, y, z, // 1
    0, y, 0, // 2
    x, y, 0, // 3

    x, 0, z, // 4
    x, y, z, // 5
    0, 0, z, // 6
    0, y, z, // 7

    0, 0, z, // 8
    0, y, z, // 9
    0, 0, 0, // 10
    0, y, 0, // 11

    0, 0, 0, // 12
    0, y, 0, // 13
    x, 0, 0, // 14
    x, y, 0, // 15

    x, 0, 0, // 16
    x, y, 0, // 17
    x, 0, z, // 18
    x, y, z, // 19

    x, 0, 0, // 20
    0, 0, 0, // 21
    0, 0, z, // 22
    x, 0, z  // 23
  ];
}

function getBoxIndices(box: Box): number[] {
  return [
     2,  1,  0, // TOP        | +Y
     2,  0,  3, // 

     4,  5,  6, // NORTH-EAST | +Z
     6,  5,  7, // NORTH-WEST |

     8,  9, 10, // NORTH-WEST | -X
    10,  9, 11, // SOUTH-WEST |

    12, 13, 14, // SOUTH-WEST | -Z
    14, 13, 15, // SOUTH-EAST |

    16, 17, 18, // SOUTH-EAST | +X
    18, 17, 19, // NORTH-EAST |

    22, 21, 20, // BOTTOM     | -Y
    23, 22, 20  // 
  ];
}

function getBoxColours(box: Box): number[] {
  return [
    yPlusR,  yPlusG,  yPlusB,
    yPlusR,  yPlusG,  yPlusB,
    yPlusR,  yPlusG,  yPlusB,
    yPlusR,  yPlusG,  yPlusB,

    zPlusR,  zPlusG,  zPlusB,
    zPlusR,  zPlusG,  zPlusB,
    zPlusR,  zPlusG,  zPlusB,
    zPlusR,  zPlusG,  zPlusB,

    xMinusR, xMinusG, xMinusB,
    xMinusR, xMinusG, xMinusB,
    xMinusR, xMinusG, xMinusB,
    xMinusR, xMinusG, xMinusB,

    zMinusR, zMinusG, zMinusB,
    zMinusR, zMinusG, zMinusB,
    zMinusR, zMinusG, zMinusB,
    zMinusR, zMinusG, zMinusB,

    xPlusR,  xPlusG,  xPlusB,
    xPlusR,  xPlusG,  xPlusB,
    xPlusR,  xPlusG,  xPlusB,
    xPlusR,  xPlusG,  xPlusB,
    
    yMinusR, yMinusG, yMinusB,
    yMinusR, yMinusG, yMinusB,
    yMinusR, yMinusG, yMinusB,
    yMinusR, yMinusG, yMinusB
  ];
}

function getBoxNormals(box: Box): number[] {
  return [
     0,  1,  0,
     0,  1,  0,
     0,  1,  0,
     0,  1,  0,

     0,  0,  1,
     0,  0,  1,
     0,  0,  1,
     0,  0,  1,

    -1,  0,  0,
    -1,  0,  0,
    -1,  0,  0,
    -1,  0,  0,

     0,  0, -1,
     0,  0, -1,
     0,  0, -1,
     0,  0, -1,

     1,  0,  0,
     1,  0,  0,
     1,  0,  0,
     1,  0,  0,

     0, -1,  0,
     0, -1,  0,
     0, -1,  0,
     0, -1,  0
  ];
}