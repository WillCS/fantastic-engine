import { WebGLHelper } from './webGLHelper';
import { Camera, OrbitalCamera, ProjectionType } from './camera';
import { Vec3 } from '../math/vector';
import { ShaderProgram } from './shaderProgram';
import { StaticMesh } from './mesh';
import { getCubeBase, getCubeTop, getCubeBaseOutline} from './defaultScene';
import { Mat4 } from '../math/matrix';

const colourVertSource = require('./glsl/colourShaderNoNormal.vert');
const colourFragSource = require('./glsl/colourShaderNoNormal.frag');

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
  private shaderProgram: ShaderProgram;

  private cubeTop:  StaticMesh;
  private cubeBase: StaticMesh;
  private cubeBaseOutline: StaticMesh;

  private camera: Camera;
  private modelTransform: Mat4 = Mat4.identity().scale(100, 100, 100);

  private readonly isometricInclination = ((Math.PI / 2) - Math.atan(1 / Math.sqrt(2)));

  public constructor(webGL: WebGLRenderingContext) {
    super();
    
    this.camera = new OrbitalCamera(Vec3.zero(), Math.PI / 4, this.isometricInclination, 200);
    this.camera.viewportWidth  =
    this.camera.viewportHeight = this.viewportHeight;
    this.camera.projectionType = ProjectionType.ORTHOGRAPHIC;
    this.camera.farPlaneDistance = 500;
    
    this.shaderProgram = new ShaderProgram(
        WebGLHelper.buildShaderProgram(webGL, colourVertSource.default, colourFragSource.default)!);

    this.shaderProgram.setCamera(this.camera);

    this.cubeTop  = getCubeTop(webGL);
    this.cubeBase = getCubeBase(webGL);
    this.cubeBaseOutline = getCubeBaseOutline(webGL);
  }

  public preRender(webGL: WebGLRenderingContext, time: number): void {
    this.shaderProgram.enable(webGL);

    webGL.clearColor(0.0, 0.0, 0.0, 0.0);
    webGL.enable(webGL.CULL_FACE);
    webGL.cullFace(webGL.BACK);
    webGL.frontFace(webGL.CCW);

    this.shaderProgram.setUniforms(webGL);

    (this.camera as OrbitalCamera).azimuth = Math.PI / 4 + time / 10000;
  }

  public render(webGL: WebGLRenderingContext, time: number): void {
    super.render(webGL, time);
    
    this.cubeBaseOutline.draw(webGL, this.shaderProgram, this.modelTransform);
    this.cubeBase.draw(webGL, this.shaderProgram, this.modelTransform);
    this.cubeTop.draw(webGL, this.shaderProgram, this.modelTransform);
  }

  public dispose(webGL: WebGLRenderingContext): void {
    this.cubeTop.dispose(webGL);
    this.cubeBase.dispose(webGL);
    this.shaderProgram.dispose(webGL);
  }

  public setViewportSize(width: number, height: number): void {
    super.setViewportSize(width, height);
    this.camera.viewportWidth  = width;
    this.camera.viewportHeight = height;
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

