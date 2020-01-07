import { Component, ReactNode, RefObject } from "react";
import React from "react";
import './Viewport.css';
import { WebGLHelper } from "../graphics/webGLHelper";
import { Scene, DefaultScene } from "../graphics/scene";
import { AppContext } from "../state/context";
import ReactResizeDetector from 'react-resize-detector';

export interface ViewportProps {
  context: AppContext;
}

export class Viewport extends Component<ViewportProps> {
  private renderTargetRef: RefObject<HTMLCanvasElement>;
  private webGL!: WebGLRenderingContext;
  private scene!: Scene;
  private rendering: boolean = false;

  public constructor(props: ViewportProps) {
    super(props);

    this.renderTargetRef = React.createRef();

    this.doLoop = this.doLoop.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  public componentDidMount(): void {
    const canvas = this.renderTargetRef.current;

    if(canvas) {
      this.webGL = WebGLHelper.setupCanvas(canvas);
      this.scene = new DefaultScene(this.webGL);

      WebGLHelper.resizeCanvasToProperSize(canvas);
      this.scene.setViewportSize(canvas.clientWidth, canvas.clientHeight);

      this.rendering = true;
      window.requestAnimationFrame(this.doLoop);
    }
  }

  public componentWillUnmount(): void {
    this.rendering = false;
    this.scene.dispose(this.webGL);
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
    if(this.rendering) {
      this.scene.render(this.webGL, t);
      window.requestAnimationFrame(this.doLoop);
    }
  }

  private handleResize(width: number, height: number): void {
    const canvas = this.renderTargetRef.current;
    console.log('hmmm');

    if(canvas) {
      WebGLHelper.resizeCanvasToProperSize(canvas as HTMLCanvasElement);
    }

    this.scene.setViewportSize(width, height);
  }
}
