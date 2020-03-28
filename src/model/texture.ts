import { Vec2 } from "../math/vector";
import { hasProperties, property, PropertyType, Readability } from "../properties/properties";
import { Box } from "./entityModel";
import { observable, computed } from "mobx";
import { Selectable } from "../state/selection";
import { TreeViewItem, TreeItemStyling } from "../layout/tree/tree";

@hasProperties
export class Texture implements Selectable, TreeViewItem {
  @observable
  @property(PropertyType.STRING, Readability.EDITABLE, 'Name')
  public name: string;

  @property(PropertyType.VEC2I, Readability.READONLY, 'Size')
  public readonly size: Vec2;

  @observable
  private boxes: Box[];

  private uvMap:          HTMLImageElement;
  private loadedTexture?: HTMLImageElement;

  public constructor(name: string, size: Vec2, 
    private readonly parent: Selectable
  ) {
    this.name  = name;
    this.size  = size;
    
    this.boxes = [];
    this.uvMap = new Image(this.size.x, this.size.y);
  }

  public populate(): TreeViewItem[] {
    return [];
  }

  public decorate(): TreeItemStyling {
    return { name: this.name };
  }

  public getParent(): Selectable | undefined {
    return this.parent;
  }

  public addBox(box: Box): void {
    if(!this.boxes.includes(box)) {
      this.boxes.push(box);
    }
  }

  public removeBox(box: Box): void {
    if(this.boxes.includes(box)) {
      this.boxes = this.boxes.filter(inBox => inBox !== box);
    }
  }

  public drawUVMap(context: CanvasRenderingContext2D): void {
    context.clearRect(0, 0, this.size.x, this.size.y);
    context.lineWidth = 0;

    this.boxes.forEach(box => {
      const texU = box.textureCoords.x;
      const texV = box.textureCoords.y;

      const dx   = box.dimensions.x;
      const dy   = box.dimensions.y;
      const dz   = box.dimensions.z;

      context.fillStyle = 'rgb(255, 0  , 0  )';
      context.fillRect(
        texU + dx + dz, texV + dz,
        dz, dy
      );

      context.fillStyle = 'rgb(0  , 255, 0  )';
      context.fillRect(
        texU + dz + dx, texV,
        dx, dz
      );

      context.fillStyle = 'rgb(0  , 0  , 255)';
      context.fillRect(
        texU + dx + dz + dz, texV + dz,
        dx, dy
      );

      context.fillStyle = 'rgb(0  , 255, 255)';
      context.fillRect(
        texU, texV + dz,
        dz, dy
      );

      context.fillStyle = 'rgb(255, 0  , 255)';
      context.fillRect(
        texU + dz, texV,
        dx, dz
      );

      context.fillStyle = 'rgb(255, 255, 0  )';
      context.fillRect(
        texU + dz, texV + dz,
        dx, dy
      );
    });
  }
}

export class TextureList implements Selectable, TreeViewItem {
  public constructor(
    public textures: Texture[],
    private parent: Selectable
  ) { }

  public populate(): TreeViewItem[] {
    return this.textures;
  }

  public decorate(): TreeItemStyling {
    return { name: 'Textures' };
  }

  public getParent(): Selectable | undefined {
    return this.parent;
  }
}

export class TexturePointer {
  public constructor(public texture: Texture, parent: any) { }
}
