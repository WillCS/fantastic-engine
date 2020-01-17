import { StaticMesh } from "../staticMesh";
import { MathHelper } from "../../math/mathHelper";

export const colourVertSource = require('../glsl/colourShaderNoNormal.vert');
export const colourFragSource = require('../glsl/colourShaderNoNormal.frag');

export const modelVertSource = require('../glsl/modelShader.vert');
export const modelFragSource = require('../glsl/modelShader.frag');

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

export function getXZPlane(webGL: WebGLRenderingContext): StaticMesh {
  return new StaticMesh(webGL, {
    defaultDrawMode: webGL.LINES,
    indices: MathHelper.range(80),
    vertices: MathHelper.range(20).map(index => [
      (index * 16) - 160, 0, -160,
      (index * 16) - 160, 0,  160,
       -160,              0, (index * 16) - 160,
        160,              0, (index * 16) - 160
    ]).reduce((v1, v2) => v1.concat(v2)),
    decoration: MathHelper.range(80).map(_ => [
      0, 0, 0
    ]).reduce((v1, v2) => v1.concat(v2)),
    normals: undefined,
    texture: undefined
  });
}
