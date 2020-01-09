export abstract class Scene {
  protected viewportWidth:  number = 0;
  protected viewportHeight: number = 0;

  protected transitionBeginTime: number = 0;

  public abstract preRender(webGL: WebGLRenderingContext, time: number): void;
  public abstract dispose(webGL: WebGLRenderingContext): void;

  public render(webGL: WebGLRenderingContext, time: number): void {
    this.preRender(webGL, time);
    webGL.clear(webGL.COLOR_BUFFER_BIT | webGL.DEPTH_BUFFER_BIT);
    webGL.viewport(0, 0, this.viewportWidth, this.viewportHeight);
  }

  public setViewportSize(width: number, height: number): void {
    this.viewportWidth  = width;
    this.viewportHeight = height;
  }

  /**
   * Animate a transition from this scene to the given scene.
   * @param scene The scene to transition to.
   * @returns true if the transition is finished, false otherwise
   */
  public transitionTo(scene: Scene, webGL: WebGLRenderingContext, time: number): boolean {
    return true;
  }
}

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
