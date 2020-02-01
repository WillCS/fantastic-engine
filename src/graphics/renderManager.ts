import { Scene } from './scene';
import { ContextStore } from '../state/contextStore';

export class RenderManager {
  private previousScene?: Scene;
  private scene?:         Scene;

  private initialised:   boolean = false;
  private transitioning: boolean = false;

  public constructor(
    private contextStore: ContextStore
  ) { }

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
    if(this.contextStore.contextChanged) {
      this.contextStore.getContext().scene.init(webGL);

      if(this.scene) {
        this.previousScene = this.scene;
        this.scene = this.contextStore.getContext().scene;
        this.transitioning = true;
      }

      this.contextStore.contextChanged = false;
    }

    if(this.transitioning) {
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

  public dispose(webGL: WebGLRenderingContext): void {
    if(this.previousScene) {
      this.previousScene.dispose(webGL);
    }

    if(this.scene) {
      this.scene.dispose(webGL);
    }
  }
}
