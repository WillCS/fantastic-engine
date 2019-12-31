import { Vec3, Vec2 } from "../math/vector";
import { Texture } from "./texture";

export interface EntityModel {
  assemblies: Assembly[],
  textures:   Texture[]
}

export interface Assembly {
  name:          string,
  rotationPoint: Vec3,
  rotationAngle: Vec3,
  offset:        Vec3,
  textureOffset: Vec2,
  children:      Assembly[],
  cubes:         Box[],
  mirrored:      boolean,
  texture:       Texture
}

export interface Box {
  name:          string,
  position:      Vec3,
  dimensions:    Vec3,
  textureCoords: Vec2,
  mirrored:      boolean
}
