import { DynamicMesh, MeshData } from "../dynamicMesh";
import { Box } from "../../model/entityModel";

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
  const indices:    number[] = getBoxIndices(box);
  const normals:    number[] = getBoxNormals(box);
  const decoration: number[] = getBoxColours(box);

  mesh.setVertices(webGL, vertices);
  mesh.setIndices(webGL,  indices);
  mesh.setNormals(webGL,  normals);
  mesh.setColours(webGL,  decoration);

  return mesh;
}

function getBoxVertices(box: Box): number[] {
  return [];
}

function getBoxIndices(box: Box): number[] {
  return [];
}

function getBoxColours(box: Box): number[] {
  return [];
}

function getBoxNormals(box: Box): number[] {
  return [];
}