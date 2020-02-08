import { Component, ReactNode, RefObject } from "react";
import React from "react";
import './Viewport.css';
import { WebGLHelper } from "../graphics/webGLHelper";
import { AppContext } from "../state/context";
import ReactResizeDetector from 'react-resize-detector';
import { RenderManager } from "../graphics/renderManager";
import { observer } from "mobx-react";

export interface ViewportProps {
  context: AppContext;
  renderManager: RenderManager;
}

@observer
export class Viewport extends Component<ViewportProps> {
  private renderTargetRef: RefObject<HTMLCanvasElement>;
  private webGL!: WebGLRenderingContext;
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
      
      if(!this.props.renderManager.isInitialised()) {
        this.props.renderManager.init(this.props.context.scene);
      }

      WebGLHelper.resizeCanvasToProperSize(canvas);
      this.props.renderManager.updateViewportSize(canvas.clientWidth, canvas.clientHeight);

      this.rendering = true;
      window.requestAnimationFrame(this.doLoop);
    }
  }

  public componentWillUnmount(): void {
    this.rendering = false;
    this.props.renderManager.dispose(this.webGL);
  }

  public render(): ReactNode {
    return (
      <span className='viewport'>
        <canvas id='renderTarget' ref={this.renderTargetRef}>
      
        </canvas>
        <ReactResizeDetector handleWidth handleHeight onResize={this.handleResize} />
      </span>
    )
  }

  private doLoop(t: number): void {
    if(this.rendering) {
      this.props.renderManager.render(this.webGL, t);
      window.requestAnimationFrame(this.doLoop);
    }
  }

  private handleResize(width: number, height: number): void {
    const canvas = this.renderTargetRef.current;

    if(canvas) {
      WebGLHelper.resizeCanvasToProperSize(canvas as HTMLCanvasElement);
    }

    this.props.renderManager.updateViewportSize(width, height);
  }
}
