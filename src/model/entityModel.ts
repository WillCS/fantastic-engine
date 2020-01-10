import { Vec3, Vec2 } from "../math/vector";
import { TextureList, TexturePointer } from "./texture";
import { Model } from "./model";
import { TreeItemStyling } from "../layout/tree/treeLayout";

export class EntityModel implements Model {
  public name:       string;
  public assemblies: AssemblyList;
  public textures:   TextureList;

  public constructor() {
    this.name       = "Entity Model";
    this.assemblies = new AssemblyList([], this);
    this.textures   = new TextureList([], this);
  }

  public populate(parent: any): any {
    if(parent instanceof EntityModel) {
      return [this.assemblies, this.textures];
    } else if(parent instanceof AssemblyList) {
      return parent.assemblies;
    } else if(parent instanceof TextureList) {
      return parent.textures;
    } else if(parent instanceof BoxList) {
      return parent.boxes;
    } else if(parent instanceof Assembly) {
      return [parent.children, parent.cubes];
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
    } else if(treeObject instanceof BoxList) {
      return { name: 'Boxes' };
    } else if(treeObject instanceof Assembly) {
      return { name: treeObject.name }
    } else if(treeObject instanceof Box) {
      return { name: treeObject.name };
    } else {
      return { name: 'something else' };
    }
  }
}

export class AssemblyList {
  public constructor(public assemblies: Assembly[], public readonly parent: any) { }

  public copyTo(parent: any): AssemblyList {
    const newList: AssemblyList = new AssemblyList([], parent);
    this.assemblies.forEach(assembly => {
      assembly.copyTo(newList)
      newList.assemblies.push(assembly);
    });

    return newList;
  }
}

export class BoxList {
  public constructor(public boxes: Box[], public readonly parent: any) { }

  public copyTo(parent: any): BoxList {
    const newList: BoxList = new BoxList([], parent);
    this.boxes.forEach(box => {
      box.copyTo(newList)
      newList.boxes.push(box);
    });

    return newList;
  }
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
  public texture:       TexturePointer | undefined;

  public constructor(public readonly parent: any) {
    this.name          = 'Assembly';
    this.rotationPoint = Vec3.zero();
    this.rotationAngle = Vec3.zero();
    this.offset        = Vec3.zero();
    this.textureOffset = Vec2.zero();
    this.children      = new AssemblyList([], this);
    this.cubes         = new BoxList([], this);
    this.mirrored      = false;
  }

  public copyTo(parent: any): Assembly {
    let newAssembly = new Assembly(parent);

    newAssembly.name          = this.name;
    newAssembly.rotationPoint = this.rotationPoint.copy();
    newAssembly.rotationAngle = this.rotationAngle.copy();
    newAssembly.offset        = this.offset.copy();
    newAssembly.textureOffset = this.textureOffset.copy();
    newAssembly.children      = this.children.copyTo(newAssembly);
    newAssembly.cubes         = this.cubes.copyTo(newAssembly);
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

  public constructor(public readonly parent: any) {
    this.name          = 'Box';
    this.position      = Vec3.zero();
    this.dimensions    = Vec3.zero();
    this.textureCoords = Vec2.zero();
    this.mirrored      = false;
  }

  public copyTo(parent: any): Box {
    let newBox = new Box(parent);
    
    newBox.name          = this.name;
    newBox.position      = this.position.copy();
    newBox.dimensions    = this.dimensions.copy();
    newBox.textureCoords = this.textureCoords.copy();
    newBox.mirrored      = this.mirrored;

    return newBox;
  }
}
