import { ShaderProgram } from './shaderProgram';

export class Texture2D {
  private vertexBuffer: WebGLBuffer;
  private indexBuffer:  WebGLBuffer;
  private texBuffer:    WebGLBuffer;
  private texture:      WebGLTexture;

  private numIndices: number = 0;

  public constructor(webGL: WebGLRenderingContext, texture: WebGLTexture,
    private top:    number,
    private left:   number,
    private width:  number,
    private height: number) {

    this.vertexBuffer = webGL.createBuffer()!;
    this.setVertices(webGL);

    this.indexBuffer = webGL.createBuffer()!;
    this.numIndices = 4;
    this.setIndices(webGL);

    this.texBuffer = webGL.createBuffer()!;
    this.texture   = texture;
    this.setTexture(webGL);
  }

  private setVertices(webGL: WebGLRenderingContext): void {
    webGL.bindBuffer(webGL.ARRAY_BUFFER, this.vertexBuffer);
    webGL.bufferData(webGL.ARRAY_BUFFER, new Float32Array([
      1,  1,
     -1,  1,
     -1, -1,
      1, -1,
    ]), webGL.STATIC_DRAW);
  }

  private setIndices(webGL: WebGLRenderingContext): void {
    webGL.bindBuffer(webGL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    webGL.bufferData(webGL.ELEMENT_ARRAY_BUFFER, new Uint16Array([ 1, 0, 2, 3 ]), webGL.STATIC_DRAW);
  }

  private setTexture(webGL: WebGLRenderingContext): void {
    webGL.bindBuffer(webGL.ARRAY_BUFFER, this.texBuffer);
    webGL.bufferData(webGL.ARRAY_BUFFER, new Float32Array([
      1, 1,
      0, 1,
      0, 0,
      1, 0
    ]), webGL.STATIC_DRAW);
  }

  public draw(
      webGL: WebGLRenderingContext,
      shaderProgram: ShaderProgram): void {
    let drawMode = webGL.TRIANGLE_STRIP;

    let vertexSize: number = 2;
    let vertexType: number = webGL.FLOAT;
    shaderProgram.setAttributeArray(webGL,
      'vertexPos',
      this.vertexBuffer,
      vertexSize,
      vertexType);

    shaderProgram.setIndexArray(webGL, this.indexBuffer);

    let texSize: number = 2;
    let texType: number = webGL.FLOAT;
    let texNormalize: boolean = true;
    shaderProgram.setAttributeArray(webGL,
      'texCoord',
      this.texBuffer,
      texSize,
      texType,
      texNormalize);

    shaderProgram.setSampler2D(webGL, 'textureSampler', webGL.TEXTURE0, this.texture);
    
    // shaderProgram.setModelMatrix(webGL, );

    let indexType: number = webGL.UNSIGNED_SHORT;
    let indexOffset: number = 0;

    webGL.drawElements(drawMode, this.numIndices, indexType, indexOffset);
  }

  public resize(top: number, left: number, width: number, height: number) {
    this.top    = top;
    this.left   = left;
    this.width  = width;
    this.height = height;
  }

  public dispose(webGL: WebGLRenderingContext): void {
    webGL.deleteBuffer(this.vertexBuffer);
    webGL.deleteBuffer(this.texBuffer);
    webGL.deleteBuffer(this.indexBuffer);
  }
}
