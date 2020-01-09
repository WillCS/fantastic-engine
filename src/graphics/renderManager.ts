import { Scene } from "./scene";
import { AppContext } from "../state/context";

export class RenderManager {
  private previousScene: Scene | undefined;
  private scene:         Scene | undefined;

  private transitioningContext: AppContext | undefined;

  private initialised:   boolean = false;
  private transitioning: boolean = false;

  public constructor() {
    this.contextChanged = this.contextChanged.bind(this);
  }

  public isInitialised(): boolean {
    return this.initialised;
  }

  public init(scene: Scene): void {
    this.initialised = true;
    this.scene = scene;
  }

  public updateViewportSize(width: number, height: number): void {
    if(this.previousScene) {
      this.previousScene.setViewportSize(width, height);
    }

    if(this.scene) {
      this.scene.setViewportSize(width, height);
    }
  }

  public render(webGL: WebGLRenderingContext, time: number): void {
    if(this.transitioning) {
      if(this.transitioningContext) {
        this.transitioningContext.createScene(webGL);
        this.transitionTo(this.transitioningContext.getScene()!);
        this.transitioningContext = undefined;
      }

      let finished = this.previousScene!.transitionTo(this.scene!, webGL, time);

      if(finished) {
        this.previousScene!.dispose(webGL);
        this.previousScene = undefined;
        this.transitioning = false;
      }
    } else {
      this.scene!.render(webGL, time);
    }
  }

  public contextChanged(context: AppContext): void {
    this.transitioningContext = context;
    this.transitioning = true;
  }

  public transitionTo(scene: Scene): void {
    this.previousScene = this.scene;
    this.scene         = scene;

    this.transitioning = true;
  }

  public dispose(webGL: WebGLRenderingContext): void {
    if(this.previousScene) {
      this.previousScene.dispose(webGL);
    }

    if(this.scene) {
      this.scene.dispose(webGL);
    }
  }
}