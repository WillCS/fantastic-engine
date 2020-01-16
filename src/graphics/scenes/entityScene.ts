import { Scene } from "../scene";
import { Camera, OrbitalCamera, ProjectionType } from "../camera";
import { Vec3 } from "../../math/vector";
import { ShaderProgram } from "../shaderProgram";
import { WebGLHelper } from "../webGLHelper";
import { colourVertSource, colourFragSource, getAxes } from "./commonSceneResources";
import { StaticMesh } from "../staticMesh";
import { Mat4 } from "../../math/matrix";
import { Model } from "../../model/model";
import { DynamicMesh } from "../dynamicMesh";
import { Box, Assembly, EntityModel } from "../../model/entityModel";
import { buildBoxMesh, updateBoxMesh } from "./entitySceneResources";

export class EntityScene extends Scene {
  private camera: Camera;
  private shaderProgram: ShaderProgram;
  private axes: StaticMesh;

  private geometryMap: Map<Box, DynamicMesh>;

  private modelChanged: boolean = false;
  private model:        Model | undefined;

  public constructor(
      webGL: WebGLRenderingContext,
      model: Model,
      modelChangedEventRegister:           (listener: (model: Model | undefined) => void) => void,
      private modelChangedEventDeregister: (liestener: (model: Model | undefined) => void) => void
    ) {
    super();
    
    this.camera = new OrbitalCamera(Vec3.zero(), Math.PI / 4, Math.PI / 4, 100);
    this.camera.viewportWidth    =
    this.camera.viewportHeight   = this.viewportHeight;
    this.camera.projectionType   = ProjectionType.PERSPECTIVE;
    this.camera.farPlaneDistance = 200;
    (this.camera as OrbitalCamera).azimuth = (Math.PI / 4)

    this.shaderProgram = new ShaderProgram(
        WebGLHelper.buildShaderProgram(webGL, colourVertSource.default, colourFragSource.default)!);

    this.shaderProgram.setCamera(this.camera);

    this.axes = getAxes(webGL);

    this.geometryMap = new Map<Box, DynamicMesh>();

    this.handleModelChanged = this.handleModelChanged.bind(this);

    modelChangedEventRegister(this.handleModelChanged);

    this.model = model;
    this.modelChanged = true;
  }

  public preRender(webGL: WebGLRenderingContext, time: number): void {
    this.shaderProgram.enable(webGL);
    
    if(this.modelChanged) {
      this.updateGeometry(webGL);
      this.modelChanged = false;
    }
    webGL.clearColor(132 / 255, 191 / 255, 225 / 255, 1.0);
    webGL.lineWidth(2);

    webGL.enable(webGL.CULL_FACE);
    webGL.cullFace(webGL.BACK);
    webGL.frontFace(webGL.CCW);

    webGL.enable(webGL.DEPTH_TEST);

    this.shaderProgram.setUniforms(webGL);
  }

  public render(webGL: WebGLRenderingContext, time: number): void {
    super.render(webGL, time);
    this.axes.draw(webGL, this.shaderProgram, Mat4.identity());

    if(this.model) {
      (this.model as EntityModel).assemblies.assemblies.forEach(
          subAssembly => this.renderAssembly(webGL, subAssembly, time, Mat4.identity()));
    }
  }

  private renderAssembly(
      webGL: WebGLRenderingContext,
      assembly: Assembly,
      time: number,
      modelTransformMatrix: Mat4
    ): void {
    const translation: Vec3 = assembly.offset;
    const rotateOffset: Vec3 = assembly.rotationPoint;

    let modelMat: Mat4 = modelTransformMatrix
        .translate(translation.x, translation.y, translation.z)
        .translate(rotateOffset.x, rotateOffset.y, rotateOffset.z)
        .rotateX(assembly.rotationAngle.x)
        .rotateY(assembly.rotationAngle.y)
        .rotateZ(assembly.rotationAngle.z)
        .translate(-rotateOffset.x, -rotateOffset.y, -rotateOffset.z);

    if(assembly.mirrored) {
      modelMat = modelMat.scale(-1, 1, 1);
    }

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
    let modelMat: Mat4 = modelTransformMatrix.translate(pos.x, pos.y, pos.z);

    if(box.mirrored) {
      modelMat = modelMat.scale(-1, 1, 1);
    }

    if(mesh) {
      mesh.draw(webGL, this.shaderProgram, modelMat);
    }
  }

  public dispose(webGL: WebGLRenderingContext): void {
    this.modelChangedEventDeregister(this.handleModelChanged);
    this.shaderProgram.dispose(webGL);
    this.axes.dispose(webGL);
  }

  public setViewportSize(width: number, height: number): void {
    super.setViewportSize(width, height);
    this.camera.viewportWidth  = width;
    this.camera.viewportHeight = height;
  }

  private handleModelChanged(model: Model | undefined): void {
    this.model = model;
    this.modelChanged = true;
  }

  private updateGeometry(webGL: WebGLRenderingContext): void {
    if(this.model && this.model instanceof EntityModel) {
      this.model.assemblies.assemblies.forEach(assembly => this.updateGeometryForAssembly(webGL, assembly));
    } else {
      this.geometryMap.clear();
    }
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
