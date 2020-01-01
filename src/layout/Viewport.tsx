import { Component, ReactNode, RefObject } from "react";
import React from "react";
import './Viewport.css';
import { WebGLHelper } from "../graphics/webGLHelper";

export interface ViewportProps {

}

export class Viewport extends Component<ViewportProps> {
  private renderTargetRef: RefObject<HTMLCanvasElement>;
  private webGL!: WebGLRenderingContext;
  public constructor(props: ViewportProps) {
    super(props);

    this.renderTargetRef = React.createRef();
  }

  public componentDidMount(): void {
    const canvas = this.renderTargetRef.current;

    if(canvas) {
      this.webGL = WebGLHelper.setupCanvas(canvas);
      WebGLHelper.resizeCanvasToProperSize(canvas);

      window.addEventListener('resize', this.handleWindowResize(canvas));
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
      <span className='viewport'>
        <canvas id='renderTarget' ref={this.renderTargetRef}>

        </canvas>
      </span>
    )
  }

  private handleWindowResize(canvas: HTMLCanvasElement): (event: UIEvent) => any {
    return (event: UIEvent) => {
      WebGLHelper.resizeCanvasToProperSize(canvas as HTMLCanvasElement);
    }
  }
}
