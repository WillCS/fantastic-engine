import { Component, ReactNode } from "react";
import React from "react";
import './Viewport.css';

export interface ViewportProps {

}

export class Viewport extends Component<ViewportProps> {
  public render(): ReactNode {
    return (
      <span className='viewport'>
        <canvas id='renderTarget'>

        </canvas>
      </span>
    )
  }
}
