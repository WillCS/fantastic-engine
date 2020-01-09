import { Scene } from "../scene";

export class EntityScene extends Scene {

  public preRender(webGL: WebGLRenderingContext, time: number): void {
    webGL.clearColor(132 / 255, 191 / 255, 225 / 255, 1.0);
  }

  public render(webGL: WebGLRenderingContext, time: number): void {
    super.render(webGL, time);
  }

  public dispose(webGL: WebGLRenderingContext): void {
    
  }
}
