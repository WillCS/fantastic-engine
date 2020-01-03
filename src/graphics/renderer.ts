export abstract class Renderer {
  protected viewportWidth:  number = 0;
  protected viewportHeight: number = 0;

  public render(webGL: WebGLRenderingContext): void {
    webGL.viewport(0, 0, this.viewportWidth, this.viewportHeight);

  }

  public setViewportSize(width: number, height: number): void {
    this.viewportWidth  = width;
    this.viewportHeight = height;
  }
}

export class DefaultRenderer extends Renderer {

  public render(webGL: WebGLRenderingContext): void {
    super.render(webGL);
    webGL.clearColor(132 / 255, 191 / 255, 225 / 255, 1.0);
    webGL.clear(webGL.COLOR_BUFFER_BIT | webGL.DEPTH_BUFFER_BIT);
  }
}
