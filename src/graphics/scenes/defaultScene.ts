import { Scene } from "../scene";
import { ShaderProgram } from "../shaderProgram";
import { StaticMesh } from "../staticMesh";
import { Camera, OrbitalCamera, ProjectionType } from "../camera";
import { Mat4 } from "../../math/matrix";
import { Vec3 } from "../../math/vector";
import { WebGLHelper } from "../webGLHelper";
import { 
  texVertSource,
  texFragSource,
  getCubeTop, 
  getCubeBase, 
  getCubeBaseOutline
} from "./defaultSceneResources";
import { Texture2D } from "../2DTexture";
import { colourVertSource, colourFragSource } from "./commonSceneResources";

export class DefaultScene extends Scene {
  private shaderProgram?:        ShaderProgram;
  // private textureShaderProgram?: ShaderProgram;

  private cubeTop?:         StaticMesh;
  private cubeBase?:        StaticMesh;
  private cubeBaseOutline?: StaticMesh;

  private changed = false;

  private transitioning = false;

  // private transitionTexture?:          WebGLTexture;
  // private transitionBuffer?:           WebGLFramebuffer;
  // private transitionTextureContainer?: Texture2D;

  private camera: Camera;

  private modelTransform: Mat4 = Mat4.identity().scale(100, 100, 100);

  private readonly isometricInclination = ((Math.PI / 2) - Math.atan(1 / Math.sqrt(2)));
  private readonly transitionLength     = 1000;

  public constructor() {
    super();

    this.camera = new OrbitalCamera(Vec3.zero(), Math.PI / 4, this.isometricInclination, 200);
    this.camera.viewportWidth    =
    this.camera.viewportHeight   = this.viewportHeight;
    this.camera.projectionType   = ProjectionType.ORTHOGRAPHIC;
    this.camera.farPlaneDistance = 500;
    (this.camera as OrbitalCamera).azimuth = (Math.PI / 4)
  }

  public init(webGL: WebGLRenderingContext): void {
    this.shaderProgram = new ShaderProgram(
        WebGLHelper.buildShaderProgram(webGL, colourVertSource.default, colourFragSource.default)!);

    // this.textureShaderProgram = new ShaderProgram(
    //     WebGLHelper.buildShaderProgram(webGL, texVertSource.default, texFragSource.default)!);

    this.shaderProgram.setCamera(this.camera);

    this.cubeTop  = getCubeTop(webGL);
    this.cubeBase = getCubeBase(webGL);
    this.cubeBaseOutline = getCubeBaseOutline(webGL);

    // this.transitionTexture = webGL.createTexture()!;
    // this.transitionBuffer  = webGL.createFramebuffer()!;
    
    // this.transitionTextureContainer = new Texture2D(webGL, this.transitionTexture, 0, 0,
    //     this.viewportWidth, this.viewportHeight);
  }

  public preRender(webGL: WebGLRenderingContext, time: number): void {
    this.shaderProgram!.enable(webGL);

    webGL.clearColor(0.0, 0.0, 0.0, 0.0);
    webGL.enable(webGL.CULL_FACE);
    webGL.cullFace(webGL.BACK);
    webGL.frontFace(webGL.CCW);

    this.shaderProgram!.setUniforms(webGL);

    (this.camera as OrbitalCamera).azimuth += 0.005;
  }

  public render(webGL: WebGLRenderingContext, time: number): void {
    super.render(webGL, time);

    this.cubeBaseOutline!.draw(webGL, this.shaderProgram!, this.modelTransform);
    this.cubeBase!.draw(webGL, this.shaderProgram!, this.modelTransform);
    this.cubeTop!.draw(webGL, this.shaderProgram!, this.modelTransform);
  }

  public dispose(webGL: WebGLRenderingContext): void {
    this.cubeTop!.dispose(webGL);
    this.cubeBase!.dispose(webGL);
    this.cubeBaseOutline!.dispose(webGL);
    this.shaderProgram!.dispose(webGL);
    // this.transitionTextureContainer.dispose(webGL);
    // webGL.deleteTexture(this.transitionTexture);
    // webGL.deleteFramebuffer(this.transitionBuffer);
    // this.textureShaderProgram.dispose(webGL);
  }

  public setViewportSize(width: number, height: number): void {
    super.setViewportSize(width, height);
    this.camera.viewportWidth  = width;
    this.camera.viewportHeight = height;

    this.changed = true;
  }

  public transitionTo(scene: Scene, webGL: WebGLRenderingContext, time: number): boolean {
    if(!this.transitioning) {
      this.transitionBeginTime = time;
    }
    
    if(!this.transitioning || this.changed) {
      // this.updateTransitionResources(webGL);
      this.transitioning = true;
    }

    let deltaT = time - this.transitionBeginTime;

    // webGL.bindFramebuffer(webGL.FRAMEBUFFER, this.transitionBuffer);

    scene.render(webGL, time);

    webGL.bindFramebuffer(webGL.FRAMEBUFFER, null);

    super.render(webGL, time);

    let zoomScale = 1 + 10 * (deltaT / this.transitionLength);
    let newModelTransform = this.modelTransform.scale(zoomScale, zoomScale, zoomScale);

    (this.camera as OrbitalCamera).azimuth += deltaT / 5000;
    this.camera.farPlaneDistance = 2000 * zoomScale;
    (this.camera as OrbitalCamera).radius = zoomScale * 1000;
    (this.camera as OrbitalCamera).inclination = this.isometricInclination - this.isometricInclination * (deltaT / this.transitionLength);

    this.cubeBaseOutline!.draw(webGL, this.shaderProgram!, newModelTransform);

    webGL.disable(webGL.DEPTH_TEST);
    this.cubeBase!.draw(webGL, this.shaderProgram!, newModelTransform);
    webGL.enable(webGL.DEPTH_TEST);

    webGL.enable(webGL.STENCIL_TEST);
    webGL.stencilFunc(webGL.ALWAYS, 1, 0xFF);
    webGL.stencilOp(webGL.KEEP, webGL.KEEP, webGL.REPLACE);
    webGL.stencilMask(0xFF);
    webGL.clear(webGL.STENCIL_BUFFER_BIT);
    // webGL.colorMask(false, false, false, false);

    this.cubeTop!.draw(webGL, this.shaderProgram!, newModelTransform);

    webGL.colorMask(true, true, true, true);
    webGL.stencilFunc(webGL.EQUAL, 1, 0xFF);
    webGL.stencilMask(0x00);
    webGL.disable(webGL.DEPTH_TEST);

    // this.textureShaderProgram.enable(webGL);

    // this.transitionTextureContainer.draw(webGL, this.textureShaderProgram);

    webGL.disable(webGL.STENCIL_TEST);
    
    return deltaT >= this.transitionLength;
  }
  
  // private updateTransitionResources(webGL: WebGLRenderingContext): void {
  //   webGL.bindTexture(webGL.TEXTURE_2D, this.transitionTexture);
  //   webGL.texImage2D(
  //     webGL.TEXTURE_2D,
  //     0,
  //     webGL.RGBA,
  //     this.viewportWidth,
  //     this.viewportHeight,
  //     0,
  //     webGL.RGBA,
  //     webGL.UNSIGNED_BYTE,
  //     null
  //   );

  //   webGL.bindFramebuffer(webGL.FRAMEBUFFER, this.transitionBuffer);
  //   webGL.framebufferTexture2D(
  //     webGL.FRAMEBUFFER,
  //     webGL.COLOR_ATTACHMENT0,
  //     webGL.TEXTURE_2D,
  //     this.transitionTexture!,
  //     0
  //   );

  //   webGL.texParameteri(webGL.TEXTURE_2D, webGL.TEXTURE_MIN_FILTER, webGL.LINEAR);
  //   webGL.texParameteri(webGL.TEXTURE_2D, webGL.TEXTURE_WRAP_S, webGL.CLAMP_TO_EDGE);
  //   webGL.texParameteri(webGL.TEXTURE_2D, webGL.TEXTURE_WRAP_T, webGL.CLAMP_TO_EDGE);

  //   this.transitionTextureContainer!.resize(
  //     0, 0,
  //     this.viewportWidth, this.viewportHeight
  //   );
  // }
}
