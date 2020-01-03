import { Component, ReactNode, RefObject } from "react";
import React from "react";
import './Viewport.css';
import { WebGLHelper } from "../graphics/webGLHelper";
import { Renderer, DefaultRenderer } from "../graphics/renderer";
import { AppContext } from "../state/context";
import ReactResizeDetector from 'react-resize-detector';

export interface ViewportProps {
  context: AppContext;
}

export class Viewport extends Component<ViewportProps> {
  private renderTargetRef: RefObject<HTMLCanvasElement>;
  private webGL!: WebGLRenderingContext;
  private shaderProgram!: WebGLProgram;
  private renderer: Renderer;

  public constructor(props: ViewportProps) {
    super(props);

    this.renderTargetRef = React.createRef();
    this.renderer = new DefaultRenderer();

    this.doLoop = this.doLoop.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  public componentDidMount(): void {
    const canvas = this.renderTargetRef.current;

    if(canvas) {
      this.webGL = WebGLHelper.setupCanvas(canvas);
      WebGLHelper.resizeCanvasToProperSize(canvas);
      this.renderer.setViewportSize(canvas.clientWidth, canvas.clientHeight);

      this.shaderProgram = WebGLHelper.buildShaderProgram(this.webGL)!;

      window.requestAnimationFrame(this.doLoop);
    }
  }

  public render(): ReactNode {
    return (
      <span className='viewport'>
        <canvas id='renderTarget' ref={this.renderTargetRef}>
      
        </canvas>
        <ReactResizeDetector handleWidth handleHeight onResize={this.handleResize}/>
      </span>
    )
  }

  private doLoop(t: number): void {
    this.renderer.render(this.webGL);
    window.requestAnimationFrame(this.doLoop);
  }

  private handleResize(width: number, height: number): void {
    const canvas = this.renderTargetRef.current;

    if(canvas) {
      WebGLHelper.resizeCanvasToProperSize(canvas as HTMLCanvasElement);
    }

    this.renderer.setViewportSize(width, height);
  }
}
