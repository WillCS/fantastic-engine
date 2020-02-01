import { Scene } from '../scene';
import { Camera, OrbitalCamera, ProjectionType } from '../camera';
import { Vec3 } from '../../math/vector';
import { ShaderProgram } from '../shaderProgram';
import { WebGLHelper } from '../webGLHelper';
import { getAxes, modelFragSource, modelVertSource } from './commonSceneResources';
import { StaticMesh } from '../staticMesh';
import { Mat4 } from '../../math/matrix';
import { DynamicMesh } from '../dynamicMesh';
import { Box, Assembly, EntityModel } from '../../model/entityModel';
import { buildBoxMesh, updateBoxMesh } from './entitySceneResources';

export class EntityScene extends Scene {
  private camera:         Camera;
  private shaderProgram?: ShaderProgram;
  private axes?:          StaticMesh;

  public constructor() {
    super();

    this.camera = new OrbitalCamera(Vec3.zero(), Math.PI / 4, Math.PI / 4, 100);
    this.camera.viewportWidth    = this.viewportWidth;
    this.camera.viewportHeight   = this.viewportHeight;
    this.camera.projectionType   = ProjectionType.PERSPECTIVE;
    this.camera.farPlaneDistance = 200;
    (this.camera as OrbitalCamera).azimuth = (Math.PI / 4)
  }

  public init(webGL: WebGLRenderingContext): void {
    this.shaderProgram = new ShaderProgram(
      WebGLHelper.buildShaderProgram(webGL, modelVertSource.default, modelFragSource.default)!);

    this.shaderProgram.setCamera(this.camera);

    this.axes = getAxes(webGL);
  }

  public preRender(webGL: WebGLRenderingContext, time: number): void {
    this.shaderProgram!.enable(webGL);
    
    // if(this.modelChanged) {
    //   this.updateGeometry(webGL);
    //   this.modelChanged = false;
    // }

    webGL.clearColor(132 / 255, 191 / 255, 225 / 255, 1.0);
    webGL.lineWidth(2);

    webGL.enable(webGL.CULL_FACE);
    webGL.cullFace(webGL.BACK);
    webGL.frontFace(webGL.CCW);

    webGL.enable(webGL.DEPTH_TEST);

    this.shaderProgram!.setUniforms(webGL);
  }

  public render(webGL: WebGLRenderingContext, time: number): void {
    super.render(webGL, time);
    this.axes!.draw(webGL, this.shaderProgram!, Mat4.identity());

    // if(this.model) {
    //   (this.model as EntityModel).assemblies.assemblies.forEach(
    //       subAssembly => this.renderAssembly(webGL, subAssembly, time, Mat4.identity()));
    // }
  }

  private renderAssembly(
    webGL: WebGLRenderingContext,
    assembly: Assembly,
    time: number,
    modelTransformMatrix: Mat4
  ): void {
    const translation: Vec3 = assembly.offset;
    const rotateOffset: Vec3 = assembly.rotationPoint;

    const x    = translation.x  || 0;
    const y    = translation.y  || 0;
    const z    = translation.z  || 0;
    const xRot = rotateOffset.x || 0;
    const yRot = rotateOffset.y || 0;
    const zRot = rotateOffset.z || 0;

    let modelMat: Mat4 = modelTransformMatrix
        .translate(x, y, z)
        .translate(xRot, yRot, zRot)
        .rotateX(assembly.rotationAngle.x || 0)
        .rotateY(assembly.rotationAngle.y || 0)
        .rotateZ(assembly.rotationAngle.z || 0)
        .translate(-xRot, -yRot, -zRot);

    assembly.cubes.boxes.forEach(
        box => this.renderBox(webGL, box, time, modelMat));

    assembly.children.assemblies.forEach(
        subAssembly => this.renderAssembly(webGL, subAssembly, time, modelMat));
  }

  private renderBox(
    webGL: WebGLRenderingContext,
    box: Box,
    time: number,
    modelTransformMatrix: Mat4
  ): void {
    const mesh = this.geometryMap.get(box);
    const pos  = box.position;
    const x = pos.x || 0;
    const y = pos.y || 0;
    const z = pos.z || 0;
    
    let modelMat: Mat4 = modelTransformMatrix.translate(x, y, z);

    if(mesh) {
      mesh.draw(webGL, this.shaderProgram!, modelMat);
    }
  }

  public dispose(webGL: WebGLRenderingContext): void {
    this.shaderProgram!.dispose(webGL);
    this.axes!.dispose(webGL);
    Array.from(this.geometryMap.values()).forEach(mesh => mesh.dispose(webGL));
  }

  public setViewportSize(width: number, height: number): void {
    super.setViewportSize(width, height);
    this.camera.viewportWidth  = width;
    this.camera.viewportHeight = height;
  }

  private updateGeometryForAssembly(webGL: WebGLRenderingContext, assembly: Assembly): void {
    assembly.cubes.boxes.forEach(        box         => this.updateGeometryForBox(webGL, box));
    assembly.children.assemblies.forEach(subassembly => this.updateGeometryForAssembly(webGL, subassembly));
  }

  private updateGeometryForBox(webGL: WebGLRenderingContext, box: Box): void {
    let mesh: DynamicMesh;
    if(this.geometryMap.has(box)) {
      mesh = this.geometryMap.get(box)!;
      mesh = updateBoxMesh(webGL, box, mesh);
    } else {
      mesh = buildBoxMesh(webGL, box);
    }

    this.geometryMap.set(box, mesh);
  }
}
