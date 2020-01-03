export class Renderer {
  private viewportWidth:  number = 0;
  private viewportHeight: number = 0;

  public render(webGL: WebGLRenderingContext): void {
    webGL.viewport(0, 0, this.viewportWidth, this.viewportHeight);
    webGL.clearColor(0.0, 0.0, 1.0, 1.0);
    webGL.clear(webGL.COLOR_BUFFER_BIT | webGL.DEPTH_BUFFER_BIT);
  }

  public setViewportSize(width: number, height: number): void {
    this.viewportWidth  = width;
    this.viewportHeight = height;
  }
}
