import { DynamicMesh, MeshData } from "../dynamicMesh";
import { Box } from "../../model/entityModel";

// const xPlusR  = 1;
// const xPlusG  = 0;
// const xPlusB  = 0;

// const yPlusR  = 0;
// const yPlusG  = 1;
// const yPlusB  = 0;

// const zPlusR  = 0;
// const zPlusG  = 0;
// const zPlusB  = 1;

// const xMinusR = 0;
// const xMinusG = 1;
// const xMinusB = 1;

// const yMinusR = 1;
// const yMinusG = 0;
// const yMinusB = 1;

// const zMinusR = 1;
// const zMinusG = 1;
// const zMinusB = 0;

export function buildBoxMesh(webGL: WebGLRenderingContext, box: Box): DynamicMesh {
  const meshData: MeshData = {
    vertices:        getBoxVertices(box),
    indices:         getBoxIndices(box),
    normals:         getBoxNormals(box),
    decoration:      getBoxTexCoords(box),
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
  const x = box.dimensions.x || 0;
  const y = box.dimensions.y || 0;
  const z = box.dimensions.z || 0;

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

    12, 14, 13, // SOUTH-WEST | -Z
    13, 14, 15, // SOUTH-EAST |

    16, 18, 17, // SOUTH-EAST | +X
    17, 18, 19, // NORTH-EAST |

    22, 21, 20, // BOTTOM     | -Y
    23, 22, 20  // 
  ];
}

function getBoxTexCoords(box: Box): number[] {
  const texU = box.textureCoords.x;
  const texV = box.textureCoords.y;
  const dx   = box.dimensions.x;
  const dy   = box.dimensions.y;
  const dz   = box.dimensions.z;
  
  return [
    // +Y
    texU + dz + dx,      texV,
    texU + dz + dx,      texV + dz,
    texU + dz + dx + dx, texV + dz,

    texU + dz + dx,      texV, 
    texU + dz + dx + dx, texV + dz,
    texU + dz + dx + dx, texV,

    // +Z
    texU + dx + dx + dz + dz, texV + dz,
    texU + dx + dx + dz + dz, texV + dz + dy,
    texU + dx + dz + dz     , texV + dz,

    texU + dx + dz + dz     , texV + dz,
    texU + dx + dx + dz + dz, texV + dz + dy,
    texU + dx + dz + dz     , texV + dz + dy,

    // -X
    texU + dz, texV + dz,
    texU + dz, texV + dz + dy,
    texU     , texV + dz,

    texU     , texV + dz,
    texU + dz, texV + dz + dy,
    texU     , texV + dz + dy,

    // -Z
    texU + dz,      texV + dz,
    texU + dz + dx, texV + dz,
    texU + dz     , texV + dz + dy,

    texU + dz     , texV + dz + dy,
    texU + dz + dx, texV + dz,
    texU + dz + dx, texV + dz + dy,

    // +X
    texU + dx + dz,      texV + dz,
    texU + dx + dz + dz, texV + dz,
    texU + dx + dz     , texV + dz + dy,

    texU + dx + dz     , texV + dz + dy,
    texU + dx + dz + dz, texV + dz,
    texU + dx + dz + dz, texV + dz + dy,

    // -Y
    texU + dz     , texV + dz,
    texU + dz     , texV,
    texU + dz + dx, texV,

    texU + dz + dx, texV + dz,
    texU + dz     , texV + dz,
    texU + dz + dx, texV
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