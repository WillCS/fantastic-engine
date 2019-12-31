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

  constructor(protected gl: WebGLRenderingContext, protected shader: WebGLProgram) {

  }

  public get requiresNormals(): boolean {
    return false;
  }

  public get requiresColours(): boolean {
    return true;
  }

  public setCamera(camera: Camera): void {
      this.camera = camera;
  }

  public setModel(matrix: Mat4): void {
    this.model = matrix;
    this.setMat4('model', matrix);
  }

  public useShader(): void {
    this.gl.useProgram(this.shader);
  }

  public setUniforms(): void {
    this.setMat4('view', this.camera.getViewTransform());
    this.setMat4('projection', this.camera.getProjection());
  }

  public clear(): void {

  }

  public getAttributeLocation(attribute: string): number {
    if (this.cachedAttributes.has(attribute)) {
      return this.cachedAttributes.get(attribute)!;
    } else {
      let location: number = this.gl.getAttribLocation(this.shader, attribute);
      this.cachedAttributes.set(attribute, location);
      return location;
    }
  }

  public getUniformLocation(uniform: string): WebGLUniformLocation {
    if (this.cachedUniforms.has(uniform)) {
      return this.cachedUniforms.get(uniform)!;
    } else {
      let location: WebGLUniformLocation = this.gl.getUniformLocation(this.shader, uniform)!;
      this.cachedUniforms.set(uniform, location);
      return location;
    }
  }

  public setFloat(uniform: string, float: number): void {
    let location: WebGLUniformLocation = this.getUniformLocation(uniform);
    this.gl.uniform1f(location, float);
  }

  public setInt(uniform: string, int: number): void {
    let location: WebGLUniformLocation = this.getUniformLocation(uniform);
    this.gl.uniform1i(location, int);
  }

  public setFloat3(uniform: string, float: Vec3 | Colour3): void {
    let location: WebGLUniformLocation = this.getUniformLocation(uniform);
    this.gl.uniform3fv(location, float.toArray());
  }

  public setInt3(uniform: string, int: Vec3): void {
    let location: WebGLUniformLocation = this.getUniformLocation(uniform);
    this.gl.uniform3iv(location, int.toArray());
  }

  public setFloat4(uniform: string, float: Vec4 | Colour4): void {
    let location: WebGLUniformLocation = this.getUniformLocation(uniform);
    this.gl.uniform4fv(location, float.toArray());
  }

  public setMat4(uniform: string, mat: Mat4): void {
    let location: WebGLUniformLocation = this.getUniformLocation(uniform);
    this.gl.uniformMatrix4fv(location, false, mat.forGL());
  }

  public setInt4(uniform: string, int: Vec4): void {
    let location: WebGLUniformLocation = this.getUniformLocation(uniform);
    this.gl.uniform4iv(location, int.toArray());
  }

  public isAttributeEnabled(attribute: string): boolean {
    return this.enabledAttributes.has(attribute)! && this.enabledAttributes.get(attribute)!;
  }

  public setAttributeArray(attribute: string, buffer: WebGLBuffer, size: number, type: number,
    normalize: boolean = false, stride: number = 0, offset: number = 0): void {
    let location: number = this.getAttributeLocation(attribute);
    this.gl.enableVertexAttribArray(location);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.vertexAttribPointer(location, size, type, normalize, stride, offset);
    this.enabledAttributes.set(attribute, true);
  }

  public disableAttributeArray(attribute: string): void {
    if (this.isAttributeEnabled(attribute)) {
      let location: number = this.getAttributeLocation(attribute);
      this.gl.disableVertexAttribArray(location);
      this.enabledAttributes.set(attribute, false);
    }
  }

  public setIndexArray(buffer: WebGLBuffer): void {
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
  }
}