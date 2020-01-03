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
  LOAD_MODEL
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
      case ControlButtonType.ENTITY_MODEL:
        return this.renderEntityModelButton();
      case ControlButtonType.JSON_MODEL:
        return this.renderJsonModelButton();
      case ControlButtonType.TRASH:
        return this.renderTrashButton();
      case ControlButtonType.EXIT:
        return this.renderExitButton();
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

  /* GEAR BUTTON */

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

  /* ENTITY MODEL */

  private renderEntityModelButton(): ReactNode {
    return (
      <button
        title={this.props.title}
        className='controlButton creeper'
        onClick={this.props.onClick!}
      >
        { MathHelper.range(7).map(id => 
          <span className='new' key={id} />
        )}

        { MathHelper.range(5).map(id => 
          <span className='creeper' key={id} />
        )}
      </button>
    );
  }

  /* JSON MODEL */

  private renderJsonModelButton(): ReactNode {
    return (
      <button
        title={this.props.title}
        className='controlButton anvil'
        onClick={this.props.onClick!}
      >
        { MathHelper.range(7).map(id => 
          <span className='new' key={id} />
        )}

        { MathHelper.range(4).map(id => 
          <span className='anvil' key={id} />
        )}
      </button>
    );
  }

  /* TRASH */

  private renderTrashButton(): ReactNode {
    return (
      <button
        title={this.props.title}
        className='controlButton trash'
        onClick={this.props.onClick!}
      >
        { MathHelper.range(3).map(id =>
          <span key={id} />
        )}
      </button>
    )
  }

  /* EXIT */

  private renderExitButton(): ReactNode {
    return (
      <button
        title={this.props.title}
        className='controlButton exit'
        onClick={this.props.onClick!}
      >
        { MathHelper.range(2).map(id =>
          <span key={id} />
        )}
      </button>
    )
  }
}