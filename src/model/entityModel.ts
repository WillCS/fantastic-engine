import { Vec3, Vec2 } from "../math/vector";
import { Texture } from "./texture";
import { Model } from "./model";
import { TreeItemStyling } from "../layout/tree/treeLayout";

export class EntityModel implements Model {
  public name:       string;
  public assemblies: AssemblyList;
  public textures:   TextureList;

  public constructor() {
    this.name       = "Entity Model";
    this.assemblies = new AssemblyList([]);
    this.textures   = new TextureList([]);
  }

  public populate(parent: any): any {
    if(parent instanceof EntityModel) {
      return [this.assemblies, this.textures];
    } else if(parent instanceof AssemblyList) {
      return parent.assemblies;
    } else if(parent instanceof TextureList) {
      return parent.textures;
    } else {
      return parent;
    }
  }

  public decorate(treeObject: any): TreeItemStyling {
    if(treeObject instanceof EntityModel) {
      return { name: treeObject.name };
    } else if(treeObject instanceof AssemblyList) {
      return { name: 'Assemblies' };
    } else if(treeObject instanceof TextureList) {
      return { name: 'Textures' };
    } else {
      return { name: 'object hehehe' };
    }
  }
}

export class AssemblyList {
  public constructor(public assemblies: Assembly[]) { }
}

export class TextureList {
  public constructor(public textures: Texture[]) { }
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
