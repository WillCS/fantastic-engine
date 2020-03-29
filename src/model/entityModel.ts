import { Vec3, Vec2 } from '../math/vector';
import { TextureList, Texture } from './texture';
import { Model, CollectionObject } from './model';
import { hasProperties, property, PropertyType, Readability } from '../properties/properties';
import { observable } from 'mobx';
import { Selectable } from '../state/selection';
import { TreeViewItem, TreeItemStyling } from '../layout/tree/tree';

@hasProperties
export class EntityModel implements Model, Selectable, TreeViewItem {
  @observable
  @property(PropertyType.STRING, Readability.EDITABLE, 'Name')
  public name:       string;

  @observable
  public assemblies: AssemblyList;
  
  @observable
  public textures:   TextureList;

  public constructor() {
    this.name       = 'Entity Model';
    this.assemblies = new AssemblyList([], this);
    this.textures   = new TextureList([], this);
  }

  public populate(): TreeViewItem[] {
    return [this.assemblies, this.textures];
  }

  public decorate(): TreeItemStyling {
    return { name: this.name };
  }

  getParent(): Selectable | undefined {
    return undefined;
  }
}

export class AssemblyList implements Selectable, TreeViewItem, CollectionObject<Assembly> {
  @observable
  public assemblies: Assembly[];

  private readonly parent: any;

  public constructor(assemblies: Assembly[], parent: any) { 
    this.assemblies = assemblies;
    this.parent     = parent;
  }

  public populate(): TreeViewItem[] {
    return this.assemblies;
  }

  public decorate(): TreeItemStyling {
    return { name: 'Assemblies' };
  }

  public copyTo(parent: any): AssemblyList {
    const newList: AssemblyList = new AssemblyList([], parent);
    this.assemblies.forEach(assembly => {
      assembly.copyTo(newList)
      newList.assemblies.push(assembly);
    });

    return newList;
  }

  getParent(): Selectable | undefined {
    return this.parent;
  }

  getChildren(): Assembly[] {
    return this.assemblies;
  }

  size(): number {
    return this.assemblies.length;
  }

  addChild(child: Assembly, index?: number): void {
    if(index) {
      this.assemblies = this.assemblies.splice(index, 0, child);
    } else {
      this.assemblies.push(child);
    }
  }

  removeChild(child: Assembly): number | undefined {
    let removedIndex: number | undefined;
    this.assemblies = this.assemblies.filter((assembly, index) => {
      if(assembly === child) {
        removedIndex = index;
        return false;
      }

      return true;
    })

    return removedIndex;
  }
}

export class BoxList implements Selectable, CollectionObject<Box>  {
  @observable
  public boxes: Box[]; 

  private readonly parent: any;
  
  public constructor(boxes: Box[], parent: any) {
    this.boxes  = boxes;
    this.parent = parent;
  }

  getChildren(): Box[] {
    return this.boxes;
  }

  size(): number {
    return this.boxes.length;
  }

  addChild(child: Box, index?: number): void {
    if(index) {
      this.boxes = this.boxes.splice(index, 0, child);
    } else {
      this.boxes.push(child);
    }
  }

  removeChild(child: Box): number | undefined {
    let removedIndex: number | undefined;
    this.boxes = this.boxes.filter((box, index) => {
      if(box === child) {
        removedIndex = index;
        return false;
      }

      return true;
    })

    return removedIndex;
  }

  public copyTo(parent: any): BoxList {
    const newList: BoxList = new BoxList([], parent);
    this.boxes.forEach(box => {
      box.copyTo(newList)
      newList.boxes.push(box);
    });

    return newList;
  }

  getParent(): Selectable | undefined {
    return this.parent;
  }
}

@hasProperties
export class Assembly implements Selectable {
  @observable
  @property(PropertyType.STRING, Readability.EDITABLE, 'Name')
  public name:          string;
  
  @observable
  @property(PropertyType.VEC3, Readability.EDITABLE, 'Origin')
  public rotationPoint: Vec3;

  @observable
  @property(PropertyType.VEC3, Readability.EDITABLE, 'Rotation')
  public rotationAngle: Vec3;

  @observable
  @property(PropertyType.VEC3, Readability.EDITABLE, 'Offset')
  public offset:        Vec3;

  @observable
  @property(PropertyType.VEC2I, Readability.EDITABLE, 'Texture Offset')
  public textureOffset: Vec2;

  @observable
  public children:      AssemblyList;

  @observable
  public cubes:         BoxList;

  @observable
  @property(PropertyType.TEXTURE, Readability.EDITABLE, 'Texture')
  public texture:       Texture | undefined;

  public constructor(private readonly parent: any) {
    this.name          = 'Assembly';
    this.rotationPoint = Vec3.zero();
    this.rotationAngle = Vec3.zero();
    this.offset        = Vec3.zero();
    this.textureOffset = Vec2.zero();
    this.children      = new AssemblyList([], this);
    this.cubes         = new BoxList([], this);
  }

  public populate(): TreeViewItem[] {
    const children = [];

      if(this.children.assemblies.length > 0) {
        children.push(this.children);
      }

      this.cubes.boxes.forEach(box => children.push(box));

      return children;
  }

  public decorate(): TreeItemStyling {
    return { name: this.name };
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
    newAssembly.texture       = this.texture;

    return newAssembly;
  }

  getParent(): Selectable | undefined {
    return this.parent;
  }
}

@hasProperties
export class Box implements Selectable, TreeViewItem {
  @observable
  @property(PropertyType.STRING, Readability.EDITABLE, 'Name')
  public name:          string;

  @observable
  @property(PropertyType.VEC3, Readability.EDITABLE, 'Position')
  public position:      Vec3;

  @observable
  @property(PropertyType.VEC3I, Readability.EDITABLE, 'Size', { min: 0 })
  public dimensions:    Vec3;

  @observable
  @property(PropertyType.VEC2I, Readability.EDITABLE, 'Texture Offset')
  public textureCoords: Vec2;

  @observable
  @property(PropertyType.BOOLEAN, Readability.EDITABLE, 'Mirrored')
  public mirrored:      boolean;

  public constructor(private readonly parent: any) {
    this.name          = 'Box';
    this.position      = Vec3.zero();
    this.dimensions    = Vec3.zero();
    this.textureCoords = Vec2.zero();
    this.mirrored      = false;
  }

  public populate(): TreeViewItem[] {
    return [];
  }

  public decorate(): TreeItemStyling {
    return { name: this.name };
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

  getParent(): Selectable | undefined {
    return this.parent;
  }
}
