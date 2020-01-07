import { Mat4 } from "../math/matrix";
import { ShaderProgram } from "./shaderProgram";
import { MathHelper } from "../math/mathHelper";

export class StaticMesh {
  private vertexBuffer: WebGLBuffer;

  private indexBuffer: WebGLBuffer;

  private decorationBuffer: WebGLBuffer;
  private textured: boolean = false;
  private texture: WebGLTexture | undefined = undefined;

  private normalBuffer: WebGLBuffer;

  private numIndices: number = 0;
  private defaultDrawMode: number;

  public constructor(webGL: WebGLRenderingContext, defaultDrawMode: number, indices: number[], vertices: number[], normals: number[], colours: number[]);
  public constructor(webGL: WebGLRenderingContext, defaultDrawMode: number, indices: number[], vertices: number[], normals: number[], texCoords: number[], texture: TexImageSource);

  public constructor(webGL: WebGLRenderingContext,
      defaultDrawMode: number,
      indices: number[],
      vertices: number[],
      normals: number[],
      decoration: number[],
      texture: TexImageSource | undefined = undefined) {

    this.defaultDrawMode = defaultDrawMode;

    this.vertexBuffer = webGL.createBuffer()!;
    this.setVertices(webGL, vertices);

    this.indexBuffer = webGL.createBuffer()!;
    this.setIndices(webGL, indices);
    
    this.normalBuffer = webGL.createBuffer()!;
    this.setNormals(webGL, normals);

    this.decorationBuffer = webGL.createBuffer()!;

    if(texture) {
      this.setTexture(webGL, decoration, texture);
    } else {
      this.setColours(webGL, decoration);
    }
  }

  private setVertices(webGL: WebGLRenderingContext, vertices: number[]): void {
    webGL.bindBuffer(webGL.ARRAY_BUFFER, this.vertexBuffer);
    webGL.bufferData(webGL.ARRAY_BUFFER, new Float32Array(vertices), webGL.STATIC_DRAW);
  }

  private setIndices(webGL: WebGLRenderingContext, indices: number[]): void {
    this.numIndices = indices.length;
    webGL.bindBuffer(webGL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    webGL.bufferData(webGL.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), webGL.STATIC_DRAW);
  }

  private setNormals(webGL: WebGLRenderingContext, normals: number[]): void {
    webGL.bindBuffer(webGL.ARRAY_BUFFER, this.normalBuffer);
    webGL.bufferData(webGL.ARRAY_BUFFER, new Float32Array(normals), webGL.STATIC_DRAW);
  }

  private setColours(webGL: WebGLRenderingContext, colours: number[]): void {
    this.textured = false;

    webGL.bindBuffer(webGL.ARRAY_BUFFER, this.decorationBuffer);
    webGL.bufferData(webGL.ARRAY_BUFFER, new Float32Array(colours), webGL.STATIC_DRAW);
  }

  private setTexture(webGL: WebGLRenderingContext, texCoords: number[], texture: TexImageSource): void {
    this.textured = true;

    webGL.bindBuffer(webGL.ARRAY_BUFFER, this.decorationBuffer);
    webGL.bufferData(webGL.ARRAY_BUFFER, new Float32Array(texCoords), webGL.STATIC_DRAW);

    this.texture = webGL.createTexture()!
    webGL.bindTexture(webGL.TEXTURE_2D, this.texture);
    webGL.texImage2D(webGL.TEXTURE_2D, 0, webGL.RGBA, webGL.RGBA, webGL.UNSIGNED_BYTE, texture);

    if(MathHelper.isPowerOfTwo(texture.width) && MathHelper.isPowerOfTwo(texture.height)) {
      webGL.generateMipmap(webGL.TEXTURE_2D);
    } else {
      webGL.texParameteri(webGL.TEXTURE_2D, webGL.TEXTURE_WRAP_S,     webGL.CLAMP_TO_EDGE);
      webGL.texParameteri(webGL.TEXTURE_2D, webGL.TEXTURE_WRAP_T,     webGL.CLAMP_TO_EDGE);
      webGL.texParameteri(webGL.TEXTURE_2D, webGL.TEXTURE_MIN_FILTER, webGL.LINEAR);
    }
  }

  public draw(
      webGL: WebGLRenderingContext,
      shaderProgram: ShaderProgram,
      modelMatrix: Mat4,
      drawMode: number | undefined = undefined): void {
    drawMode = drawMode || this.defaultDrawMode;

    let vertexSize: number = 3;
    let vertexType: number = webGL.FLOAT;
    shaderProgram.setAttributeArray(webGL,
      'vertexPos',
      this.vertexBuffer,
      vertexSize,
      vertexType);

    shaderProgram.setIndexArray(webGL, this.indexBuffer);

    if(this.textured) {
      shaderProgram.disableAttributeArray(webGL, 'vertexColour');

      let texSize: number = 2;
      let texType: number = webGL.FLOAT;
      let texNormalize: boolean = true;
      shaderProgram.setAttributeArray(webGL,
        'texCoord',
        this.decorationBuffer,
        texSize,
        texType,
        texNormalize);

      shaderProgram.setSampler2D(webGL, 'textureSampler', webGL.TEXTURE0, this.texture!);
    } else {
      shaderProgram.disableAttributeArray(webGL, 'texCoord');

      let colourSize: number = 3;
      let colourType: number = webGL.FLOAT;
      let colourNormalize: boolean = true;
      shaderProgram.setAttributeArray(webGL,
        'vertexColour',
        this.decorationBuffer,
        colourSize,
        colourType,
        colourNormalize);
    }

    let normalSize: number = 3;
    let normalType: number = webGL.FLOAT;
    shaderProgram.setAttributeArray(webGL,
      'vertexNorm',
      this.normalBuffer,
      normalSize,
      normalType);

    shaderProgram.setModelMatrix(webGL, modelMatrix);

    let indexType: number = webGL.UNSIGNED_SHORT;
    let indexOffset: number = 0;

    webGL.drawElements(drawMode, this.numIndices, indexType, indexOffset);
  }

  public dispose(webGL: WebGLRenderingContext): void {
    if (this.vertexBuffer) {
      webGL.deleteBuffer(this.vertexBuffer);
    }

    if (this.decorationBuffer) {
      webGL.deleteBuffer(this.decorationBuffer);
    }

    if (this.normalBuffer) {
      webGL.deleteBuffer(this.normalBuffer);
    }

    if (this.indexBuffer) {
      webGL.deleteBuffer(this.indexBuffer);
    }

    if (this.texture) {
      webGL.deleteTexture(this.texture);
    }
  }
}
