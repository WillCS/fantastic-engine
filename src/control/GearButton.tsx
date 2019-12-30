import React, { Component, ReactNode, CSSProperties } from "react";
import { MathHelper } from '../math/mathHelper';
import './GearButton.css'

export interface GearButtonProps {
  teeth: number
}

export class GearButton extends Component<GearButtonProps> {
  public render(): ReactNode {
  return (
      <button className='gearButton'>
        <span className='gearSpindle'>
          { MathHelper.range(this.props.teeth).map(tooth => 
            <span key = {tooth} style={ this.getGearToothCSS(tooth) } />
          )}
        </span>
      </button>
    );
  }

  private getGearToothCSS(tooth: number): CSSProperties {
    const angle = 360 * (tooth / this.props.teeth);
    return {
      transform: `translate(-4px, 2px) rotate(${angle}deg) translate(0px, 15px)`
    };
  }
}