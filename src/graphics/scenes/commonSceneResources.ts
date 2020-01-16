import { StaticMesh } from "../staticMesh";

export const colourVertSource = require('../glsl/colourShaderNoNormal.vert');
export const colourFragSource = require('../glsl/colourShaderNoNormal.frag');

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
