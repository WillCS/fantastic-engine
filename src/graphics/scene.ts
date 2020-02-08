import { AppContext } from "../state/context";

export abstract class Scene {
  protected viewportWidth:  number = 0;
  protected viewportHeight: number = 0;

  protected transitionBeginTime: number = 0;

  protected context?: AppContext;

  /**
   *  Initialise the parts of the scene that are dependent on WebGL.
   *  Allows for separation of concerns, so contexts don't have to concern
   *  themselves with WebGL at all.
   *  @param webGL The WebGL context.
   */
  public abstract init(webGL: WebGLRenderingContext): void;

  /**
   *  Perform any pre-render processing here. This is always called before
   *  render.
   *  @param webGL The WebGL context.
   *  @param time  The time in milliseconds (since the last frame?)
   */
  public abstract preRender(webGL: WebGLRenderingContext, time: number): void;

  /**
   *  Dispose of anything that needs to be disposed of here.
   *  e.g. deregister observable listeners, delete WebGL objects, etc
   *  @param webGL The WebGL context.
   */
  public abstract dispose(webGL: WebGLRenderingContext): void;

  /**
   *  Render the scene!
   *  @param webGL The WebGL context.
   *  @param time The time in milliseconds (since the last frame?)
   */
  public render(webGL: WebGLRenderingContext, time: number): void {
    this.preRender(webGL, time);
    webGL.clear(webGL.COLOR_BUFFER_BIT | webGL.DEPTH_BUFFER_BIT);
    webGL.viewport(0, 0, this.viewportWidth, this.viewportHeight);
  }

  /**
   *  Set the size in pixels of the render viewport. This should be called
   *  Whenever the Viewport component is resized, to ensure that the the
   *  scene and the Viewport are the same size.
   *  @param width   The width of the Viewport component.
   *  @param height  The height of the Viewport component.
   */
  public setViewportSize(width: number, height: number): void {
    this.viewportWidth  = width;
    this.viewportHeight = height;
  }

  /**
   *  Set the scene's context. A scene will likely need access to the
   *  context.
   *  @param context The context to assign to the scene.
   */
  public setContext(context: AppContext): void {
    this.context = context;
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
