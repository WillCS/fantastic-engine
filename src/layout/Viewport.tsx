import { Component, ReactNode, RefObject } from "react";
import React from "react";
import './Viewport.css';
import { WebGLHelper } from "../graphics/webGLHelper";
import { AppContext } from "../state/context";
import ReactResizeDetector from 'react-resize-detector';
import { RenderManager } from "../graphics/renderManager";
import { observer } from "mobx-react";
import { SettingsContext } from "../state/settings";

export interface ViewportProps {
  context: AppContext;
  renderManager: RenderManager;
}

@observer
export class Viewport extends Component<ViewportProps> {
  public static contextType = SettingsContext;
  
  private renderTargetRef: RefObject<HTMLCanvasElement>;
  private webGL!: WebGLRenderingContext;
  private rendering: boolean = false;

  public constructor(props: ViewportProps) {
    super(props);

    this.renderTargetRef = React.createRef();
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
      <span className = 'viewport'>
        <canvas 
          id          = 'renderTarget'
          ref         = {this.renderTargetRef}
          onMouseDown = {this.handleMouseDown}
          onMouseMove = {this.handleMouseMove}
          onMouseUp   = {this.handleMouseUp}
          onWheel     = {this.handleScroll}
        >
      
        </canvas>
        <ReactResizeDetector handleWidth handleHeight onResize={this.handleResize} />
      </span>
    )
  }

  private doLoop = (t: number) => {
    if(this.rendering) {
      this.props.renderManager.render(this.webGL, t);
      window.requestAnimationFrame(this.doLoop);
    }
  }

  private handleResize = (width: number, height: number) => {
    const canvas = this.renderTargetRef.current;

    if(canvas) {
      WebGLHelper.resizeCanvasToProperSize(canvas as HTMLCanvasElement);
    }

    this.props.renderManager.updateViewportSize(width, height);
  }

  private handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { x, y } = this.getViewportCoordinates(event.clientX, event.clientY);
    this.props.context.onMouseDown(x, y, event.button);
  }

  private handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { x, y } = this.getViewportCoordinates(event.clientX, event.clientY);
    this.props.context.onMouseMoved(x, y);
  }

  private handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { x, y } = this.getViewportCoordinates(event.clientX, event.clientY);
    this.props.context.onMouseUp(x, y, event.button);
  }

  private handleScroll = (event: React.WheelEvent<HTMLCanvasElement>) => {
    this.props.context.onScrolled(event.deltaY);
  }

  private getViewportCoordinates(clientX: number, clientY: number): { x: number, y: number} {
    const domRect = this.renderTargetRef.current!.getClientRects().item(0)!;
    return {
      x: clientX - domRect.left,
      y: clientY - domRect.top,
    };
  }
}
