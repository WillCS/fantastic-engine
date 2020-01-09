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

  public copy(): AssemblyList {
    return new AssemblyList(
      this.assemblies.map(assembly => assembly.copy())
    );
  }
}

export class BoxList {
  public constructor(public boxes: BoxList[]) { }

  public copy(): BoxList {
    return new BoxList(
      this.boxes.map(box => box.copy())
    );
  }
}

export class TextureList {
  public constructor(public textures: Texture[]) { }
}

export class Assembly {
  public name:          string;
  public rotationPoint: Vec3;
  public rotationAngle: Vec3;
  public offset:        Vec3;
  public textureOffset: Vec2;
  public children:      AssemblyList;
  public cubes:         BoxList;
  public mirrored:      boolean;
  public texture:       Texture | undefined;

  public constructor() {
    this.name          = 'Assembly';
    this.rotationPoint = Vec3.zero();
    this.rotationAngle = Vec3.zero();
    this.offset        = Vec3.zero();
    this.textureOffset = Vec2.zero();
    this.children      = new AssemblyList([]);
    this.cubes         = new BoxList([]);
    this.mirrored      = false;
  }

  public copy(): Assembly {
    let newAssembly = new Assembly();

    newAssembly.name          = this.name;
    newAssembly.rotationPoint = this.rotationPoint.copy();
    newAssembly.rotationAngle = this.rotationAngle.copy();
    newAssembly.offset        = this.offset.copy();
    newAssembly.textureOffset = this.textureOffset.copy();
    newAssembly.children      = this.children.copy();
    newAssembly.cubes         = this.cubes.copy();
    newAssembly.mirrored      = this.mirrored;
    newAssembly.texture       = this.texture;

    return newAssembly;
  }
}

export class Box {
  public name:          string;
  public position:      Vec3;
  public dimensions:    Vec3;
  public textureCoords: Vec2;
  public mirrored:      boolean;

  public constructor() {
    this.name          = 'Assembly';
    this.position      = Vec3.zero();
    this.dimensions    = Vec3.zero();
    this.textureCoords = Vec2.zero();
    this.mirrored      = false;
  }

  public copy(): Box {
    let newBox = new Box();
    
    newBox.name          = this.name;
    newBox.position      = this.position.copy();
    newBox.dimensions    = this.dimensions.copy();
    newBox.textureCoords = this.textureCoords.copy();
    newBox.mirrored      = this.mirrored;

    return newBox;
  }
}
