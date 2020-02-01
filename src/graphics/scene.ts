export abstract class Scene {
  protected viewportWidth:  number = 0;
  protected viewportHeight: number = 0;

  protected transitionBeginTime: number = 0;

  public abstract init(webGL: WebGLRenderingContext): void;

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
