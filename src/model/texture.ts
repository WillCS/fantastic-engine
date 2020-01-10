import { Vec2 } from "../math/vector";

export interface Texture {
  id:   string,
  size: Vec2
}

export class TextureList {
  public constructor(public textures: Texture[], parent: any) { }
}

export class TexturePointer {
  public constructor(public texture: Texture, parent: any) { }
}
