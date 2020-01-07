import { Vec3, Vec4 } from "../math/vector";
import { Mat4 } from "../math/matrix";
import { Colour4, Colour3 } from "./colour";
import { Camera } from "./camera";

export class ShaderProgram {
  protected camera!: Camera;
  protected model: Mat4 = Mat4.identity();

  /** gl.getAttribLocation and gl.getUniformLocation should be considered slow and used sparsely,
   *  so we cache uniforms and attributes as we access them so we don't have to call these
   *  methods repeatedly. */
  private cachedUniforms: Map<string, WebGLUniformLocation> = new Map<string, WebGLUniformLocation>();
  private cachedAttributes: Map<string, number> = new Map<string, number>();
  private enabledAttributes: Map<string, boolean> = new Map<string, boolean>();

  constructor(protected shaderProgram: WebGLProgram) {

  }

  public setCamera(camera: Camera): void {
      this.camera = camera;
  }

  public setModelMatrix(webGL: WebGLRenderingContext, matrix: Mat4): void {
    this.model = matrix;
    this.setMat4(webGL, 'model', matrix);
  }

  public enable(webGL: WebGLRenderingContext): void {
    webGL.useProgram(this.shaderProgram);
  }

  public setUniforms(webGL: WebGLRenderingContext): void {
    this.setMat4(webGL, 'view', this.camera.getViewTransform());
    this.setMat4(webGL, 'projection', this.camera.getProjection());
  }

  public clear(): void {

  }

  public getAttributeLocation(webGL: WebGLRenderingContext, attribute: string): number {
    if (this.cachedAttributes.has(attribute)) {
      return this.cachedAttributes.get(attribute)!;
    } else {
      let location: number = webGL.getAttribLocation(this.shaderProgram, attribute);
      this.cachedAttributes.set(attribute, location);
      return location;
    }
  }

  public getUniformLocation(webGL: WebGLRenderingContext, uniform: string): WebGLUniformLocation {
    if (this.cachedUniforms.has(uniform)) {
      return this.cachedUniforms.get(uniform)!;
    } else {
      let location: WebGLUniformLocation = webGL.getUniformLocation(this.shaderProgram, uniform)!;
      this.cachedUniforms.set(uniform, location);
      return location;
    }
  }

  public setFloat(webGL: WebGLRenderingContext, uniform: string, float: number): void {
    let location: WebGLUniformLocation = this.getUniformLocation(webGL, uniform);
    webGL.uniform1f(location, float);
  }

  public setInt(webGL: WebGLRenderingContext, uniform: string, int: number): void {
    let location: WebGLUniformLocation = this.getUniformLocation(webGL, uniform);
    webGL.uniform1i(location, int);
  }

  public setFloat3(webGL: WebGLRenderingContext, uniform: string, float: Vec3 | Colour3): void {
    let location: WebGLUniformLocation = this.getUniformLocation(webGL, uniform);
    webGL.uniform3fv(location, float.toArray());
  }

  public setInt3(webGL: WebGLRenderingContext, uniform: string, int: Vec3): void {
    let location: WebGLUniformLocation = this.getUniformLocation(webGL, uniform);
    webGL.uniform3iv(location, int.toArray());
  }

  public setFloat4(webGL: WebGLRenderingContext, uniform: string, float: Vec4 | Colour4): void {
    let location: WebGLUniformLocation = this.getUniformLocation(webGL, uniform);
    webGL.uniform4fv(location, float.toArray());
  }

  public setMat4(webGL: WebGLRenderingContext, uniform: string, mat: Mat4): void {
    let location: WebGLUniformLocation = this.getUniformLocation(webGL, uniform);
    webGL.uniformMatrix4fv(location, false, mat.forGL());
  }

  public setInt4(webGL: WebGLRenderingContext, uniform: string, int: Vec4): void {
    let location: WebGLUniformLocation = this.getUniformLocation(webGL, uniform);
    webGL.uniform4iv(location, int.toArray());
  }

  public setSampler2D(webGL: WebGLRenderingContext, uniform: string, textureUnit: number, texture: WebGLTexture): void {
    let location: WebGLUniformLocation = this.getUniformLocation(webGL, uniform);
    webGL.activeTexture(textureUnit);
    webGL.bindTexture(webGL.TEXTURE_2D, texture);
    webGL.uniform1i(location, textureUnit);
  }

  public isAttributeEnabled(attribute: string): boolean {
    return this.enabledAttributes.has(attribute)! && this.enabledAttributes.get(attribute)!;
  }

  public setAttributeArray(webGL: WebGLRenderingContext, attribute: string, buffer: WebGLBuffer, size: number, type: number,
    normalize: boolean = false, stride: number = 0, offset: number = 0): void {
    let location: number = this.getAttributeLocation(webGL, attribute);
    webGL.enableVertexAttribArray(location);
    webGL.bindBuffer(webGL.ARRAY_BUFFER, buffer);
    webGL.vertexAttribPointer(location, size, type, normalize, stride, offset);
    this.enabledAttributes.set(attribute, true);
  }

  public disableAttributeArray(webGL: WebGLRenderingContext, attribute: string): void {
    if (this.isAttributeEnabled(attribute)) {
      let location: number = this.getAttributeLocation(webGL, attribute);
      webGL.disableVertexAttribArray(location);
      this.enabledAttributes.set(attribute, false);
    }
  }

  public setIndexArray(webGL: WebGLRenderingContext, buffer: WebGLBuffer): void {
    webGL.bindBuffer(webGL.ELEMENT_ARRAY_BUFFER, buffer);
  }

  public dispose(webGL: WebGLRenderingContext): void {
    webGL.deleteProgram(this.shaderProgram);
  }
}