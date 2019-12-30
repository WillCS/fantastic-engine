import { Component, ReactNode, CSSProperties } from 'react';
import React from 'react';
import './ControlButton.css';
import { MathHelper } from '../math/mathHelper';

export enum ControlButtonType {
  GEAR,
  INFO,
  TRASH,
  EXIT,
  SAVE,
  EXPORT,
  ENTITY_MODEL,
  NEW_COMPONENT,
  NEW_TEXTURE,
  NEW_ASSEMBLY,
  JSON_MODEL,
}

export interface ControlButtonProps {
  title: string,
  type: ControlButtonType,
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export class ControlButton extends Component<ControlButtonProps> {
  public render(): ReactNode {
    switch(this.props.type) {
      case ControlButtonType.GEAR: 
        return this.renderGearButton();
      default:
        return (
          <button
            title={this.props.title}
            className='controlButton'
            onClick={this.props.onClick!}
          >
          </button>
        );
    }
  }

  private renderGearButton(): ReactNode {
    const teeth = 8;
    return (
      <button
        title={this.props.title}
        className='controlButton gear'
        onClick={this.props.onClick!}
      >
        <span className='gearSpindle'>
          { MathHelper.range(teeth).map(tooth => 
            <span
              key={tooth}
              style={this.getGearToothCSS(tooth, teeth)}
            />
          )}
        </span>
      </button>
    );
  }

  /**
   * Calculate the angle that the gear with the given tooth index should be
   * rotated in order to render the full gear.
   * @param tooth The index of the tooth.
   */
  private getGearToothCSS(tooth: number, teeth: number): CSSProperties {
    const angle = 360 * (tooth / teeth);
    return {
      transform: `translate(-4px, 2px) rotate(${angle}deg) translate(0px, 15px)`
    };
  }
}