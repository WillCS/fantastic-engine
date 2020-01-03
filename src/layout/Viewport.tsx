import { Component, ReactNode, RefObject } from "react";
import React from "react";
import './Viewport.css';
import { WebGLHelper } from "../graphics/webGLHelper";
import { Renderer } from "../graphics/renderer";
import { AppContext } from "../state/context";

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
    this.renderer = new Renderer();

    this.doLoop = this.doLoop.bind(this);
  }

  public componentDidMount(): void {
    const canvas = this.renderTargetRef.current;

    if(canvas) {
      this.webGL = WebGLHelper.setupCanvas(canvas);
      WebGLHelper.resizeCanvasToProperSize(canvas);
      this.renderer.setViewportSize(canvas.clientWidth, canvas.clientHeight);

      this.shaderProgram = WebGLHelper.buildShaderProgram(this.webGL)!;

      window.addEventListener('resize', this.handleWindowResize(canvas));
      window.requestAnimationFrame(this.doLoop);
    }
  }
  
  public componentWillUnmount(): void {
    const canvas = this.renderTargetRef.current;

    if(canvas) {
      window.removeEventListener('resize', this.handleWindowResize(canvas));
    }
  }

  public render(): ReactNode {
    return (
      <span className={this.getViewportClass()}>
        <canvas id='renderTarget' ref={this.renderTargetRef}>
      
        </canvas>
      </span>
    )
  }

  private getViewportClass(): string {
    if(this.props.context.hasModel()) {
      return 'viewport open';
    } else {
      return 'viewport closed';
    }
  }

  private doLoop(t: number): void {
    this.renderer.render(this.webGL);
    window.requestAnimationFrame(this.doLoop);
  }

  private handleWindowResize(canvas: HTMLCanvasElement): (event: UIEvent) => any {
    return (event: UIEvent) => {
      WebGLHelper.resizeCanvasToProperSize(canvas as HTMLCanvasElement);
      this.renderer.setViewportSize(canvas.clientWidth, canvas.clientHeight);
    }
  }
}
