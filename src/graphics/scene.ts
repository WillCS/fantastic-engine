import { WebGLHelper } from "./webGLHelper";
import { Camera, OrbitalCamera, ProjectionType } from "./camera";
import { Vec3 } from "../math/vector";

export abstract class Scene {
  protected viewportWidth:  number = 0;
  protected viewportHeight: number = 0;

  public abstract preRender(webGL: WebGLRenderingContext, time: number): void;
  public abstract dispose(webGL: WebGLRenderingContext): void;

  public render(webGL: WebGLRenderingContext, time: number): void {
    this.preRender(webGL, time);
    webGL.viewport(0, 0, this.viewportWidth, this.viewportHeight);
    webGL.clear(webGL.COLOR_BUFFER_BIT | webGL.DEPTH_BUFFER_BIT);
  }

  public setViewportSize(width: number, height: number): void {
    this.viewportWidth  = width;
    this.viewportHeight = height;
  }
}

export class DefaultScene extends Scene {
  private shaderProgram: WebGLProgram;
  private camera: Camera;

  public constructor(webGL: WebGLRenderingContext) {
    super();
    
    this.camera = new OrbitalCamera(Vec3.zero(), Math.PI / 2, Math.PI / 2, 2);
    this.camera.projectionType = ProjectionType.ORTHOGRAPHIC;
    this.shaderProgram = WebGLHelper.buildShaderProgram(webGL)!;
  }

  public preRender(webGL: WebGLRenderingContext, time: number): void {
    webGL.clearColor(0.0, 0.0, 0.0, 0.0);
  }

  public render(webGL: WebGLRenderingContext, time: number): void {
    super.render(webGL, time);
  }

  public dispose(webGL: WebGLRenderingContext): void {
    webGL.deleteProgram(this.shaderProgram);
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

